const apiPort = Number(process.env.PORT) || 8000;
const codespaceName = process.env.CODESPACE_NAME;

export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-${apiPort}.app.github.dev`
  : `http://localhost:${apiPort}`;