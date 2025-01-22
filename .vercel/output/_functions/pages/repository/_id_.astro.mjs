import { g as createAstro, c as createComponent, r as renderTemplate, m as maybeRenderHead, a as renderComponent, h as renderScript, b as addAttribute, u as unescapeHTML } from '../../chunks/astro/server_COSLMid2.mjs';
import { jsx, jsxs } from 'react/jsx-runtime';
import { B as Badge, a as fetchRepositoryDetails } from '../../chunks/badge_DdwSWGq6.mjs';
import { B as Button, $ as $$BaseLayout } from '../../chunks/BaseLayout_DEPz5ydd.mjs';
import { C as Card, a as CardHeader, b as CardTitle, c as CardContent, e as CardFooter } from '../../chunks/card_Dh76H49h.mjs';
import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import { c as cn } from '../../chunks/utils_B05Dmz_H.mjs';
import { useChat } from 'ai/react';
import sanitizeHtml from 'sanitize-html';
import { $ as $$Image } from '../../chunks/_astro_assets_BMifZ8oB.mjs';
export { renderers } from '../../renderers.mjs';

const Input = React.forwardRef(
  ({ className, type, ...props }, ref) => {
    return /* @__PURE__ */ jsx(
      "input",
      {
        type,
        className: cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Input.displayName = "Input";

function ChatBot({ repository }) {
  if (!repository) {
    return null;
  }
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef(null);
  const chatContentRef = useRef(null);
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: "/api/chat",
    body: { repositoryId: repository?.id }
  });
  const typicalQuestions = [
    "¿Cuál es el propósito principal de este proyecto?",
    "¿Qué tecnologías se utilizaron en este proyecto?",
    "¿Cómo puedo contribuir a este proyecto?",
    "¿Cuáles son las principales características de este proyecto?"
  ];
  const toggleChat = () => setIsOpen(!isOpen);
  useEffect(() => {
    if (chatContentRef.current) {
      chatContentRef.current.scrollTo({
        top: chatContentRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  }, [messages]);
  if (!isOpen) {
    return /* @__PURE__ */ jsxs(
      Button,
      {
        className: "fixed right-4 bottom-4 flex items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-all duration-300 hover:bg-primary/90",
        onClick: toggleChat,
        children: [
          "Chat sobre ",
          repository.name
        ]
      }
    );
  }
  const addQuestion = (question) => {
    if (inputRef.current) {
      const event = {
        target: { value: question },
        // Puedes agregar las demás propiedades necesarias de un ChangeEvent
        currentTarget: inputRef.current,
        nativeEvent: new Event("input"),
        bubbles: true,
        cancelable: true
      };
      handleInputChange(event);
    }
  };
  const onClose = () => {
    setIsOpen(false);
  };
  return /* @__PURE__ */ jsxs(Card, { className: "fixed right-4 bottom-4 w-[500px] rounded-lg bg-background/80 shadow-xl backdrop-blur-sm transition-all duration-300", children: [
    /* @__PURE__ */ jsx(CardHeader, { className: "rounded-t-lg bg-primary text-primary-foreground", children: /* @__PURE__ */ jsxs(CardTitle, { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxs("span", { children: [
        "Chat sobre ",
        repository.name
      ] }),
      /* @__PURE__ */ jsx(
        Button,
        {
          variant: "ghost",
          size: "sm",
          onClick: onClose,
          className: "h-6 w-6 rounded-full"
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxs(
      CardContent,
      {
        className: "h-80 space-y-4 overflow-y-auto overflow-x-hidden p-4",
        ref: chatContentRef,
        children: [
          messages.length === 0 && /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
            /* @__PURE__ */ jsx("p", { className: "mb-2 font-semibold", children: "Preguntas sugeridas:" }),
            /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-2", children: typicalQuestions.map((question) => /* @__PURE__ */ jsx(
              Badge,
              {
                variant: "outline",
                className: "cursor-pointer rounded py-2 transition-colors duration-200 hover:bg-primary/10",
                onClick: () => addQuestion(question),
                children: question
              },
              question
            )) })
          ] }),
          messages.map((message) => /* @__PURE__ */ jsxs(
            "div",
            {
              className: cn(
                "max-w-xs rounded-lg p-2",
                message.role === "user" ? "ml-auto overflow-hidden rounded bg-primary text-primary-foreground" : "mr-auto overflow-hidden rounded bg-secondary text-secondary-foreground"
              ),
              children: [
                /* @__PURE__ */ jsx("strong", { className: cn("mb-2 block font-semibold"), children: message.role === "user" ? /* @__PURE__ */ jsxs(Badge, { variant: "outline", className: "text-primary-foreground", children: [
                  "Tú:",
                  " "
                ] }) : /* @__PURE__ */ jsx(Badge, { children: "IA: " }) }),
                /* @__PURE__ */ jsx("div", { children: message.content.split("```").map((part, index) => {
                  if (index % 2 === 1) {
                    return /* @__PURE__ */ jsx(
                      "pre",
                      {
                        className: "my-2 overflow-x-auto rounded bg-gray-800 p-2 text-white",
                        children: /* @__PURE__ */ jsx("code", { children: part.trim() })
                      },
                      part
                    );
                  }
                  return /* @__PURE__ */ jsx("p", { className: "my-2 whitespace-pre-wrap", children: part }, part);
                }) })
              ]
            },
            message.id
          ))
        ]
      }
    ),
    /* @__PURE__ */ jsx(CardFooter, { className: "p-4", children: /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "flex w-full", children: [
      /* @__PURE__ */ jsx(
        Input,
        {
          ref: inputRef,
          value: input,
          onChange: handleInputChange,
          placeholder: "Pregunta sobre el proyecto...",
          className: "mr-2 flex-grow"
        }
      ),
      /* @__PURE__ */ jsx(Button, { disabled: isLoading, type: "submit", children: isLoading ? "Enviando..." : "Enviar" })
    ] }) })
  ] });
}

const $$Astro$2 = createAstro("https://ivanbong.vercel.app");
const $$ZoomableImage = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$ZoomableImage;
  const { src, alt } = Astro2.props;
  const images = /* #__PURE__ */ Object.assign({"/src/assets/android-chrome-192x192.png": () => import('../../chunks/android-chrome-192x192_DPYQkuhQ.mjs'),"/src/assets/android-chrome-512x512.png": () => import('../../chunks/android-chrome-512x512_G52AAZxq.mjs'),"/src/assets/apple-touch-icon.png": () => import('../../chunks/apple-touch-icon_DH1wbme_.mjs'),"/src/assets/bitmoji/hi.webp": () => import('../../chunks/hi_O61l8RQd.mjs'),"/src/assets/bitmoji/surprised-phone.webp": () => import('../../chunks/surprised-phone_BKRcNLgG.mjs'),"/src/assets/bitmoji/waving.webp": () => import('../../chunks/BaseLayout_DEPz5ydd.mjs').then(n => n.w),"/src/assets/repositories/ai-cv-recomendations.webp": () => import('../../chunks/ai-cv-recomendations_Bek6H-S4.mjs'),"/src/assets/repositories/bardahl-bolivia.webp": () => import('../../chunks/bardahl-bolivia_Bhh3SvA4.mjs'),"/src/assets/repositories/bardahl-chile.webp": () => import('../../chunks/bardahl-chile_04dM0s1j.mjs'),"/src/assets/repositories/carajo-stream.webp": () => import('../../chunks/carajo-stream_CJlrP5yQ.mjs'),"/src/assets/repositories/portafolio-con-ia-api-github.webp": () => import('../../chunks/portafolio-con-ia-api-github_BrLuilwO.mjs'),"/src/assets/repositories/portafolio-con-ia.webp": () => import('../../chunks/portafolio-con-ia_CRIAwRNW.mjs'),"/src/assets/repositories/zafiro-lules.webp": () => import('../../chunks/zafiro-lules_xx-M5UVY.mjs')

});
  if (!images[src]) {
    throw new Error(
      `"${src}" does not exist in glob: "src/assets/**/*.{jpeg,jpg,png,gif,webp}"`
    );
  }
  return renderTemplate`${maybeRenderHead()}<div class="relative w-full h-96 overflow-hidden rounded-2xl"> <div class="relative bg-gray-300 w-full rounded-2xl h-full cursor-grab active:cursor-grabbing" id="image-container"> ${renderComponent($$result, "Image", $$Image, { "src": images[src](), "alt": alt, "class": "absolute top-0 p-5 rounded-2xl left-0 w-full h-auto object-cover", "id": "zoomable-image" })} </div> </div> ${renderScript($$result, "C:/Users/juanb/OneDrive/Desktop/Ivan/Dev/portafolio-con-ia/src/components/zoomable-image.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/juanb/OneDrive/Desktop/Ivan/Dev/portafolio-con-ia/src/components/zoomable-image.astro", undefined);

const $$Astro$1 = createAstro("https://ivanbong.vercel.app");
const $$RepositoryDetail = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$RepositoryDetail;
  const { repository } = Astro2.props;
  if (!repository) {
    Astro2.redirect("/");
  }
  const sanitizedHtml = sanitizeHtml(repository.readme || "", {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(["pre", "code"]),
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      code: ["class"]
    }
  });
  return renderTemplate`${renderComponent($$result, "Card", Card, { "className": "w-full relative h-full" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "CardHeader", CardHeader, {}, { "default": ($$result3) => renderTemplate`${repository?.image && renderTemplate`${renderComponent($$result3, "ZoomableImage", $$ZoomableImage, { "src": repository?.image, "alt": repository?.name })}`}${renderComponent($$result3, "CardTitle", CardTitle, { "className": "my-2 text-3xl" }, { "default": ($$result4) => renderTemplate`${repository?.name}` })} ` })} ${renderComponent($$result2, "CardContent", CardContent, {}, { "default": ($$result3) => renderTemplate`${repository.description && renderTemplate`${maybeRenderHead()}<p class="mb-4 text-lg">${repository?.description}</p>`}${repository.language && renderTemplate`<p class="mb-4"> <strong>Lenguaje:</strong> ${repository?.language} </p>`}${repository?.topics && repository?.topics?.length > 0 && renderTemplate`<div class="mb-4 flex flex-wrap gap-2"> ${repository.topics?.map((topic) => renderTemplate`${renderComponent($$result3, "Badge", Badge, { "variant": Math.random() > 0.5 ? "outline" : "default", "className": "select-none" }, { "default": ($$result4) => renderTemplate`${topic}` })}`)} </div>`}<div class="mb-6 flex space-x-4"> ${renderComponent($$result3, "Button", Button, { "variant": "outline" }, { "default": ($$result4) => renderTemplate` <a${addAttribute(repository?.html_url, "href")} target="_blank" rel="noopener noreferrer" class="inline-flex items-center">
Ver en GitHub
</a> ` })} ${repository?.homepage && renderTemplate`${renderComponent($$result3, "Button", Button, {}, { "default": ($$result4) => renderTemplate` <a${addAttribute(repository?.homepage, "href")} target="_blank" rel="noopener noreferrer" class="inline-flex items-center">
Ver en sitio web
</a> ` })}`} </div> ${repository?.readme && renderTemplate`<div class="prose dark:prose-invert rounded border p-4"> <h2 class="mb-4 font-bold text-2xl">README.md</h2> <div>${unescapeHTML(sanitizedHtml)}</div> </div>`}` })} ${renderComponent($$result2, "Badge", Badge, { "className": "absolute rounded-2xl top-2 right-2" }, { "default": ($$result3) => renderTemplate`Zoom y arrastra para mover` })} ` })}`;
}, "C:/Users/juanb/OneDrive/Desktop/Ivan/Dev/portafolio-con-ia/src/components/repository-detail.astro", undefined);

const $$Astro = createAstro("https://ivanbong.vercel.app");
const prerender = false;
const $$id = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$id;
  const { id } = Astro2.params;
  if (!id || id === undefined) {
    return Astro2.redirect("/");
  }
  const repositoryId = Number.parseInt(id);
  if (!repositoryId) {
    return Astro2.redirect("/");
  }
  const repository = await fetchRepositoryDetails(repositoryId);
  if (!repository) {
    return Astro2.redirect("/");
  }
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, {}, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="h-full p-10 w-full container grid place-items-center mx-auto"> ${renderComponent($$result2, "RepositoryDetail", $$RepositoryDetail, { "repository": repository })} ${renderComponent($$result2, "ChatBot", ChatBot, { "client:load": true, "repository": repository, "client:component-hydration": "load", "client:component-path": "@/components/chat-bot", "client:component-export": "ChatBot" })} </section> ` })}`;
}, "C:/Users/juanb/OneDrive/Desktop/Ivan/Dev/portafolio-con-ia/src/pages/repository/[id].astro", undefined);

const $$file = "C:/Users/juanb/OneDrive/Desktop/Ivan/Dev/portafolio-con-ia/src/pages/repository/[id].astro";
const $$url = "/repository/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$id,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
