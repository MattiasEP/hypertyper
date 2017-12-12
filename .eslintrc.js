module.exports = {
    "env": {
      "browser": true,
      "node": true
    },
    "parser": "babel-eslint",
    "extends": "airbnb",
    "plugins": [
      "react"
    ],
    "rules": {
      "semi": [
        "error",
        "never"
      ],
      "comma-dangle": [
        "error",
        "never"
      ],
      "max-len": [
        "error",
        {
          "code": 100
        }
      ],
      "import/no-named-as-default": "off",
      "import/prefer-default-export": "off",
      "react/prop-types": "off",
      "no-underscore-dangle": "off",
      "react/jsx-filename-extension": "off",
      "arrow-body-style": "off",
      "consistent-return": "off",
      "class-methods-use-this": "off", // Skip forcing static until further investigation
      "func-names": "off", // Since we are using unnamed functions in webpack config
      "indent": ["error", "tab"],
      "no-tabs": 0,
      "no-trailing-spaces": 0,
      "react/jsx-indent": 0,
      "eol-last": 0,
      "object-curly-newline": 0,
      "no-unused-expressions": 0,
      "keyword-spacing": 0,
      "space-in-parens": 0,
      "arrow-parens": [
        "error",
        "always"
      ],
      "function-paren-newline": 0,
      "react/jsx-indent-props": 0
    },
    "globals": {
      "chrome": false
    }
  };
  