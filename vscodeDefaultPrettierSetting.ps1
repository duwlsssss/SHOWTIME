# 한글이 깨지지 않도록 BOM 포함한 UTF-8로 저장하는 방법
$settings = @"
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "eslint.options": {
    "configFile": ".eslintrc.cjs"
  },
  "prettier.configPath": ".prettierrc.cjs",
  "eslint.validate": ["javascript", "javascriptreact", "typescript", "typescriptreact"],
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "eslint.alwaysShowStatus": true,
  "prettier.requireConfig": true
}
"@

# UTF-8 with BOM 저장하기
[System.IO.File]::WriteAllText(".vscode/settings.json", $settings, [System.Text.Encoding]::UTF8)
