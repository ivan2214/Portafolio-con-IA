import { c as createComponent, r as renderTemplate, a as renderComponent, m as maybeRenderHead, b as addAttribute } from '../chunks/astro/server_COSLMid2.mjs';
import { b as bitmojiWaving, a as buttonVariants, $ as $$BaseLayout } from '../chunks/BaseLayout_DEPz5ydd.mjs';
import { $ as $$Image } from '../chunks/_astro_assets_BMifZ8oB.mjs';
export { renderers } from '../renderers.mjs';

const $$404 = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "404 - Not Found", "description": "404 Error \u2014 this page was not found" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="flex h-[80vh] flex-auto"> <div class="flex flex-col items-center justify-center px-8"> ${renderComponent($$result2, "Image", $$Image, { "src": bitmojiWaving, "alt": "404", "class": "mb-8 size-64" })} <p class="text-sm text-muted-foreground">404</p> <h1 class="text-4xl font-extrabold tracking-tight lg:text-5xl">
Page not found
</h1> <p class="mb-4 leading-7 [&:not(:first-child)]:mt-6">
Sorry, we couldn't find the page you're looking for.
</p> <a href="/" rel="noreferrer"${addAttribute(buttonVariants(), "class")}> Go back home</a> </div> </main> ` })}`;
}, "C:/Users/juanb/OneDrive/Desktop/Ivan/Dev/portafolio-con-ia/src/pages/404.astro", undefined);

const $$file = "C:/Users/juanb/OneDrive/Desktop/Ivan/Dev/portafolio-con-ia/src/pages/404.astro";
const $$url = "/404";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$404,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
