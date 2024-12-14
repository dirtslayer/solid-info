import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";

export default defineConfig({
base: "https://dirtslayer.github.io/solid-info/",
plugins: [solidPlugin()],
build: {
  target: "esnext",
  polyfillDynamicImport: false,
},
});
