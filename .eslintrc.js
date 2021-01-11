module.exports = {
  parser: "babel-eslint",
  extends: ["airbnb-base", "prettier"],
  plugins: ["babel"],
  env: {
    browser: true
  },
  rules: {
    "no-restricted-syntax": 0,
    "no-unused-expressions": "off",
    "babel/no-unused-expressions": "error"
  },
  overrides: [
    {
      files: ["**/*.testcafe.js"],
      globals: {
        fixture: false,
        test: false
      },
      rules: {
        "babel/no-unused-expressions": 0,
        "import/no-extraneous-dependencies": 0
      }
    }
  ]
};
