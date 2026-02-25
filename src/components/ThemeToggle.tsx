"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle("light", savedTheme === "light");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("light", newTheme === "light");
  };

  if (!mounted) return <div className="w-8 h-8" />;

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-800 hover:border-yellow-500 transition-colors text-gray-400 hover:text-yellow-500"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <>
          <Sun className="size-4" />
          <span className="text-xs font-medium uppercase tracking-wider">Light Mode</span>
        </>
      ) : (
        <>
          <Moon className="size-4" />
          <span className="text-xs font-medium uppercase tracking-wider">Dark Mode</span>
        </>
      )}
    </button>
  );
}
