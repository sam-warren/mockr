"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Github } from "lucide-react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";
import { getAuthErrorMessage, getAuthErrorClassName } from "@/lib/auth-errors";
import { logger } from "@/lib/logger";

// Create a module-specific logger
const log = logger.forModule("login");

// LoginForm component that uses useSearchParams
function LoginForm() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const [isLoading, setIsLoading] = useState(false);
  
  // Get the error message from the error code
  const errorMessage = getAuthErrorMessage(error);

  const handleSignIn = async () => {
    try {
      setIsLoading(true);
      log.debug("Starting GitHub sign-in");

      // First make sure CSRF token is loaded
      const csrfResponse = await fetch('/api/auth/csrf');
      if (!csrfResponse.ok) {
        log.error("Failed to fetch CSRF token");
      }
      
      // Use a simple relative URL for the dashboard
      await signIn("github", {
        callbackUrl: "/dashboard",
      });
    } catch (error) {
      log.error("Authentication error", { error });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full backdrop-blur-sm bg-background/80 border-border/40">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Login</CardTitle>
        <CardDescription>
          Sign in to your account using GitHub
        </CardDescription>
        {errorMessage && (
          <div className={getAuthErrorClassName()}>
            {errorMessage}
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Button
            className="w-full flex items-center justify-center gap-2 cursor-pointer"
            onClick={handleSignIn}
            disabled={isLoading}
          >
            <Github className="h-5 w-5" />
            {isLoading ? "Connecting..." : "Continue with GitHub"}
          </Button>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <div className="text-center text-sm text-muted-foreground">
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </div>
      </CardFooter>
    </Card>
  );
}

// Loading fallback component
function LoginFormSkeleton() {
  return (
    <Card className="w-full backdrop-blur-sm bg-background/80 border-border/40">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Login</CardTitle>
        <CardDescription>Sign in to your account using GitHub</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="w-full h-10 bg-gray-200 animate-pulse rounded-md"></div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <div className="text-center text-sm text-muted-foreground">
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </div>
      </CardFooter>
    </Card>
  );
}

// Main page component that wraps the login form in Suspense
export default function LoginPage() {
  return (
    <div className="w-full max-w-md px-4">
      <Suspense fallback={<LoginFormSkeleton />}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
