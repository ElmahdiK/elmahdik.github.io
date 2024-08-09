import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import { nodePolyfills } from "vite-plugin-node-polyfills";

// https://astro.build/config
export default defineConfig({
    site: 'https://elmahdik.github.io',
    // output: "hybrid", // or 'server'
    // experimental: {
    //     actions: true,
    // },
    integrations: [
        react({
            experimentalReactChildren: true,
        }),
    ],
    // plugins: [
    //     nodePolyfills(),
    // ],
});
