import { About } from "@/components/About";
import { Contact, Footer } from "@/components/Contact";
import { Credentials } from "@/components/Credentials";
import { Hero } from "@/components/Hero";
import { Impact } from "@/components/Impact";
import { Journey } from "@/components/Journey";
import { Nav } from "@/components/Nav";
import { Portfolio } from "@/components/Portfolio";
import { Stack } from "@/components/Stack";

export default function Home() {
  return (
    <>
      <a
        href="#about"
        className="sr-only z-[70] bg-accent px-4 py-2 text-accent-ink focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>
      <Nav />
      <main>
        <Hero />
        <About />
        <Impact />
        <Journey />
        <Stack />
        <Credentials />
        <Portfolio />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
