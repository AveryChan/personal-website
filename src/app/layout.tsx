import type { Metadata, Viewport } from "next";
import { Inter_Tight, JetBrains_Mono } from "next/font/google";
import { Providers } from "@/components/Providers";
import { profile } from "@/content/profile";
import "./globals.css";

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: `${profile.name} — ${profile.title}`,
  description: profile.description,
  openGraph: {
    title: `${profile.name} — ${profile.title}`,
    description: profile.description,
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#07080a",
  colorScheme: "dark",
};

/**
 * Runs before the page is painted. It marks <html> with data-js, which is what
 * allows globals.css to hide content for scroll reveals. If the app has not
 * started after five seconds (for example the script bundle failed to load),
 * the mark is removed again so everything becomes visible.
 */
const revealGuard = `(function(){var d=document.documentElement;d.setAttribute("data-js","");setTimeout(function(){if(!d.hasAttribute("data-hydrated"))d.removeAttribute("data-js")},5000)})()`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // suppressHydrationWarning: the script above adds attributes to <html> before React starts.
    <html
      lang="en"
      className={`${interTight.variable} ${jetbrains.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: revealGuard }} />
      </head>
      <body className="min-h-screen">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
