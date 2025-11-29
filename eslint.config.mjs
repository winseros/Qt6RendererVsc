import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";

export default defineConfig([
    eslint.configs.recommended,
    tseslint.configs.strictTypeChecked,
    {
        rules: { "sort-imports": ["error"] },
        languageOptions: {
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
                sourceType: "module"
            }
        }
    }
]);
