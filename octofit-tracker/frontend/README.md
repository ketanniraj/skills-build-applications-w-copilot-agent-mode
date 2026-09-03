# Octofit Tracker Frontend

This Vite React app expects `VITE_CODESPACE_NAME` to be defined, for example in `.env.local`:

```text
VITE_CODESPACE_NAME=your-codespace-name
```

When `VITE_CODESPACE_NAME` is set, API requests use `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/[component]/`. If it is unset, the app falls back to `http://localhost:8000/api/[component]/` so it never builds `https://undefined-8000...` URLs.