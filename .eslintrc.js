module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: ["airbnb-base"],
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": "error",
    "no-plusplus": "off",
    quotes: "off",
    "array-callback-return": "off",
    "arrow-parens": "off",
    "implicit-arrow-linebreak": "off",
    "function-paren-newline": "off",
    "arrow-body-style": "off",
  },
};
