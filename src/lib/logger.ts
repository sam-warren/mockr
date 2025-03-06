/**
 * Application logging utility
 * Provides consistent logging that respects environment settings
 */

import { isDevelopment } from "./env-config";

// Use NEXTAUTH_DEBUG env var or default to false in production
const isDebugEnabled = process.env.NEXTAUTH_DEBUG === "true" || isDevelopment;

type LogLevel = "debug" | "info" | "warn" | "error";

interface LogOptions {
  module?: string;
  context?: Record<string, unknown>;
}

/**
 * Format a log message with module prefix
 */
const formatMessage = (
  level: LogLevel,
  message: string,
  options?: LogOptions
): string => {
  const modulePrefix = options?.module ? `[${options.module}]` : "";
  const levelPrefix = `[${level}]`;
  return `${levelPrefix}${modulePrefix} ${message}`;
};

/**
 * Format context object for logging
 */
const formatContext = (context?: Record<string, unknown>): string => {
  if (!context) return "";
  try {
    return JSON.stringify(context, null, isDevelopment ? 2 : 0);
  } catch (error: unknown) {
    // Log the error internally but return a placeholder
    console.error("Failed to serialize log context:", error);
    return `[Non-serializable context]`;
  }
};

/**
 * Base logging function
 */
const log = (
  level: LogLevel,
  message: string,
  options?: LogOptions
): void => {
  // Skip debug logs in production unless explicitly enabled
  if (level === "debug" && !isDebugEnabled) return;

  const formattedMessage = formatMessage(level, message, options);
  const context = formatContext(options?.context);

  switch (level) {
    case "debug":
      console.debug(formattedMessage, context);
      break;
    case "info":
      console.info(formattedMessage, context);
      break;
    case "warn":
      console.warn(formattedMessage, context);
      break;
    case "error":
      console.error(formattedMessage, context);
      break;
  }
};

// Public logger API
export const logger = {
  debug: (message: string, options?: LogOptions) =>
    log("debug", message, options),
  info: (message: string, options?: LogOptions) =>
    log("info", message, options),
  warn: (message: string, options?: LogOptions) =>
    log("warn", message, options),
  error: (message: string, options?: LogOptions) =>
    log("error", message, options),

  // Create a module-specific logger
  forModule: (moduleName: string) => ({
    debug: (message: string, context?: Record<string, unknown>) =>
      log("debug", message, { module: moduleName, context }),
    info: (message: string, context?: Record<string, unknown>) =>
      log("info", message, { module: moduleName, context }),
    warn: (message: string, context?: Record<string, unknown>) =>
      log("warn", message, { module: moduleName, context }),
    error: (message: string, context?: Record<string, unknown>) =>
      log("error", message, { module: moduleName, context }),
  }),
}; 