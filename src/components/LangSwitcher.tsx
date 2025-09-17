/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import "country-flag-icons/react/3x2"; // Import all flags
import * as Flags from "country-flag-icons/react/3x2";
import { Globe } from "lucide-react";

interface Language {
  key: "en" | "fr" | "ar";
  name: string;
  dir: "ltr" | "rtl";
  countryCode: string; // Fix: use string instead of any
}

const languages: Language[] = [
  { key: "en", name: "English", dir: "ltr", countryCode: "GB" },
  { key: "fr", name: "Français", dir: "ltr", countryCode: "FR" },
];

export const LanguageSelector = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState<Language>(languages[0]);

  useEffect(() => {
    const langFromPath = pathname?.split("/")[1] as "en" | "fr" | "ar";
    const foundLang =
      languages.find((l) => l.key === langFromPath) || languages[0];
    setCurrentLang(foundLang);
    document.documentElement.dir = foundLang.dir;
  }, [pathname]);

  const handleChange = (lang: Language) => {
    const segments = pathname?.split("/") || [];
    segments[1] = lang.key; // replace locale in path
    const newPath = segments.join("/") || "/";
    setCurrentLang(lang);
    document.documentElement.dir = lang.dir;
    router.push(newPath);
    setIsOpen(false);
  };

  const Flag =
    (Flags as Record<string, React.ComponentType<any>>)[
      currentLang.countryCode
    ] || Flags.GB;

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center justify-center w-full  px-4 py-2  text-sm font-medium text-gray-700 cursor-pointer"
      >
        <Flag className="h-5 w-5 mx-2 rounded-full" />
        <Globe className="h-4 w-4 text-gray-700" />
        <svg
          className="mx-2 h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10.293 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L10 12.586l3.293-3.293a1 1 0 011.414 1.414l-4 4z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
          <div className="py-1" role="none">
            {languages.map((lang) => {
              const LangFlag =
                (Flags as Record<string, React.ComponentType<any>>)[
                  lang.countryCode
                ] || Flags.GB;

              return (
                <button
                  key={lang.key}
                  onClick={() => handleChange(lang)}
                  className={`${
                    currentLang.key === lang.key
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-700"
                  }  w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center`}
                  role="menuitem"
                >
                  <LangFlag className="h-5 w-5 mr-2 rounded-full" />
                  {lang.name}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
