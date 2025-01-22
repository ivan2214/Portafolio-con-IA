import { g as createAstro, c as createComponent, r as renderTemplate, b as addAttribute, h as renderScript, m as maybeRenderHead, s as spreadAttributes, a as renderComponent, i as renderHead, f as renderSlot } from './astro/server_COSLMid2.mjs';
import 'clsx';
/* empty css                         */
import { jsx } from 'react/jsx-runtime';
import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import { c as cn } from './utils_B05Dmz_H.mjs';
import { $ as $$Image } from './_astro_assets_BMifZ8oB.mjs';

const $$Astro$5 = createAstro("https://ivanbong.vercel.app");
const $$ClientRouter = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$ClientRouter;
  const { fallback = "animate" } = Astro2.props;
  return renderTemplate`<meta name="astro-view-transitions-enabled" content="true"><meta name="astro-view-transitions-fallback"${addAttribute(fallback, "content")}>${renderScript($$result, "C:/Users/juanb/OneDrive/Desktop/Ivan/Dev/portafolio-con-ia/node_modules/.pnpm/astro@5.1.8_jiti@2.4.2_rollup@4.31.0_typescript@5.7.3_yaml@2.7.0/node_modules/astro/components/ClientRouter.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/juanb/OneDrive/Desktop/Ivan/Dev/portafolio-con-ia/node_modules/.pnpm/astro@5.1.8_jiti@2.4.2_rollup@4.31.0_typescript@5.7.3_yaml@2.7.0/node_modules/astro/components/ClientRouter.astro", undefined);

const $$Astro$4 = createAstro("https://ivanbong.vercel.app");
const $$HeadSEO = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$HeadSEO;
  const canonicalURL = new URL(Astro2.url.pathname, Astro2.site);
  if (Astro2.props.ogImage === undefined) {
    Astro2.props.ogImage = new URL("home.webp", canonicalURL);
  }
  const { title, description, ogImage = "/home.webp" } = Astro2.props;
  return renderTemplate`<meta charset="utf-8"><meta name="robots" content="index, follow"><meta name="googlebot" content="index, follow"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="generator"${addAttribute(Astro2.generator, "content")}><!-- primary Meta Tags --><title>${title}</title><meta name="title"${addAttribute(title, "content")}><meta name="description"${addAttribute(description, "content")}><!-- Open Graph --><meta property="og:type" content="website"><meta property="og:url"${addAttribute(Astro2.url, "content")}><meta property="og:title"${addAttribute(title, "content")}><meta property="og:description"${addAttribute(description, "content")}><meta property="og:image"${addAttribute(new URL(ogImage, Astro2.url), "content")}><meta property="og:site_name" content="Ivan Bongiovanni Portfolio"><meta property="og:locale" content="es_AR"><!-- Twitter --><meta property="twitter:card" content="summary_large_image"><meta property="twitter:url"${addAttribute(Astro2.url, "content")}><meta property="twitter:title"${addAttribute(title, "content")}><meta property="twitter:description"${addAttribute(description, "content")}><meta property="twitter:site"${addAttribute(canonicalURL, "content")}><meta property="twitter:image"${addAttribute(new URL(ogImage, Astro2.url), "content")}><!-- Meta Tags SEO --><meta name="keywords" content="portfolio, bongiovanni, bongiovanniivan, javascript, typescript, astro, nextjs, tailwindcss, shadcn, prisma, docker, git, fullstack, developer, tucuman, argentina, repositories, cv, frontend, backend,"><!-- Iconos --><link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"><link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"><link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"><link rel="icon" type="image/svg+xml" href="/favicon.ico"><!-- Sitemap --><link rel="sitemap" href="/sitemap-index.xml"><!-- Canonical --><link rel="canonical"${addAttribute(canonicalURL, "href")}><!-- Favicon Shortcut (si es necesario) --><link rel="shortcut icon" type="image/svg+xml" href="/favicon.ico"><!-- Manifest --><link rel="manifest" href="/site.webmanifest">`;
}, "C:/Users/juanb/OneDrive/Desktop/Ivan/Dev/portafolio-con-ia/src/components/HeadSEO.astro", undefined);

const $$Astro$3 = createAstro("https://ivanbong.vercel.app");
const $$Footer = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$Footer;
  return renderTemplate`${maybeRenderHead()}<footer class="mt-auto border-t py-6 text-center md:px-8 md:py-0"> <div class="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row md:justify-center"> <p class="text-center text-muted-foreground text-sm leading-loose">
Creado por
<a href="https://github.com/ivan2214" target="_blank" rel="noreferrer" class="mx-1 font-medium underline underline-offset-4">
ivan2214
</a>
usando Astro y Tailwind CSS.
<span class="text-red-500">❤️</span>${" "} </p>${" "} </div>${" "} </footer>`;
}, "C:/Users/juanb/OneDrive/Desktop/Ivan/Dev/portafolio-con-ia/src/components/footer.astro", undefined);

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsx(
      Comp,
      {
        className: cn(buttonVariants({ variant, size, className })),
        ref,
        ...props
      }
    );
  }
);
Button.displayName = "Button";

const bitmojiWaving = new Proxy({"src":"/_astro/waving.Dv2b5fNq.webp","width":1592,"height":1592,"format":"webp"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/juanb/OneDrive/Desktop/Ivan/Dev/portafolio-con-ia/src/assets/bitmoji/waving.webp";
							}
							
							return target[name];
						}
					});

const waving = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: bitmojiWaving
}, Symbol.toStringTag, { value: 'Module' }));

const NAV_LINKS = [
  {
    title: "Repositorios",
    href: "/repositories"
  }
];
const SOCIAL_LINKS = [
  {
    name: "GitHub",
    href: "https://github.com/ivan2214"
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/bongiovanni-ivan45/"
  },
  {
    name: "Twitter",
    href: "https://twitter.com/bongiovanniDev"
  }
];

const $$Astro$2 = createAstro("https://ivanbong.vercel.app");
const $$NavLinks = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$NavLinks;
  const { className } = Astro2.props;
  const pathname = new URL(Astro2.request.url).pathname;
  return renderTemplate`${maybeRenderHead()}<nav${addAttribute(cn("hidden items-center space-x-4 md:flex", className), "class")}> ${NAV_LINKS.map((link) => renderTemplate`<a${addAttribute(link.href, "href")}${addAttribute(cn(
    "font-medium text-sm transition-colors hover:text-primary",
    pathname === link.href ? "text-primary" : "text-muted-foreground"
  ), "class")}> ${link.title} </a>`)} </nav>`;
}, "C:/Users/juanb/OneDrive/Desktop/Ivan/Dev/portafolio-con-ia/src/components/nav-links.astro", undefined);

const $$Astro$1 = createAstro("https://ivanbong.vercel.app");
const $$SocialLinks = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$SocialLinks;
  const { className, ...props } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<nav${addAttribute(cn("flex items-center space-x-1", className), "class")}${spreadAttributes(props)}> ${SOCIAL_LINKS.map((link) => renderTemplate`${renderComponent($$result, "Button", Button, { "key": link.name, "variant": "ghost", "size": "icon" }, { "default": ($$result2) => renderTemplate` <a${addAttribute(link.href, "href")} target="_blank" rel="noopener noreferrer" class="transition-colors hover:text-primary"> <span class="sr-only">${link.name}</span> </a> ` })}`)} </nav>`;
}, "C:/Users/juanb/OneDrive/Desktop/Ivan/Dev/portafolio-con-ia/src/components/social-links.astro", undefined);

const $$Header = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<header class="sticky top-0 z-50 w-full border-border/40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"> <div class="container flex h-14 max-w-screen-2xl items-center gap-4 px-5"> <div class="flex items-center gap-4"> <a href="/" class="flex items-center space-x-2"> <div class="h-10 w-10"> ${renderComponent($$result, "Image", $$Image, { "src": bitmojiWaving, "class": "h-full w-full", "alt": "Personaje animado saludando" })} </div> <span class="font-bold sm:inline-block">Portafolio IA</span> </a> ${renderComponent($$result, "NavLinks", $$NavLinks, {})} </div> <div class="ml-auto flex items-center justify-between space-x-2 md:justify-end"> <div class="hidden w-full flex-1 md:block md:w-auto md:flex-none"> ${renderComponent($$result, "Button", Button, { "className": "text-muted-foreground", "variant": "outline" }, { "default": ($$result2) => renderTemplate` <a target="_blank" rel="noopener noreferrer" href="https://linkedin.com/in/ivan2214">
Contáctame
</a> ` })} </div> </div> ${renderComponent($$result, "SocialLinks", $$SocialLinks, {})} </div>  </header>`;
}, "C:/Users/juanb/OneDrive/Desktop/Ivan/Dev/portafolio-con-ia/src/components/header.astro", undefined);

const $$Astro = createAstro("https://ivanbong.vercel.app");
const $$BaseLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$BaseLayout;
  const { title, description, ogImage } = Astro2.props;
  return renderTemplate`<html lang="es"> <head>${renderComponent($$result, "HeadSEO", $$HeadSEO, { "title": title, "description": description, "ogImage": ogImage })}${renderComponent($$result, "ClientRouter", $$ClientRouter, {})}${renderHead()}</head> <body class="container mx-auto h-full w-full antialiased dark"> <main class="flex flex-col items-center justify-center"> ${renderComponent($$result, "Header", $$Header, {})} ${renderSlot($$result, $$slots["default"])} ${renderComponent($$result, "Footer", $$Footer, {})} </main> </body></html>`;
}, "C:/Users/juanb/OneDrive/Desktop/Ivan/Dev/portafolio-con-ia/src/layouts/BaseLayout.astro", undefined);

export { $$BaseLayout as $, Button as B, buttonVariants as a, bitmojiWaving as b, waving as w };
