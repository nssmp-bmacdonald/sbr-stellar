module.exports = {
    rootDir: '../',
    setupFilesAfterEnv: ["./config/jest.setup.js"],
    transform: {
        '\\.js$': ['babel-jest', { configFile: './config/.babelrc' }]
    },
    moduleNameMapper: {
        "\\.(css|less|scss|sass|sss|styl)$": "<rootDir>/node_modules/jest-css-modules",
    },
    verbose: true,
    collectCoverage: true,
    coveragePathIgnorePatterns: [ "<rootDir>/test/test-utils.js" ]
};