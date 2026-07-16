import type { Metadata } from "next";

import { PdfExportDocument } from "@/components/pdf/pdf-export-document";
import { getPortfolioProjects } from "@/lib/projects/get-projects";

export const revalidate = 1800;

export const metadata: Metadata = {
  title: "Currículo e Portfólio em PDF",
  robots: {
    follow: false,
    index: false,
  },
};

export default async function PdfExportPage() {
  const projects = await getPortfolioProjects();

  return (
    <main className="pdf-source-page">
      <PdfExportDocument projects={projects} />
    </main>
  );
}
