/**
 * Centralized environment configuration
 * Contains common environment variables and derived settings used across the application
 */

// Environment detection
export const isDevelopment = process.env.NODE_ENV === "development";
export const isProduction = process.env.NODE_ENV === "production";
export const isTest = process.env.NODE_ENV === "test";

// Vercel deployment detection
export const isVercelDeployment = !!process.env.VERCEL_URL;

// Domain configuration
export const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || "mockr.io";

// URL configuration
export const baseUrl = isDevelopment
  ? "http://localhost:3000"
  : `https://${rootDomain}`;

export const appBaseUrl = isDevelopment
  ? "http://app.localhost:3000"
  : `https://app.${rootDomain}`;

// Auth callback URLs
export const githubCallbackUrl = `${appBaseUrl}/api/auth/callback/github`;

// Cookie configuration helpers
export const getCookiePrefix = () => isVercelDeployment ? "__Secure-" : "";
export const getCsrfCookiePrefix = () => isVercelDeployment ? "__Host-" : "";

// Common cookie options
export const getBaseCookieOptions = (includeSubdomains = true) => ({
  httpOnly: true,
  sameSite: "lax" as const,
  path: "/",
  domain: isDevelopment
    ? ".localhost"
    : includeSubdomains && isVercelDeployment
      ? `.${rootDomain}`
      : undefined,
  secure: isVercelDeployment,
});

// Dashboard and other common redirect URLs
export const dashboardUrl = `${appBaseUrl}/dashboard`;
export const loginUrl = `${appBaseUrl}/login`;

// Export commonly used URL transformers
export const transformLocalhost = (url: string): string => {
  if (!isProduction) return url;
  return url.replace(/http:\/\/(?:app\.)?localhost:3000/g, appBaseUrl);
}; 