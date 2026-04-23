import { Suspense } from "react";
import { readDB } from "@/lib/storage";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import About from "@/components/About";
import Services from "@/components/Services";
import WhyUs from "@/components/WhyUs";
import Projects from "@/components/Projects";
import Testimonials from "@/components/Testimonials";
import Consultation from "@/components/Consultation";
import Vacancies from "@/components/Vacancies";
import Footer from "@/components/Footer";

export const dynamic = "force-dynamic";

export default async function Home() {
  const db = await readDB();

  return (
    <>
      <Header />
      <main>
        <Hero heroImage={db.sections.hero} />
        <Stats />
        <About />
        <Services />
        <WhyUs />
        <Projects projects={db.projects} />
        <Testimonials />
        <Suspense fallback={null}><Consultation /></Suspense>
        <Vacancies />
      </main>
      <Footer />
    </>
  );
}
