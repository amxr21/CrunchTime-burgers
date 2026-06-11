import { ICONS, IMAGES } from "@/lib/assets";

export type Category = {
  title: string;
  description: string;
  image: string;
  href: string;
  accent: "red" | "yellow" | "green" | "blue";
};

export const categories: Category[] = [
  {
    title: "Signature Burgers",
    description: "Our flame-grilled patties with house-made sauces",
    image: IMAGES.categories.signatureBurgers,
    href: "/menu#signature-burgers",
    accent: "red",
  },
  {
    title: "Crispy Chicken",
    description: "Hand breaded, pressure-fried to golden perfection",
    image: IMAGES.categories.crispyChicken,
    href: "/menu#crispy-chicken",
    accent: "yellow",
  },
  {
    title: "Sides & Shareables",
    description: "Made fresh throughout the day",
    image: IMAGES.categories.sidesShareables,
    href: "/menu#sides-shareables",
    accent: "green",
  },
  {
    title: "Beverages & Drinks",
    description: "Cola-Cola products and house specialties",
    image: IMAGES.categories.beveragesDrinks,
    href: "/menu#beverages-drinks",
    accent: "blue",
  },
];

export const aboutImages = [
  IMAGES.about.photo1,
  IMAGES.about.photo2,
  IMAGES.about.photo3,
  IMAGES.about.photo4,
];

export type BuiltMeal = {
  name: string;
  by: string;
  price: string;
  image: string;
  top?: boolean;
};

export const builtMeals: BuiltMeal[] = [
  {
    name: "Monster Stack",
    by: "By Jack",
    price: "$15.49",
    image: IMAGES.burgers.monsterStack,
    top: true,
  },
  {
    name: "Buffalo Madness",
    by: "By Christina",
    price: "$13.99",
    image: IMAGES.burgers.buffaloMadness,
  },
  {
    name: "The Texan",
    by: "By Wesley A.",
    price: "$14.29",
    image: IMAGES.burgers.theTexan,
  },
  {
    name: "Monster Stack",
    by: "By Jack",
    price: "$15.49",
    image: IMAGES.burgers.monsterStack,
    top: true,
  },
];

export type WhyFeature = {
  title: string;
  description: string;
  icon: string;
};

export const whyFeatures: WhyFeature[] = [
  {
    title: "Consistent Quality",
    description: "Same great taste at every location",
    icon: ICONS.frame,
  },
  {
    title: "Speed You Can Count On",
    description: "Average order time under 5 minutes",
    icon: ICONS.group,
  },
  {
    title: "Value That Makes Sense",
    description: "Premium ingredients at fair prices",
    icon: ICONS.groupAlt1,
  },
  {
    title: "Fresh Daily",
    description: "Never frozen beef, hand-breaded chicken",
    icon: ICONS.groupAlt2,
  },
];
