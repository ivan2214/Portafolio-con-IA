import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_9sKRs49Z.mjs';
import { e as decodeKey } from './chunks/astro/server_COSLMid2.mjs';
import 'clsx';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || undefined,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : undefined,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///C:/Users/juanb/OneDrive/Desktop/Ivan/Dev/portafolio-con-ia/","adapterName":"@astrojs/vercel","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"repositories/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/repositories","isIndex":false,"type":"page","pattern":"^\\/repositories\\/?$","segments":[[{"content":"repositories","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/repositories.astro","pathname":"/repositories","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"stage":"head-inline","children":"window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };\n\t\tvar script = document.createElement('script');\n\t\tscript.defer = true;\n\t\tscript.src = '/_vercel/insights/script.js';\n\t\tvar head = document.querySelector('head');\n\t\thead.appendChild(script);\n\t"}],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/.pnpm/astro@5.1.8_jiti@2.4.2_rollup@4.31.0_typescript@5.7.3_yaml@2.7.0/node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"stage":"head-inline","children":"window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };\n\t\tvar script = document.createElement('script');\n\t\tscript.defer = true;\n\t\tscript.src = '/_vercel/insights/script.js';\n\t\tvar head = document.querySelector('head');\n\t\thead.appendChild(script);\n\t"}],"styles":[{"type":"external","src":"/_astro/index.o045Ecjt.css"}],"routeData":{"route":"/404","isIndex":false,"type":"page","pattern":"^\\/404\\/?$","segments":[[{"content":"404","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/404.astro","pathname":"/404","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"stage":"head-inline","children":"window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };\n\t\tvar script = document.createElement('script');\n\t\tscript.defer = true;\n\t\tscript.src = '/_vercel/insights/script.js';\n\t\tvar head = document.querySelector('head');\n\t\thead.appendChild(script);\n\t"}],"styles":[],"routeData":{"route":"/api/chat","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/chat\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"chat","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/chat.ts","pathname":"/api/chat","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"stage":"head-inline","children":"window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };\n\t\tvar script = document.createElement('script');\n\t\tscript.defer = true;\n\t\tscript.src = '/_vercel/insights/script.js';\n\t\tvar head = document.querySelector('head');\n\t\thead.appendChild(script);\n\t"}],"styles":[{"type":"external","src":"/_astro/index.o045Ecjt.css"}],"routeData":{"route":"/repository/[id]","isIndex":false,"type":"page","pattern":"^\\/repository\\/([^/]+?)\\/?$","segments":[[{"content":"repository","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}]],"params":["id"],"component":"src/pages/repository/[id].astro","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"stage":"head-inline","children":"window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };\n\t\tvar script = document.createElement('script');\n\t\tscript.defer = true;\n\t\tscript.src = '/_vercel/insights/script.js';\n\t\tvar head = document.querySelector('head');\n\t\thead.appendChild(script);\n\t"}],"styles":[],"routeData":{"route":"/robots.txt","isIndex":false,"type":"endpoint","pattern":"^\\/robots\\.txt\\/?$","segments":[[{"content":"robots.txt","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/robots.txt.ts","pathname":"/robots.txt","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"site":"https://ivanbong.vercel.app","base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["C:/Users/juanb/OneDrive/Desktop/Ivan/Dev/portafolio-con-ia/src/pages/repositories.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/repositories@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astrojs-ssr-virtual-entry",{"propagation":"in-tree","containsHead":false}],["C:/Users/juanb/OneDrive/Desktop/Ivan/Dev/portafolio-con-ia/src/pages/index.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/index@_@astro",{"propagation":"in-tree","containsHead":false}],["C:/Users/juanb/OneDrive/Desktop/Ivan/Dev/portafolio-con-ia/src/pages/404.astro",{"propagation":"none","containsHead":true}],["C:/Users/juanb/OneDrive/Desktop/Ivan/Dev/portafolio-con-ia/src/pages/repository/[id].astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000noop-middleware":"_noop-middleware.mjs","\u0000@astro-page:src/pages/404@_@astro":"pages/404.astro.mjs","\u0000@astro-page:src/pages/api/chat@_@ts":"pages/api/chat.astro.mjs","\u0000@astro-page:src/pages/repositories@_@astro":"pages/repositories.astro.mjs","\u0000@astro-page:src/pages/robots.txt@_@ts":"pages/robots.txt.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-page:node_modules/.pnpm/astro@5.1.8_jiti@2.4.2_rollup@4.31.0_typescript@5.7.3_yaml@2.7.0/node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:src/pages/repository/[id]@_@astro":"pages/repository/_id_.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","C:/Users/juanb/OneDrive/Desktop/Ivan/Dev/portafolio-con-ia/node_modules/.pnpm/astro@5.1.8_jiti@2.4.2_rollup@4.31.0_typescript@5.7.3_yaml@2.7.0/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_DIYr8YKW.mjs","C:/Users/juanb/OneDrive/Desktop/Ivan/Dev/portafolio-con-ia/src/assets/android-chrome-192x192.png":"chunks/android-chrome-192x192_DPYQkuhQ.mjs","C:/Users/juanb/OneDrive/Desktop/Ivan/Dev/portafolio-con-ia/src/assets/android-chrome-512x512.png":"chunks/android-chrome-512x512_G52AAZxq.mjs","C:/Users/juanb/OneDrive/Desktop/Ivan/Dev/portafolio-con-ia/src/assets/apple-touch-icon.png":"chunks/apple-touch-icon_DH1wbme_.mjs","C:/Users/juanb/OneDrive/Desktop/Ivan/Dev/portafolio-con-ia/src/assets/bitmoji/hi.webp":"chunks/hi_O61l8RQd.mjs","C:/Users/juanb/OneDrive/Desktop/Ivan/Dev/portafolio-con-ia/src/assets/bitmoji/surprised-phone.webp":"chunks/surprised-phone_BKRcNLgG.mjs","C:/Users/juanb/OneDrive/Desktop/Ivan/Dev/portafolio-con-ia/src/assets/repositories/ai-cv-recomendations.webp":"chunks/ai-cv-recomendations_Bek6H-S4.mjs","C:/Users/juanb/OneDrive/Desktop/Ivan/Dev/portafolio-con-ia/src/assets/repositories/bardahl-bolivia.webp":"chunks/bardahl-bolivia_Bhh3SvA4.mjs","C:/Users/juanb/OneDrive/Desktop/Ivan/Dev/portafolio-con-ia/src/assets/repositories/bardahl-chile.webp":"chunks/bardahl-chile_04dM0s1j.mjs","C:/Users/juanb/OneDrive/Desktop/Ivan/Dev/portafolio-con-ia/src/assets/repositories/carajo-stream.webp":"chunks/carajo-stream_CJlrP5yQ.mjs","C:/Users/juanb/OneDrive/Desktop/Ivan/Dev/portafolio-con-ia/src/assets/repositories/portafolio-con-ia-api-github.webp":"chunks/portafolio-con-ia-api-github_BrLuilwO.mjs","C:/Users/juanb/OneDrive/Desktop/Ivan/Dev/portafolio-con-ia/src/assets/repositories/portafolio-con-ia.webp":"chunks/portafolio-con-ia_CRIAwRNW.mjs","C:/Users/juanb/OneDrive/Desktop/Ivan/Dev/portafolio-con-ia/src/assets/repositories/zafiro-lules.webp":"chunks/zafiro-lules_xx-M5UVY.mjs","\u0000@astrojs-manifest":"manifest_BNRtzHWe.mjs","C:/Users/juanb/OneDrive/Desktop/Ivan/Dev/portafolio-con-ia/src/components/repository-list.astro":"chunks/RepositoryList_D7OoF96J.mjs","@/components/chat-bot":"_astro/chat-bot.BK101110.js","C:/Users/juanb/OneDrive/Desktop/Ivan/Dev/portafolio-con-ia/src/components/map-leaflet":"_astro/map-leaflet.CPjSm7Zu.js","@astrojs/react/client.js":"_astro/client.Di-N01iu.js","C:/Users/juanb/OneDrive/Desktop/Ivan/Dev/portafolio-con-ia/node_modules/.pnpm/astro@5.1.8_jiti@2.4.2_rollup@4.31.0_typescript@5.7.3_yaml@2.7.0/node_modules/astro/components/ClientRouter.astro?astro&type=script&index=0&lang.ts":"_astro/ClientRouter.astro_astro_type_script_index_0_lang.rasoniT7.js","C:/Users/juanb/OneDrive/Desktop/Ivan/Dev/portafolio-con-ia/src/components/zoomable-image.astro?astro&type=script&index=0&lang.ts":"_astro/zoomable-image.astro_astro_type_script_index_0_lang.CRYAqWYj.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["C:/Users/juanb/OneDrive/Desktop/Ivan/Dev/portafolio-con-ia/src/components/zoomable-image.astro?astro&type=script&index=0&lang.ts","const t=document.getElementById(\"image-container\"),o=document.getElementById(\"zoomable-image\");let a=!1,s=0,l=0,r=0,i=0,n=1;t.addEventListener(\"mousedown\",e=>{a=!0,s=e.clientX,l=e.clientY,t.style.cursor=\"grabbing\"});t.addEventListener(\"mousemove\",e=>{if(!a)return;const c=e.clientX-s,d=e.clientY-l;r+=c,i+=d,o.style.transform=`translate(${r}px, ${i}px) scale(${n})`,s=e.clientX,l=e.clientY});t.addEventListener(\"mouseup\",()=>{a=!1,t.style.cursor=\"grab\"});t.addEventListener(\"mouseleave\",()=>{a=!1,t.style.cursor=\"grab\"});t.addEventListener(\"wheel\",e=>{e.preventDefault(),n+=e.deltaY*-.1/100,n=Math.max(.1,Math.min(n,5)),o.style.transform=`translate(${r}px, ${i}px) scale(${n})`});"]],"assets":["/_astro/waving.Dv2b5fNq.webp","/_astro/hi.CTn2Su7Z.webp","/_astro/surprised-phone.CAEil7uh.webp","/_astro/android-chrome-192x192.CwlWFuOc.png","/_astro/android-chrome-512x512.3tKjl2z0.png","/_astro/ai-cv-recomendations.BYKdFdUm.webp","/_astro/apple-touch-icon.CUPKmH9w.png","/_astro/bardahl-bolivia.CXlLq2a9.webp","/_astro/bardahl-chile.CwCvcio9.webp","/_astro/carajo-stream.x2UH2Hxc.webp","/_astro/portafolio-con-ia-api-github.bEt0Xc7y.webp","/_astro/portafolio-con-ia.DLovb-hK.webp","/_astro/zafiro-lules.LWjYn4Ws.webp","/_astro/index.o045Ecjt.css","/favicon-16x16.png","/favicon-32x32.png","/favicon.ico","/google5e0c81d402f84ffb.html","/robots.txt","/site.webmanifest","/pdf/CV-Bongiovanni-Ivan-Front-End-ats.pdf","/_astro/chat-bot.BK101110.js","/_astro/client.Di-N01iu.js","/_astro/ClientRouter.astro_astro_type_script_index_0_lang.rasoniT7.js","/_astro/index.B-SYruCi.js","/_astro/jsx-runtime.CLpGMVip.js","/_astro/map-leaflet.CPjSm7Zu.js","/_astro/map-leaflet.Dgihpmma.css","/repositories/index.html","/index.html"],"buildFormat":"directory","checkOrigin":true,"serverIslandNameMap":[["@/components/repository-list.astro","RepositoryList"]],"key":"AeY4FB/a/GeQc4FJJl4ipir85SdzBdc7WgPQt0IFAcc="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
