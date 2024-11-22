# Check if eslint.config.js exists and delete it
if (Test-Path -Path "eslint.config.js") {
    Write-Host "Deleting existing eslint.config.js file..."
    Remove-Item -Path "eslint.config.js"
}

# Install necessary dependencies for ESLint 8.57.0 and Prettier
Write-Host "Installing dependencies..."
npm install --save-dev eslint@8.57.0 eslint-config-prettier eslint-plugin-prettier eslint-plugin-jsx-a11y eslint-plugin-react@7.37.2 eslint-plugin-react-hooks eslint-plugin-react-refresh prettier husky lint-staged

# Create Prettier configuration file (prettier.cjs)
Write-Host "Creating Prettier configuration file (prettier.cjs)..."
$prettierConfig = @"
module.exports = {
    printWidth: 100,
    tabWidth: 2,
    useTabs: true,
    semi: true,
    singleQuote: true,
    trailingComma: 'all',
    bracketSpacing: true,
    arrowParens: 'always',
    proseWrap: 'never',
    endOfLine: 'auto',
};
"@
$prettierConfig | Out-File -FilePath ".prettierrc.cjs" -Encoding utf8

# Create ESLint configuration file (eslint.cjs)
Write-Host "Creating ESLint configuration file (eslint.cjs)..."
$eslintConfig = @"
module.exports = {
    env: {
        browser: true,
        node: true,
        es6: true,
    },
    parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
    },
    extends: [
        'eslint:recommended',
        'plugin:prettier/recommended',
        'plugin:react/recommended'
    ],
    rules: {
        'no-unused-vars': 'off',
    },
};
"@
$eslintConfig | Out-File -FilePath ".eslintrc.cjs" -Encoding utf8

# Create test.js file with sample code
Write-Host "Creating test.js file with sample code..."
$testJsContent = @"
const greet = (name) => {
    return 'Hello, !';
};
greet("s");
"@
$testJsContent | Out-File -FilePath "test.js" -Encoding utf8

Write-Host "Run 'prettier --write test.js' to format the file using Prettier."
