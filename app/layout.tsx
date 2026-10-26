import type { Metadata } from "next";
import "@fontsource-variable/space-grotesk";
import "@fontsource-variable/dm-sans";
import "./globals.css";
import { SiteFooter, SiteHeader } from "@/components/site-shell";

export const metadata: Metadata = {
  title: { default: "VoteLedger | Every report matters", template: "%s | VoteLedger" },
  description: "An independent civic technology prototype for checkable election-related records and transparent civic funding examples.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><SiteHeader /><div className="main-content">{children}</div><SiteFooter /></body></html>;
}