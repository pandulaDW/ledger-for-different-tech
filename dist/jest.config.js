"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    roots: ["<rootDir>/src"],
    transform: {
        "^.+\\.tsx?$": "ts-jest",
    },
    testRegex: "(/__test__/.*|(\\.|/)(test|spec))\\.[jt]sx?$",
    moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
    verbose: true,
    collectCoverage: false,
    collectCoverageFrom: ["<rootDir>/src/app/**/*.ts"],
};
exports.default = config;
//# sourceMappingURL=jest.config.js.map