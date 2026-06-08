import { ContactSection } from "@/components/sections/contact-section";
import { HeroSection } from "@/components/sections/hero-section";
import { ManifestoSection } from "@/components/sections/manifesto-section";
import { ProcessSection } from "@/components/sections/process-section";
import { ProjectsPreviewSection } from "@/components/sections/projects-preview-section";
import { ResumeSection } from "@/components/sections/resume-section";
import { ServicesSection } from "@/components/sections/services-section";
import { getFeaturedProjects } from "@/lib/projects/get-projects";

export const revalidate = 1800;

export default async function HomePage() {
  const projects = await getFeaturedProjects(4);

  return (
    <main>
      <HeroSection />
      <ManifestoSection />
      <ResumeSection />
      <ProjectsPreviewSection projects={projects} />
      <ServicesSection />
      <ProcessSection />
      <ContactSection />
    </main>
  );
}
