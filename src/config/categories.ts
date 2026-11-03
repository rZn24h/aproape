import {
  Baby,
  Bike,
  Briefcase,
  Car,
  House,
  Package,
  Shirt,
  Smartphone,
  Sofa,
  Wrench,
  type LucideIcon,
} from "lucide-react";

export type Category = {
  /** Slug stabil, folosit în URL: /categorii/<slug>. Nu se modifică după lansare. */
  slug: string;
  name: string;
  /** Etichetă scurtă pentru bara de categorii din antet. */
  shortName: string;
  icon: LucideIcon;
  subcategories: readonly string[];
};

/**
 * Taxonomia principală (sursă unică). M02 va muta subcategoriile în D1
 * păstrând aceleași slug-uri; până atunci aceasta este configurația oficială.
 */
export const mainCategories: readonly Category[] = [
  {
    slug: "auto-moto",
    name: "Auto & Moto",
    shortName: "Auto & Moto",
    icon: Car,
    subcategories: ["Autoturisme", "Motociclete și scutere", "Autoutilitare", "Camioane", "Remorci și rulote", "Piese auto", "Anvelope și jante", "Accesorii auto", "Utilaje agricole", "Utilaje de construcții", "Alte vehicule"],
  },
  {
    slug: "imobiliare",
    name: "Imobiliare",
    shortName: "Imobiliare",
    icon: House,
    subcategories: ["Apartamente de vânzare", "Apartamente de închiriat", "Case și vile", "Terenuri", "Spații comerciale", "Birouri", "Hale și depozite", "Garaje și parcări", "Cazare"],
  },
  {
    slug: "electronice-it",
    name: "Electronice & IT",
    shortName: "Electronice",
    icon: Smartphone,
    subcategories: ["Telefoane", "Laptopuri", "Calculatoare desktop", "Componente PC", "Monitoare", "Tablete", "Console și gaming", "Televizoare", "Audio", "Foto și video", "Accesorii IT", "Alte electronice"],
  },
  {
    slug: "casa-gradina",
    name: "Casă & Grădină",
    shortName: "Casă & Grădină",
    icon: Sofa,
    subcategories: ["Mobilier", "Electrocasnice", "Decorațiuni", "Unelte", "Scule electrice", "Materiale construcții", "Grădinărit", "Instalații", "Iluminat", "Produse pentru curățenie", "Alte produse pentru casă"],
  },
  {
    slug: "moda-accesorii",
    name: "Modă & Accesorii",
    shortName: "Modă",
    icon: Shirt,
    subcategories: ["Haine femei", "Haine bărbați", "Încălțăminte", "Genți", "Ceasuri", "Bijuterii", "Accesorii", "Produse cosmetice", "Alte articole"],
  },
  {
    slug: "hobby-sport",
    name: "Hobby & Sport",
    shortName: "Hobby & Sport",
    icon: Bike,
    subcategories: ["Biciclete", "Fitness", "Pescuit", "Camping", "Sporturi de iarnă", "Instrumente muzicale", "Cărți", "Jocuri și colecții", "Echipamente sportive", "Alte hobby-uri"],
  },
  {
    slug: "locuri-de-munca",
    name: "Locuri de muncă",
    shortName: "Locuri de muncă",
    icon: Briefcase,
    subcategories: ["IT și software", "Inginerie", "Producție", "Construcții", "Transport și logistică", "Vânzări", "Marketing", "HoReCa", "Administrativ", "Sănătate", "Educație", "Muncă necalificată", "Alte locuri de muncă"],
  },
  {
    slug: "servicii",
    name: "Servicii",
    shortName: "Servicii",
    icon: Wrench,
    subcategories: ["Reparații auto", "Reparații electronice", "Construcții și renovări", "Instalații electrice", "Instalații sanitare", "Curățenie", "Transport și mutări", "Servicii IT", "Foto și video", "Marketing și publicitate", "Meditații", "Servicii pentru evenimente", "Alte servicii"],
  },
  {
    slug: "copii-familie",
    name: "Copii & Familie",
    shortName: "Copii & Familie",
    icon: Baby,
    subcategories: ["Cărucioare", "Scaune auto", "Jucării", "Mobilier copii", "Îmbrăcăminte copii", "Încălțăminte copii", "Articole școlare", "Alte articole pentru copii"],
  },
  {
    slug: "diverse",
    name: "Diverse",
    shortName: "Diverse",
    icon: Package,
    subcategories: ["Produse agricole", "Echipamente profesionale", "Articole pentru animale", "Antichități", "Colecții", "Alte produse"],
  },
];

export function categoryHref(slug: string): string {
  return `/categorii/${slug}`;
}

export function findCategory(slug: string): Category | undefined {
  return mainCategories.find((c) => c.slug === slug);
}
