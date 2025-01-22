// @ts-check
import { defineConfig, envField } from 'astro/config';

import tailwind from '@astrojs/tailwind';

import react from '@astrojs/react';


import sitemap from "@astrojs/sitemap";


import vercel from "@astrojs/vercel";


// https://astro.build/config
export default defineConfig({
  site: "https://ivanbong.vercel.app",

  env: {
        schema: {
            GITHUB_TOKEN: envField.string({
                context: "server",
                access: "secret",
            }),
            GOOGLE_API_KEY: envField.string({
                context: "server",
                access: "secret",
            }),
            NEXT_PUBLIC_VERCEL_URL: envField.string({
                context: "client",
                access: "public",
            }),
        },
    },

  integrations: [tailwind({
    applyBaseStyles: false,
  }), react(), sitemap()],
  output:"server",
  adapter: vercel({
	webAnalytics:{
		enabled: true
	}
  }),
});