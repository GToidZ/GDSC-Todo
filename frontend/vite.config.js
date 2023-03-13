import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import unocss from '@unocss/vite';
import uno from '@unocss/preset-uno';
import attributify from '@unocss/preset-attributify';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    unocss({
      presets: [
        uno(),
        attributify(),
      ]
    }),
    preact()
  ],
});
