import type { Metadata } from "next";
import "./globals.css";
import { ThemeToggle } from "@/components/ThemeToggle";

export const metadata: Metadata = {
  title: "Star Wars Explorer",
  description: "A pragmatic Star Wars API explorer built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground antialiased transition-colors duration-300">
        <header className="border-b border-blue-500/30 py-6 mb-8 bg-background/50 backdrop-blur-sm sticky top-0 z-10">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold tracking-tighter text-blue-400">
              STAR WARS CHARACTERS
            </h1>
          </div>
        </header>
        <main className="container mx-auto px-4 pb-12">
          {children}
        </main>
        <footer className="border-t border-blue-500/10 py-8 mt-auto bg-background text-center text-sm text-gray-500">
          <div className="container mx-auto px-4 flex flex-col items-center gap-6">
            <ThemeToggle />
            <div>Built with Next.js & SWAPI</div>
          </div>
        </footer>
      </body>
    </html>
  );
}
