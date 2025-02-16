import { PropsWithChildren } from "react";

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen min-w-screen flex items-center justify-center bg-muted/50">
      <div className="w-full max-w-sm border p-4 rounded-xl bg-background shadow-sm my-8 relative">
        {children}
      </div>
    </div>
  );
}
