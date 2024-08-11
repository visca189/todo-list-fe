/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  // type of vitest defineConfig is not read correctly, ts ignore is a temp fix
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  test: {
    environment: "jsdom",
  },
  plugins: [react()],
});
