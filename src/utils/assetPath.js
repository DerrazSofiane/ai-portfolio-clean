// Utility to handle asset paths for GitHub Pages deployment
export const getAssetPath = (path) => {
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  // Return path with base URL
  return `${import.meta.env.BASE_URL}${cleanPath}`;
};