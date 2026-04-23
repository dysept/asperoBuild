import { readDB } from "@/lib/storage";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AllProjectsClient from "@/components/AllProjectsClient";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Проекти — ASPERO",
  description: "Всі реалізовані проекти будівельної компанії ASPERO",
};

export default async function ProjectsPage() {
  const db = await readDB();
  return (
    <>
      <Header />
      <main className="bg-[#111111] min-h-screen pt-16">
        <AllProjectsClient projects={db.projects} />
      </main>
      <Footer />
    </>
  );
}
