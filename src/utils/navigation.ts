/**
 * Utility functions for navigating between subdomains
 */

// Get the root domain from environment or use a default
const ROOT_DOMAIN = process.env.NEXT_PUBLIC_ROOT_DOMAIN || 'mockr.io';
const isDevelopment = process.env.NODE_ENV === 'development';

/**
 * Generates a URL for the app subdomain
 * @param path - The path to append to the app domain URL
 * @returns The complete app domain URL with the given path
 */
export const getAppUrl = (path: string = '') => {
  if (isDevelopment) {
    return `http://app.localhost:3000${path.startsWith('/') ? path : `/${path}`}`;
  }
  return `https://app.${ROOT_DOMAIN}${path.startsWith('/') ? path : `/${path}`}`;
};

/**
 * Generates a URL for the www subdomain
 * @param path - The path to append to the www domain URL
 * @returns The complete www domain URL with the given path
 */
export const getWwwUrl = (path: string = '') => {
  if (isDevelopment) {
    return `http://www.localhost:3000${path.startsWith('/') ? path : `/${path}`}`;
  }
  return `https://www.${ROOT_DOMAIN}${path.startsWith('/') ? path : `/${path}`}`;
};

/**
 * Generates a URL for the API subdomain
 * @param path - The path to append to the API domain URL
 * @returns The complete API domain URL with the given path
 */
export const getApiUrl = (path: string = '') => {
  if (isDevelopment) {
    return `http://api.localhost:3000${path.startsWith('/') ? path : `/${path}`}`;
  }
  return `https://api.${ROOT_DOMAIN}${path.startsWith('/') ? path : `/${path}`}`;
};

/**
 * Generates a URL for any custom subdomain
 * @param subdomain - The subdomain to use
 * @param path - The path to append to the domain URL
 * @returns The complete domain URL with the given subdomain and path
 */
export const getSubdomainUrl = (subdomain: string, path: string = '') => {
  if (isDevelopment) {
    return `http://${subdomain}.localhost:3000${path.startsWith('/') ? path : `/${path}`}`;
  }
  return `https://${subdomain}.${ROOT_DOMAIN}${path.startsWith('/') ? path : `/${path}`}`;
}; 