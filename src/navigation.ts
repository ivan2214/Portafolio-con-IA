import type { NavLink, SocialLink } from "@/types";
import { MdiGithub, MdiLinkedin, LineMdTwitterX } from "./components/icons";

export const NAV_LINKS: NavLink[] = [
  {
    title: "Repositorios",
    href: "/repositories",
  },
];

export const SOCIAL_LINKS: SocialLink[] = [
  {
    name: "GitHub",
    href: "https://github.com/ivan2214",
    icon: MdiGithub,
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/bongiovanni-ivan45/",
    icon: MdiLinkedin,
  },
  {
    name: "Twitter",
    href: "https://twitter.com/bongiovanniDev",
    icon: LineMdTwitterX,
  },
];
