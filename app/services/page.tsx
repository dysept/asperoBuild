import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ServicesPageClient from "@/components/ServicesPageClient";

export const metadata = {
  title: "Послуги — ASPERO",
  description: "Будівництво, ремонт, проектування та металоконструкції від ASPERO",
};

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main className="bg-[#111111] min-h-screen pt-16">
        <ServicesPageClient />
      </main>
      <Footer />
    </>
  );
}
