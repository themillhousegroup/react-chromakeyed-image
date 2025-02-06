module.exports = {
  "testEnvironment": "jsdom",
  "coverageDirectory": "coverage",
  "coverageReporters": ["text", "html"],
  "roots": [
    "<rootDir>/src"
  ],
  "transform": {
    "^.+\\.tsx?$": "ts-jest"
  },
}