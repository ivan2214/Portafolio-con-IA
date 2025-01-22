import { renderers } from './renderers.mjs';
import { c as createExports } from './chunks/entrypoint_DDdiRrMo.mjs';
import { manifest } from './manifest_BNRtzHWe.mjs';

const serverIslandMap = new Map([
	['RepositoryList', () => import('./chunks/RepositoryList_D7OoF96J.mjs')],
]);;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/404.astro.mjs');
const _page2 = () => import('./pages/api/chat.astro.mjs');
const _page3 = () => import('./pages/repositories.astro.mjs');
const _page4 = () => import('./pages/repository/_id_.astro.mjs');
const _page5 = () => import('./pages/robots.txt.astro.mjs');
const _page6 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/.pnpm/astro@5.1.8_jiti@2.4.2_rollup@4.31.0_typescript@5.7.3_yaml@2.7.0/node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/404.astro", _page1],
    ["src/pages/api/chat.ts", _page2],
    ["src/pages/repositories.astro", _page3],
    ["src/pages/repository/[id].astro", _page4],
    ["src/pages/robots.txt.ts", _page5],
    ["src/pages/index.astro", _page6]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "600bd7e0-4fda-48e2-abd1-acd88bf5b025",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;

export { __astrojsSsrVirtualEntry as default, pageMap };
