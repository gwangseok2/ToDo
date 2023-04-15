module.exports = {
  root: true,
  env: {
    node: true,
    es6: true,
  },
  extends: ["plugin:prettier/recommended", "prettier"],
  plugins: ["prettier"],
  rules: {
    "no-console": "off",
    "no-tabs": "off",
  },
};
