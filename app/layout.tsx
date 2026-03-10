import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Polyvinyl Chloride — A Complete Study",
  description:
    "A comprehensive study of PVC — from molecular chain architecture and polymerization mechanisms to industrial manufacturing and sustainability.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
