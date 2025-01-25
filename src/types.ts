import type { SVGProps, JSX } from "react";

export type Page = {
  TITLE: string;
  DESCRIPTION: string;
};

export interface Site extends Page {
  AUTHOR: string;
}

export type Socials = {
  NAME: string;
  ICON: string;
  TEXT: string;
  HREF: string;
}[];

export type Study = {
  title: string;
  institution: string;
  link: string;
  date: string;
};

export type Experience = {
  company: string;
  location: string;
  position: string;
  start: string;
  end: string;
  link?: string;
  isPractices?: boolean;
  tasks: string[];
};

export type Networks = {
  network: string;
  link: string;
}[];

export interface NavLink {
  title: string;
  href: string;
}

export interface SocialLink {
  name: string;
  href: string;
  icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
}
export interface Repository {
  homepage?: string;
  id: number;
  node_id: string;
  name: string;
  full_name: string;
  private: boolean;
  owner: Owner;
  html_url: string;
  description: string | null;
  fork: boolean;
  url: string;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  size: number;
  stargazers_count: number;
  watchers_count: number;
  language: string | null;
  forks_count: number;
  open_issues_count: number;
  default_branch: string;
  topics?: string[];
  visibility?: string;
  image?: string;
  readme?: string;
}

export interface Owner {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  html_url: string;
  type: string;
  site_admin: boolean;
}

export type Repositories = Repository[];
