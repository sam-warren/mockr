/**
 * Authentication error handling utilities
 */

// Mapping of error codes to user-friendly messages
export const authErrorMessages: Record<string, string> = {
  Configuration: "There was a problem with the authentication configuration. Please try again.",
  AccessDenied: "You don't have permission to access this resource.",
  Verification: "The verification link has expired or has already been used.",
  MissingCSRF: "Security token was missing. Please try clearing your cookies and refreshing the page.",
  Callback: "There was a problem signing you in. Please try again.",
  OAuthSignin: "There was a problem with the OAuth sign-in process. Please try again.",
  OAuthCallback: "There was a problem with the OAuth callback. Please try again.",
  OAuthCreateAccount: "There was a problem creating your account. Please try again.",
  EmailCreateAccount: "There was a problem creating your account. Please try again.",
  OAuthAccountNotLinked: "This account is already linked to another user.",
  EmailSignin: "The email sign-in link expired or was invalid. Please try again.",
  SessionRequired: "You must be signed in to access this page.",
  Default: "An unexpected authentication error occurred. Please try again."
};

/**
 * Get a user-friendly error message from an auth error code
 */
export function getAuthErrorMessage(errorCode: string | null | undefined): string | null {
  if (!errorCode) return null;
  return authErrorMessages[errorCode] || `Authentication error: ${errorCode}`;
}

/**
 * Error display component for auth errors
 */
export function getAuthErrorClassName(): string {
  return "p-3 bg-red-100 border border-red-300 rounded-md text-red-800 text-sm";
} 