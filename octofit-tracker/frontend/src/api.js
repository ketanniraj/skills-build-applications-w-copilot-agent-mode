const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();

export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api';

export function getApiUrl(resourceOrUrl) {
  if (resourceOrUrl.startsWith('http://') || resourceOrUrl.startsWith('https://')) {
    return resourceOrUrl;
  }

  return `${apiBaseUrl}/${resourceOrUrl}/`;
}

export function normalizeApiResponse(payload) {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (Array.isArray(payload?.results)) {
    return payload.results;
  }

  if (Array.isArray(payload?.data)) {
    return payload.data;
  }

  return [];
}

export async function fetchCollection(resource, options = {}) {
  const response = await fetch(getApiUrl(resource), options);

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return normalizeApiResponse(await response.json());
}