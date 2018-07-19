module.exports = {
    "extends": "standard",
    "plugins": [
      "chai-friendly",
      "mocha"
    ],
    "globals": {
      "it": true,
      "beforeEach": true,
      "describe": true
    },
    "rules": {
      "no-unused-expressions": 0,
      "chai-friendly/no-unused-expressions": 2,
      "mocha/no-exclusive-tests": "error"
    }
}
