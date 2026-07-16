export const siteConfig = {
  name: "Bruno Neves",
  role: "Desenvolvedor Web & Designer Digital",
  headline: "Sistemas web modernos para vender, operar e crescer.",
  description:
    "Portfólio profissional de Bruno Neves, especialista em desenvolvimento web, interfaces digitais, automações, SaaS, landing pages e soluções visuais para negócios.",
  githubUsername: process.env.GITHUB_USERNAME ?? "Niinh",
  siteUrl: process.env.SITE_URL ?? process.env.URL ?? "https://brunoneves.netlify.app",
  contact: {
    email: "niin.neves5825@gmail.com",
    formEmail: "nevesniin@gmail.com",
    phone: "+55 11 96332-0624",
    whatsapp: "5511963320624",
    location: "São Paulo - Brasil",
    birthday: "01 de Maio de 1998",
  },
  links: {
    github: "https://github.com/Niinh",
    linkedin: "https://www.linkedin.com/in/bruno-de-souza-neves-960617124/",
    instagram: "https://instagram.com/brunosneves/",
  },
};

export const navItems = [
  { label: "Sobre", href: "#sobre" },
  { label: "Resumo", href: "#resumo" },
  { label: "Projetos", href: "/projetos" },
  { label: "Serviços", href: "#servicos" },
  { label: "Contato", href: "#contato" },
];
