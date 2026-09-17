import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  { files: ["**/*.{js,mjs,cjs}"], 
    plugins: { js }, 
    extends: ["js/recommended"], 
    "env": {
        "es6": true,
        "browser": true,
        "jest/globals": true
      },
    "parserOptions": {
      "sourceType": "module"
    },
    ignores: ["dist/*", "coverage/*", "webpack.*.js"],
    languageOptions: { globals: globals.browser } },
]);
