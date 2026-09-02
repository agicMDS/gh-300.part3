const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const apiOrigin = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

export const apiBaseUrl = `${apiOrigin}/api`

export function responseItems(response) {
  if (Array.isArray(response)) return response
  if (Array.isArray(response?.data)) return response.data
  if (Array.isArray(response?.results)) return response.results
  if (Array.isArray(response?.items)) return response.items
  return []
}

export async function fetchCollection(collection) {
  const response = await fetch(`${apiBaseUrl}/${collection}/`)
  if (!response.ok) {
    throw new Error(`Unable to load ${collection} (${response.status})`)
  }
  return responseItems(await response.json())
}
