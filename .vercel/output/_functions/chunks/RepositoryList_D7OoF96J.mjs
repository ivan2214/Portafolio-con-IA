import { c as createComponent, r as renderTemplate, m as maybeRenderHead, f as renderSlot, g as createAstro, a as renderComponent, b as addAttribute } from './astro/server_COSLMid2.mjs';
import 'clsx';
import { B as Badge, f as fetchRepositories } from './badge_DdwSWGq6.mjs';
import { c as cn } from './utils_B05Dmz_H.mjs';
import { C as Card, a as CardHeader, b as CardTitle, c as CardContent, d as CardDescription } from './card_Dh76H49h.mjs';

const $$Masonry = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section id="masonry" class="columns-1 p-10 sm:columns-2 lg:columns-3 xl:columns-4"> ${renderSlot($$result, $$slots["items"])} </section>`;
}, "C:/Users/juanb/OneDrive/Desktop/Ivan/Dev/portafolio-con-ia/src/components/masonry.astro", undefined);

const $$MasonryItem = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<article class="my-2 md:my-4 break-inside-avoid"> ${renderSlot($$result, $$slots["default"])} </article>`;
}, "C:/Users/juanb/OneDrive/Desktop/Ivan/Dev/portafolio-con-ia/src/components/masonry-item.astro", undefined);

const $$Astro$1 = createAstro("https://ivanbong.vercel.app");
const $$RepositoryCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$RepositoryCard;
  const { repository } = Astro2.props;
  const hasImage = repository.image && repository.image !== "" && repository.image.length > 0;
  const getRandomColspan = () => Math.floor(Math.random() * 2) + 1;
  const getRandomRowspan = () => Math.floor(Math.random() * 2) + 1;
  const col = `col-span-${getRandomColspan()}`;
  let row = `row-span-${getRandomRowspan()}`;
  if (col === "col-span-2") {
    row = "row-span-2";
  }
  console.log("Repository Card Image", repository?.image);
  console.log("Has Image?", hasImage);
  return renderTemplate`${renderComponent($$result, "Card", Card, { "className": cn(
    "relative h-auto w-full rounded-2xl",
    hasImage ? "h-full" : "h-fit",
    col,
    row
  ) }, { "default": ($$result2) => renderTemplate`${hasImage ? renderTemplate`${renderComponent($$result2, "CardHeader", CardHeader, { "className": "mt-4" }, { "default": ($$result3) => renderTemplate` ${maybeRenderHead()}<img${addAttribute(repository.image, "src")}${addAttribute(repository.name, "alt")} class="max-h-[200px] w-full rounded-2xl object-cover"> ` })}` : renderTemplate`${renderComponent($$result2, "CardHeader", CardHeader, { "className": "mt-4" }, { "default": ($$result3) => renderTemplate` <a class="hover:underline"${addAttribute(`/repository/${repository?.id}`, "href")}> ${renderComponent($$result3, "CardTitle", CardTitle, { "className": "font-bold text-2xl" }, { "default": ($$result4) => renderTemplate`${repository.name}` })} </a> ` })}`}${renderComponent($$result2, "CardContent", CardContent, {}, { "default": ($$result3) => renderTemplate`${hasImage && renderTemplate`<a class="hover:underline"${addAttribute(`/repository/${repository?.id}`, "href")}> ${renderComponent($$result3, "CardTitle", CardTitle, { "className": "font-bold text-2xl" }, { "default": ($$result4) => renderTemplate`${repository.name}` })} </a>`}${renderComponent($$result3, "CardDescription", CardDescription, { "className": "whitespace-pre-wrap" }, { "default": ($$result4) => renderTemplate`${repository.description ?? "Click en el titulo para leer el readme del proyecto"}` })} ` })} ${repository.language && renderTemplate`${renderComponent($$result2, "Badge", Badge, { "className": "absolute top-2 right-2" }, { "default": ($$result3) => renderTemplate`${repository.language}` })}`}` })}`;
}, "C:/Users/juanb/OneDrive/Desktop/Ivan/Dev/portafolio-con-ia/src/components/repository-card.astro", undefined);

const $$Astro = createAstro("https://ivanbong.vercel.app");
const $$RepositoryList = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$RepositoryList;
  const repositories = await fetchRepositories();
  if (!repositories) {
    return Astro2.redirect("/");
  }
  return renderTemplate`${renderComponent($$result, "Masonry", $$Masonry, {}, { "items": ($$result2) => renderTemplate`${repositories.map((repository) => renderTemplate`${renderComponent($$result2, "MasonryItem", $$MasonryItem, { "slot": "items" }, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "RepositoryCard", $$RepositoryCard, { "repository": repository })} ` })}`)}` })}`;
}, "C:/Users/juanb/OneDrive/Desktop/Ivan/Dev/portafolio-con-ia/src/components/repository-list.astro", undefined);

const $$file = "C:/Users/juanb/OneDrive/Desktop/Ivan/Dev/portafolio-con-ia/src/components/repository-list.astro";
const $$url = undefined;

export { $$RepositoryList as default, $$file as file, $$url as url };
