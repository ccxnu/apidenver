import globals from "globals";
import tseslint from "typescript-eslint";
import eslintConfigPrettier from "eslint-config-prettier";
import simpleImportSort from "eslint-plugin-simple-import-sort";

export default tseslint.config(
    {
        ignores: ["eslint.config.mjs", ".lintstagedrc.mjs", "dist", "node_modules"],
    },
    {
        extends: [eslintConfigPrettier, ...tseslint.configs.recommended],
        languageOptions: {
            globals: {
                ...globals.node,
                ...globals.jest,
            },
            ecmaVersion: 5,
            sourceType: "module",
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
        plugins: {
            "simple-import-sort": simpleImportSort,
        },
    },
    {
        rules: {
            "@typescript-eslint/no-floating-promises": "error",
            "simple-import-sort/imports": "error",
            "simple-import-sort/exports": "error",
        },
    },
);
