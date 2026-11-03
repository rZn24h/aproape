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
  slug: string;
  name: string;
  icon: LucideIcon;
};

/** Categoriile principale (M02 va adăuga subcategoriile și paginile lor). */
export const mainCategories: readonly Category[] = [
  { slug: "auto-moto", name: "Auto & Moto", icon: Car },
  { slug: "imobiliare", name: "Imobiliare", icon: House },
  { slug: "electronice-it", name: "Electronice & IT", icon: Smartphone },
  { slug: "casa-gradina", name: "Casă & Grădină", icon: Sofa },
  { slug: "moda-accesorii", name: "Modă & Accesorii", icon: Shirt },
  { slug: "hobby-sport", name: "Hobby & Sport", icon: Bike },
  { slug: "locuri-de-munca", name: "Locuri de muncă", icon: Briefcase },
  { slug: "servicii", name: "Servicii", icon: Wrench },
  { slug: "copii-familie", name: "Copii & Familie", icon: Baby },
  { slug: "diverse", name: "Diverse", icon: Package },
];
