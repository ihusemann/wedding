import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
  return <div className="max-w-2xl mx-auto">{children}</div>;
}
