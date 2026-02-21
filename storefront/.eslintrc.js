module.exports = {
  extends: ["next/core-web-vitals"],
  overrides: [
    {
      files: ["tailwind.config.js", "postcss.config.js", ".eslintrc.js", "next.config.js"],
      parser: "espree",
      parserOptions: { ecmaVersion: 2020 },
      env: { node: true },
    },
  ],
};