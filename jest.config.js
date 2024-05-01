/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

module.exports = {
  testPathIgnorePatterns: ["<rootDir>/dist/", "<rootDir>/node_modules/"],
  verbose: false,
  testEnvironment: "node",
  testMatch: ["**/!(node_modules)/**/__test?(s)__/**(spec|test).ts"],
  transform: {
    "^.+\\.(t|j)s$": "ts-jest",
  },
  moduleFileExtensions: ["js", "json", "ts"],
  rootDir: ".",
  moduleNameMapper: {
    "@config/(.*)": "<rootDir>/config/$1",
  },
  setupFilesAfterEnv: ["<rootDir>/test.setup.ts"],

  bail: 1,

  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,

  // An array of glob patterns indicating a set of files for which coverage information should be collected
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/**/*.d.ts",
    "!src/**/index.ts",
  ],

  // The directory where Jest should output its coverage files
  coverageDirectory: "coverage",

  // A preset that is used as a base for Jest's configuration
  preset: "ts-jest",
  roots: ["<rootDir>/src"],
};
