import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import unocss from '@unocss/vite';
import uno from '@unocss/preset-uno';
import attributify from '@unocss/preset-attributify';
import webFonts from '@unocss/preset-web-fonts';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    unocss({
      presets: [
        uno(),
        attributify(),
        webFonts({
          provider: 'google',
          fonts: {
            sans: 'Poppins'
          }
        }),
      ],
      theme: {
        colors: {
          'goodo': {
            'blue': '#4285F4',
            'red': '#DB4437',
            'yellow': '#F4B400',
            'green': '#0F9D58'
          }
        }
      }
    }),
    preact()
  ],
});
