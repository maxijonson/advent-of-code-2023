module.exports = {
    root: true,
    parser: "@typescript-eslint/parser",
    plugins: ["@typescript-eslint/eslint-plugin"],
    extends: [
      "plugin:@typescript-eslint/recommended",
      "plugin:prettier/recommended",
    ],
    ignorePatterns: [".eslintrc.js"],
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/explicit-member-accessibility": [
        "error",
        {
          overrides: {
            constructors: "off",
          },
        },
      ],
  
      "react/no-unescaped-entities": "off",
  
      "prettier/prettier": "warn",
  
      "no-console": [
        "warn",
        {
          allow: ["warn", "error", "info", "group", "groupEnd", "groupCollapsed"],
        },
      ],
    },
  };
  