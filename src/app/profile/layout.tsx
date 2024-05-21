import { ReactNode } from "react";

interface GlobalProfileLayoutProps {
    children: ReactNode;
  }
  

export default function GlobalProfileLayout({ children } : GlobalProfileLayoutProps) {
  return (
    <>
      <h1>this is global profile header</h1>
      {children}
      <h1>this is global profile footer</h1>
    </>
  );
}
