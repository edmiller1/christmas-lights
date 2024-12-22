import baseConfig from "@acme/eslint-config/base";

/** @type {import('typescript-eslint').Config} */
export default [
  {
    ignores: ["dist/**"],
    rules: {
      "@typescript-eslint/no-non-null-assertion": "off",
    },
  },
  ...baseConfig,
];
