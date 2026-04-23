import fs from "fs";
import path from "path";

const DB_PATH = path.join(process.cwd(), "data", "db.json");
const DB_KEY = "aspero:db";

export type ProjectCategory = "Будівництво" | "Ремонт" | "Металоконструкції" | "Проектування";

export interface ProjectSpec {
  label: string;
  value: string;
}

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  area: string;
  duration: string;
  city: string;
  status: string;
  year: string;
  description: string;
  specs: ProjectSpec[];
  tags: string[];
  image: string | null;
  gallery: string[];
  featured: boolean;
}

export interface SectionImages {
  hero: string | null;
  about: string | null;
}

export interface Consultation {
  id: string;
  name: string;
  phone: string;
  service: string;
  time: string;
  message: string;
  createdAt: string;
  status: "new" | "contacted" | "done";
}

export interface DB {
  projects: Project[];
  sections: SectionImages;
  consultations: Consultation[];
}

const DEFAULT_DB: DB = {
  sections: { hero: null, about: null },
  consultations: [],
  projects: [
    {
      id: "1",
      title: "Котедж у Львівській області",
      category: "Будівництво",
      area: "720 м²",
      duration: "3 місяці",
      city: "Львів",
      status: "Завершено",
      year: "2023",
      description:
        "Приватний котедж у Львівській області — проєкт, що поєднує сучасну архітектуру з функціональністю та комфортом. Замовник звернувся до нас з чітким баченням: просторий будинок для великої родини з якісними матеріалами та увагою до кожної деталі.\n\nБудівництво велось від нуля — від розробки проектної документації до фінального оздоблення. Використовували лише сертифіковані матеріали. Об'єкт зданий у строк без жодних відхилень від кошторису.",
      specs: [
        { label: "Тип об'єкту", value: "Приватний котедж" },
        { label: "Загальна площа", value: "720 м²" },
        { label: "Кількість поверхів", value: "2 поверхи + мансарда" },
        { label: "Строк будівництва", value: "3 місяці" },
        { label: "Рік здачі", value: "2023" },
        { label: "Матеріали стін", value: "Газобетон + клінкерна цегла" },
        { label: "Покрівля", value: "Металочерепиця Ruukki" },
        { label: "Система опалення", value: "Тепла підлога + котел" },
        { label: "Вартість робіт", value: "за запитом" },
        { label: "Гарантія", value: "5 років" },
      ],
      tags: ["Котедж", "Будівництво", "Львівська обл.", "Під ключ", "2023"],
      image: null,
      gallery: [],
      featured: true,
    },
    {
      id: "2",
      title: "Офісний центр в центрі Львова",
      category: "Ремонт",
      area: "1 200 м²",
      duration: "6 місяців",
      city: "Львів",
      status: "Завершено",
      year: "2023",
      description:
        "Комплексний ремонт офісного центру в серці Львова. Повна реконструкція інтер'єру з урахуванням сучасних стандартів офісних просторів.",
      specs: [
        { label: "Тип об'єкту", value: "Офісний центр" },
        { label: "Загальна площа", value: "1 200 м²" },
        { label: "Строк ремонту", value: "6 місяців" },
        { label: "Рік здачі", value: "2023" },
        { label: "Вартість робіт", value: "за запитом" },
        { label: "Гарантія", value: "3 роки" },
      ],
      tags: ["Офіс", "Ремонт", "Львів", "2023"],
      image: null,
      gallery: [],
      featured: true,
    },
    {
      id: "3",
      title: "Промисловий склад",
      category: "Металоконструкції",
      area: "2 500 м²",
      duration: "4 місяці",
      city: "Львів",
      status: "Завершено",
      year: "2022",
      description:
        "Проектування та монтаж металоконструкцій для промислового складу. Швидке зведення та висока надійність конструкції.",
      specs: [
        { label: "Тип об'єкту", value: "Промисловий склад" },
        { label: "Загальна площа", value: "2 500 м²" },
        { label: "Строк будівництва", value: "4 місяці" },
        { label: "Рік здачі", value: "2022" },
        { label: "Гарантія", value: "5 років" },
      ],
      tags: ["Склад", "Металоконструкції", "Промисловий", "2022"],
      image: null,
      gallery: [],
      featured: true,
    },
    {
      id: "4",
      title: "Житловий комплекс",
      category: "Будівництво",
      area: "5 800 м²",
      duration: "18 місяців",
      city: "Львів",
      status: "Завершено",
      year: "2022",
      description: "Будівництво житлового комплексу під ключ.",
      specs: [{ label: "Площа", value: "5 800 м²" }],
      tags: ["ЖК", "Будівництво", "2022"],
      image: null,
      gallery: [],
      featured: false,
    },
    {
      id: "5",
      title: "Ресторан у центрі міста",
      category: "Ремонт",
      area: "450 м²",
      duration: "3 місяці",
      city: "Львів",
      status: "Завершено",
      year: "2023",
      description: "Дизайнерський ремонт ресторану.",
      specs: [{ label: "Площа", value: "450 м²" }],
      tags: ["Ресторан", "Ремонт", "2023"],
      image: null,
      gallery: [],
      featured: false,
    },
    {
      id: "6",
      title: "Ангар для сільгосптехніки",
      category: "Металоконструкції",
      area: "800 м²",
      duration: "2 місяці",
      city: "Львівська обл.",
      status: "Завершено",
      year: "2023",
      description: "Монтаж металевого ангара для зберігання сільськогосподарської техніки.",
      specs: [{ label: "Площа", value: "800 м²" }],
      tags: ["Ангар", "Металоконструкції", "2023"],
      image: null,
      gallery: [],
      featured: false,
    },
  ],
};

// ── File storage (local dev fallback) ──────────────────────────────────────

function readFileDB(): DB {
  try {
    const dir = path.dirname(DB_PATH);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    if (!fs.existsSync(DB_PATH))
      fs.writeFileSync(DB_PATH, JSON.stringify(DEFAULT_DB, null, 2));
    return JSON.parse(fs.readFileSync(DB_PATH, "utf-8")) as DB;
  } catch {
    return structuredClone(DEFAULT_DB);
  }
}

function writeFileDB(data: DB): void {
  const dir = path.dirname(DB_PATH);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

// ── Vercel KV (production) ─────────────────────────────────────────────────

async function readKV(): Promise<DB> {
  const { kv } = await import("@vercel/kv");
  const data = await kv.get<DB>(DB_KEY);
  return data ?? structuredClone(DEFAULT_DB);
}

async function writeKV(data: DB): Promise<void> {
  const { kv } = await import("@vercel/kv");
  await kv.set(DB_KEY, data);
}

const useKV = () =>
  !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);

// ── Public API ─────────────────────────────────────────────────────────────

export async function readDB(): Promise<DB> {
  if (useKV()) return readKV();
  return readFileDB();
}

export async function writeDB(data: DB): Promise<void> {
  if (useKV()) return writeKV(data);
  writeFileDB(data);
}

export async function updateProject(
  id: string,
  updates: Partial<Project>
): Promise<Project | null> {
  const db = await readDB();
  const idx = db.projects.findIndex((p) => p.id === id);
  if (idx === -1) return null;
  db.projects[idx] = { ...db.projects[idx], ...updates };
  await writeDB(db);
  return db.projects[idx];
}

export async function addProject(project: Omit<Project, "id">): Promise<Project> {
  const db = await readDB();
  const newProject: Project = { ...project, id: Date.now().toString() };
  db.projects.push(newProject);
  await writeDB(db);
  return newProject;
}

export async function deleteProject(id: string): Promise<boolean> {
  const db = await readDB();
  const len = db.projects.length;
  db.projects = db.projects.filter((p) => p.id !== id);
  if (db.projects.length === len) return false;
  await writeDB(db);
  return true;
}

export async function addConsultation(
  data: Omit<Consultation, "id" | "createdAt" | "status">
): Promise<Consultation> {
  const db = await readDB();
  const entry: Consultation = {
    ...data,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    status: "new",
  };
  db.consultations.push(entry);
  await writeDB(db);
  return entry;
}
