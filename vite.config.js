import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    // ESTA ES LA PARTE IMPORTANTE QUE FALTA:
    lib: {
      entry: 'src/index.js',  // Tu nuevo punto de entrada
      name: 'Skparate',
      fileName: 'skparate'    // Esto forzará a que el archivo se llame skparate.js
    },
    rollupOptions: {
      external: ['lit'],
      output: {
        globals: {
          lit: 'Lit'
        }
      }
    }
  }
});