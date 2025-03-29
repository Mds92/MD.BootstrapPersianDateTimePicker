import js from "@eslint/js";
import globals from "globals";

export default [
  js.configs.recommended,
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: "script",
      globals: {
        ...globals.browser,
        jQuery: "readonly"
      }
    },
    rules: {
      // "no-unused-vars": "off"
    }
  }
];
