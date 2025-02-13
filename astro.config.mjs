// @ts-check
import { defineConfig, envField } from 'astro/config';

import tailwind from '@astrojs/tailwind';




import sitemap from "@astrojs/sitemap";


import vercel from "@astrojs/vercel";


import react from "@astrojs/react";


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
            
        },
    },

  integrations: [tailwind({
    applyBaseStyles: false,
  }), sitemap(), react()],
  output:"server",
  adapter: vercel({
    webAnalytics:{
        enabled: true
    }
  }),
});