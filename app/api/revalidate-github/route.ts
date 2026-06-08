import { createHmac, timingSafeEqual } from "crypto";
import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

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

function hasValidSecret(request: NextRequest, body = "") {
  const configuredSecret = process.env.GITHUB_REVALIDATE_SECRET;

  if (!configuredSecret) return process.env.NODE_ENV !== "production";

  const providedSecret =
    request.nextUrl.searchParams.get("secret") ?? request.headers.get("x-github-revalidate-secret");

  if (providedSecret && isSameValue(providedSecret, configuredSecret)) return true;

  return hasValidGitHubSignature(
    configuredSecret,
    body,
    request.headers.get("x-hub-signature-256"),
  );
}

export async function GET(request: NextRequest) {
  if (!hasValidSecret(request)) {
    return NextResponse.json({ ok: false, message: "Invalid revalidation secret." }, { status: 401 });
  }

  revalidateTag("github-projects", "max");
  return NextResponse.json({ ok: true, revalidated: "github-projects" });
}

export async function POST(request: NextRequest) {
  const body = await request.text();

  if (!hasValidSecret(request, body)) {
    return NextResponse.json({ ok: false, message: "Invalid revalidation secret." }, { status: 401 });
  }

  revalidateTag("github-projects", "max");
  return NextResponse.json({ ok: true, revalidated: "github-projects" });
}
