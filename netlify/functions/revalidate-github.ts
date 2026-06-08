import { createHmac, timingSafeEqual } from "crypto";

function isSameValue(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  return leftBuffer.length === rightBuffer.length && timingSafeEqual(leftBuffer, rightBuffer);
}

function hasValidGitHubSignature(secret: string, body: string, signature: string | null) {
  if (!signature?.startsWith("sha256=")) return false;

  const digest = `sha256=${createHmac("sha256", secret).update(body).digest("hex")}`;
  return isSameValue(digest, signature);
}

function hasValidSecret(request: Request, body: string) {
  const configuredSecret = process.env.GITHUB_REVALIDATE_SECRET;

  if (!configuredSecret) return process.env.NODE_ENV !== "production";

  const url = new URL(request.url);
  const providedSecret =
    url.searchParams.get("secret") ?? request.headers.get("x-github-revalidate-secret");

  if (providedSecret && isSameValue(providedSecret, configuredSecret)) return true;

  return hasValidGitHubSignature(configuredSecret, body, request.headers.get("x-hub-signature-256"));
}

async function triggerBuildHook() {
  const buildHookUrl = process.env.NETLIFY_BUILD_HOOK_URL;

  if (!buildHookUrl) {
    return { triggered: false, reason: "NETLIFY_BUILD_HOOK_URL is not configured." };
  }

  const response = await fetch(buildHookUrl, { method: "POST" });

  return {
    triggered: response.ok,
    status: response.status,
    statusText: response.statusText,
  };
}

export default async function handler(request: Request) {
  const body = request.method === "GET" ? "" : await request.text();

  if (!hasValidSecret(request, body)) {
    return Response.json({ ok: false, message: "Invalid revalidation secret." }, { status: 401 });
  }

  const buildHook = await triggerBuildHook();

  return Response.json({
    ok: true,
    provider: "netlify-function",
    buildHook,
  });
}
