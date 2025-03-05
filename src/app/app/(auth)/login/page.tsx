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

// LoginForm component that uses useSearchParams
function LoginForm() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async () => {
    try {
      setIsLoading(true);
      console.log("Starting GitHub sign-in");

      // Use a simple relative URL for the dashboard
      await signIn("github", {
        callbackUrl: "/dashboard",
      });
    } catch (error) {
      console.error("Authentication error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full backdrop-blur-sm bg-background/80 border-border/40">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Login</CardTitle>
        <CardDescription>Sign in to your account using GitHub</CardDescription>
        {error && (
          <div className="p-3 bg-red-100 border border-red-300 rounded-md text-red-800 text-sm">
            {error === "Configuration"
              ? "There was a problem with the authentication configuration. Please try again."
              : error === "AccessDenied"
              ? "You don't have permission to access this resource."
              : error === "MissingCSRF"
              ? "CSRF token is missing. Please try again."
              : `Authentication error: ${error}`}
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
