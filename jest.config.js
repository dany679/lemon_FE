const nextJest = require("next/jest");

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  globals: {
    jest: {
      transformIgnorePatterns: ["./node_modules/(?!deck.gl)"],
    },
  },
  moduleNameMapper: { "^uuid$": "uuid" },
  moduleDirectories: ["node_modules", "<rootDir>/"],
  moduleFileExtensions: ["tsx", "ts", "js", "json"],
  transformIgnorePatterns: ["/node_modules/(?!deck.gl)"],
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
  testEnvironment: "jest-environment-jsdom",
  testMatch: [
    "**/dist/**/*.test.js",
    "**/components/**.test.tsx",
    "**/components/**/*.test.tsx",
    "**/components/**/**.test.tsx",
    "**/components/**/**.spec.tsx",
  ],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
