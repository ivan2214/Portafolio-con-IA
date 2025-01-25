import type { NavLink, SocialLink } from "@/types";
import { MdiGithub } from "./components/icons/github";
import { MdiLinkedin } from "./components/icons/linkedin";
import { MdiTwitter } from "./components/icons/twitter";

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
    icon: MdiTwitter,
  },
];
