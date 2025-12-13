import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Everest Studio",
  description: "Everest Studio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
