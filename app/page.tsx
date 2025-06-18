"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Button
        onMouseDown={() => {
          router.push("/dashboard");
        }}
      >
        Create Mock
      </Button>
    </div>
  );
}
