module.exports = {
    "env": {
        "browser": true,
        "node": true,
        "es6": true
    },
    "settings": {
        "react": {
            "version": "detect",
        }
    },
    "parserOptions": {
        "ecmaVersion": 2021,
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true
        }
    },
    "plugins": ["react"],
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "rules": {
        "react/no-set-state": "off",
        "react/prop-types": "off",
        "indent": ["error", 4],
    },
    "globals": {
        "window": "readonly",
        "document": "readonly",
        "navigator": "readonly"
    }
}