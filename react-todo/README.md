# React Todo Chrome Extension

- When you try to install and run the extension, an error message showing a sha code will be displayed on the console
- You must copy this code and paste it into the `manifest.json` file

```json
{
  "content_security_policy": "script-src 'self' 'sha256-5As4+3YpY62+l38PsxCEkjB1R4YtyktBtRScTJ3fyLU='; object-src 'self'"
}
```
