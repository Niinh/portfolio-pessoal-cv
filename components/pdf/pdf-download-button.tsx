"use client";

import { FileDown, Loader2 } from "lucide-react";
import { useCallback, useState } from "react";

const PDF_SOURCE_PATH = "/pdf-export";
const PDF_FILENAME = "bruno-neves-curriculo-portfolio.pdf";

type DownloadState = "idle" | "loading" | "success" | "error";

function waitForFrameLoad(iframe: HTMLIFrameElement) {
  return new Promise<void>((resolve, reject) => {
    const timeoutId = window.setTimeout(() => {
      reject(new Error("Tempo limite ao preparar o PDF."));
    }, 20000);

    iframe.addEventListener(
      "load",
      () => {
        window.clearTimeout(timeoutId);
        resolve();
      },
      { once: true },
    );
  });
}

async function waitForAssets(documentRef: Document) {
  if ("fonts" in documentRef) {
    await documentRef.fonts.ready;
  }

  const pendingImages = Array.from(documentRef.images).filter((image) => !image.complete);

  await Promise.all(
    pendingImages.map(
      (image) =>
        new Promise<void>((resolve) => {
          image.addEventListener("load", () => resolve(), { once: true });
          image.addEventListener("error", () => resolve(), { once: true });
        }),
    ),
  );

  await new Promise((resolve) => window.setTimeout(resolve, 250));
}

function createPdfFrame() {
  const existingFrame = document.getElementById("portfolio-pdf-frame");
  existingFrame?.remove();

  const iframe = document.createElement("iframe");
  iframe.id = "portfolio-pdf-frame";
  iframe.title = "Documento do currículo e portfólio em PDF";
  iframe.style.border = "0";
  iframe.style.height = "1280px";
  iframe.style.left = "-12000px";
  iframe.style.opacity = "0";
  iframe.style.pointerEvents = "none";
  iframe.style.position = "fixed";
  iframe.style.top = "0";
  iframe.style.width = "920px";
  iframe.style.zIndex = "-1";

  document.body.appendChild(iframe);
  return iframe;
}

export function PdfDownloadButton() {
  const [state, setState] = useState<DownloadState>("idle");

  const handleDownload = useCallback(async () => {
    if (state === "loading") return;

    setState("loading");
    let iframe: HTMLIFrameElement | null = null;

    try {
      const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
        import("html2canvas"),
        import("jspdf"),
      ]);

      iframe = createPdfFrame();
      const frameLoad = waitForFrameLoad(iframe);
      iframe.src = `${PDF_SOURCE_PATH}?v=${Date.now()}`;
      await frameLoad;

      const frameDocument = iframe.contentDocument;
      if (!frameDocument) {
        throw new Error("Nao foi possivel acessar o documento do PDF.");
      }

      await waitForAssets(frameDocument);

      const pages = Array.from(frameDocument.querySelectorAll<HTMLElement>(".pdf-page"));
      if (!pages.length) {
        throw new Error("Nenhuma pagina de PDF foi encontrada.");
      }

      const pdf = new jsPDF({
        compress: true,
        format: "a4",
        orientation: "portrait",
        unit: "mm",
      });

      for (const [index, page] of pages.entries()) {
        const canvas = await html2canvas(page, {
          backgroundColor: "#0c0907",
          logging: false,
          scale: Math.min(window.devicePixelRatio || 1, 2),
          useCORS: true,
          windowHeight: page.scrollHeight,
          windowWidth: page.scrollWidth,
        });

        const image = canvas.toDataURL("image/jpeg", 0.96);

        if (index > 0) {
          pdf.addPage();
        }

        pdf.addImage(image, "JPEG", 0, 0, 210, 297, undefined, "FAST");
      }

      pdf.save(PDF_FILENAME);
      setState("success");
      window.setTimeout(() => setState("idle"), 2200);
    } catch (error) {
      console.error(error);
      setState("error");
      window.setTimeout(() => setState("idle"), 3200);
    } finally {
      iframe?.remove();
    }
  }, [state]);

  const label =
    state === "loading"
      ? "Gerando PDF"
      : state === "success"
        ? "PDF gerado"
        : state === "error"
          ? "Tentar de novo"
          : "Baixar PDF";

  return (
    <button
      className="pdf-floating-button"
      type="button"
      onClick={handleDownload}
      disabled={state === "loading"}
      aria-live="polite"
    >
      {state === "loading" ? (
        <Loader2 aria-hidden className="pdf-floating-button__spinner" size={18} />
      ) : (
        <FileDown aria-hidden size={18} />
      )}
      <span>{label}</span>
    </button>
  );
}
