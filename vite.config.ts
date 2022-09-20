import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import multipage from "vite-plugin-multipage";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    multipage({
      // This is an optional object, defaults as follows:
      mimeCheck: true /* mimeCheck: Set the MIME type on each request using
                         `mime-types.lookup()` */,
      open: "/" /* open: Path to load when starting the server.
                   May be left empty and not open anything. */,
      pageDir: "src" /* pageDir: Path to the directory with the pages. */,
      purgeDir: "src" /* purgeDir: Path to be removed after building.
                           May be left empty to remove nothing. */,
      removePageDirs: true /* removePageDirs: Change the final result from
                               "./page/index.html" to "./page.html". */,
      rootPage: "index.html" /* rootPage: The entry point into each page. */,
    }),
  ],
});
