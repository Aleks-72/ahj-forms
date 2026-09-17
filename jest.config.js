/* @type {import jest'.Config}*/
module.exports = { 
    preset: 'jest-puppeteer',
    transformIgnorePatterns: [
        '<rootDir>/node_modules/(?!(package-a|@scope/package-b)@)'
    ],
    "transform": { "\\.[tj]sx?$": "babel-jest" }, 
    "moduleFileExtensions": ["js", "mjs", "cjs", "json", "node"]
};