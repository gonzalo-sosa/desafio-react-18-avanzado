import js from "@eslint/js";
import oxlint from "eslint-plugin-oxlint";
import eslintPluginPrettier from "eslint-plugin-prettier";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import eslintPluginVitestGlobals from "eslint-plugin-vitest-globals";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  tseslint.configs.recommendedTypeChecked,
  {
     languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
      globals: globals.browser,
    },
  },
  oxlint.configs["flat/recommended"],
  {
    name: "react",
    ignores: [
      "**/node_modules/**",
      "**/.vercel/**",
      "**/dist/**",
      "**/**.config.**",
      "**/src/components/ui/**",
      "**/coverage/**",
      "**/__mocks__/**",
      "**/setup-chakra-ui.ts",
      "**/setup.ts",
    ],
  },
  {
    name: "react",
    ignores: [
      "**/__tests__/**",
    ],
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    settings: { react: { version: "18.3" } },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      typescript: tseslint,
      prettier: eslintPluginPrettier,
    },
    rules: {
      ...js.configs.recommended.rules,
      "no-unused-vars": "off",
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      'react/jsx-no-target-blank': 'off',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      ...tseslint.configs.recommended.rules,
      ...eslintPluginPrettier.configs.recommended.rules,
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/no-misused-promises": "off",
      "@typescript-eslint/unbound-method": "off"
    },
  },
  {
    name: "vitest",
    files: ["**/__tests__/*.{j,t}s?(x)", "**/*.spec.{j,t}s?(x)"],

    plugins: {
      vitestGlobals: eslintPluginVitestGlobals,
    },
    rules: {
      ...eslintPluginVitestGlobals.configs.recommended.rules,
      "@typescript-eslint/no-misused-promises": "error",
    },
  }
);
