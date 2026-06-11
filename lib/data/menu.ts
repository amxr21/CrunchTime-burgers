import { IMAGES } from "@/lib/assets";

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: string;
  priceValue: number;
  image: string;
};

export type MenuSection = {
  id: string;
  title: string;
  description: string;
  accent: "red" | "yellow" | "green" | "blue";
  typography: string;
  items: MenuItem[];
};

export const menuSections: MenuSection[] = [
  {
    id: "signature-burgers",
    title: "Signature Burgers",
    description: "Our flame-grilled patties with house-made sauces",
    accent: "red",
    typography: IMAGES.menuTypography.burgers,
    items: [
      {
        id: "original-crunchtime",
        name: "Original Crunchtime",
        description:
          "Beef patty, lettuce, tomato, onion, pickles, house sauce on a toasted bun",
        price: "$8.99",
        priceValue: 8.99,
        image: IMAGES.meals.originalCrunchtime,
      },
      {
        id: "double-crunch-classic",
        name: "Double Crunch Classic",
        description:
          "Two beef patties, double cheese, lettuce, onion, special sauce",
        price: "$11.49",
        priceValue: 11.49,
        image: IMAGES.meals.doubleCrunchClassic,
      },
      {
        id: "bbq-bacon-blaster",
        name: "BBQ Bacon Blaster Burger",
        description:
          "Beef patty, crispy bacon, cheddar, BBQ sauce, crispy onions",
        price: "$10.99",
        priceValue: 10.99,
        image: IMAGES.meals.bbqBaconBlaster,
      },
      {
        id: "mushroom-swiss-melt",
        name: "Mushroom Swiss Melt",
        description:
          "Beef patty, sauteed mushrooms, melted swiss, garlic aioli",
        price: "$9.99",
        priceValue: 9.99,
        image: IMAGES.meals.mushroomSwissMelt,
      },
      {
        id: "spicy-jalapeno-heat",
        name: "Spicy Jalapeno Heat",
        description:
          "Beef patty, jalapenos, pepper jack, spicy mayo, lettuce",
        price: "$9.79",
        priceValue: 9.79,
        image: IMAGES.meals.spicyJalapenoHeat,
      },
      {
        id: "super-monster-stack",
        name: "Super Monster Stack",
        description:
          "Triple beef patties, triple cheese, bacon, all the fixings",
        price: "$18.49",
        priceValue: 18.49,
        image: IMAGES.meals.superMonsterStack,
      },
      {
        id: "breakfast-beast-burger",
        name: "Breakfast Beast Burger",
        description:
          "Beef patty, fried egg, bacon, cheddar, hash brown, maple aioli",
        price: "$12.99",
        priceValue: 12.99,
        image: IMAGES.meals.breakfastBeastBurger,
      },
      {
        id: "veggie-supreme",
        name: "Veggie Supreme",
        description:
          "Plant-based patty, lettuce, tomato, onion, vegan sauce",
        price: "$11.49",
        priceValue: 11.49,
        image: IMAGES.meals.veggieSupreme,
      },
    ],
  },
  {
    id: "crispy-chicken",
    title: "Crispy Chicken",
    description: "Hand-breaded, pressure-fried to golden perfection",
    accent: "yellow",
    typography: IMAGES.menuTypography.sandwiches,
    items: [
      {
        id: "original-crispy-chicken",
        name: "Original Crispy Chicken",
        description:
          "Hand-breaded chicken fillet, lettuce, pickles, mayo on a toasted bun",
        price: "$7.99",
        priceValue: 7.99,
        image: IMAGES.meals.originalCrispyChicken,
      },
      {
        id: "nashville-hot-chicken",
        name: "Nashville Hot Chicken",
        description:
          "Spicy Nashville-style chicken fillet, pickles, comeback sauce",
        price: "$8.99",
        priceValue: 8.99,
        image: IMAGES.meals.nashvilleHotChicken,
      },
      {
        id: "buffalo-ranch-madness",
        name: "Buffalo Ranch Madness",
        description:
          "Crispy chicken tossed in buffalo sauce, ranch drizzle, lettuce",
        price: "$13.99",
        priceValue: 13.99,
        image: IMAGES.meals.buffaloRanchMadness,
      },
      {
        id: "chicken-club-deluxe",
        name: "Chicken Club Deluxe",
        description:
          "Crispy chicken, bacon, swiss, lettuce, tomato, mayo, double bun",
        price: "$9.49",
        priceValue: 9.49,
        image: IMAGES.meals.chickenClubDeluxe,
      },
      {
        id: "nashville-heat-wrap",
        name: "Nashville Heat Wrap",
        description:
          "Spicy chicken tenders, lettuce, pickles, ranch wrapped in a flour tortilla",
        price: "$10.99",
        priceValue: 10.99,
        image: IMAGES.meals.nashvilleHeatWrap,
      },
      {
        id: "chicken-tender-basket-3pc",
        name: "Chicken Tender Basket (3 pc)",
        description: "Three crispy chicken tenders with your choice of sauce",
        price: "$6.99",
        priceValue: 6.99,
        image: IMAGES.meals.chickenTenderBasket,
      },
      {
        id: "chicken-tender-basket-5pc",
        name: "Chicken Tender Basket (5 pc)",
        description: "Five crispy chicken tenders with your choice of sauce",
        price: "$9.99",
        priceValue: 9.99,
        image: IMAGES.meals.chickenTenderBasket,
      },
    ],
  },
  {
    id: "sides-shareables",
    title: "Sides & Shareables",
    description: "Made fresh throughout the day",
    accent: "green",
    typography: IMAGES.menuTypography.shareables,
    items: [
      {
        id: "famous-crunch-fries",
        name: "Famous Crunch Fries",
        description: "Our signature seasoned fries, crispy and golden",
        price: "$3.49",
        priceValue: 3.49,
        image: IMAGES.meals.famousCrunchFries,
      },
      {
        id: "sweet-potato-fries",
        name: "Sweet Potato Fries",
        description: "Crispy sweet potato fries with a touch of cinnamon sugar",
        price: "$4.49",
        priceValue: 4.49,
        image: IMAGES.meals.sweetPotatoFries,
      },
      {
        id: "loaded-cheese-fries",
        name: "Loaded Cheese Fries",
        description: "Crunch fries topped with melted cheddar, bacon bits",
        price: "$6.99",
        priceValue: 6.99,
        image: IMAGES.meals.loadedCheeseFries,
      },
      {
        id: "onion-rings",
        name: "Onion Rings",
        description: "Beer-battered onion rings with spicy dip",
        price: "$5.99",
        priceValue: 5.99,
        image: IMAGES.meals.onionRings,
      },
      {
        id: "mozzarella-sticks",
        name: "Mozzarella Sticks (6 pc)",
        description: "Golden fried mozzarella sticks with marinara sauce",
        price: "$5.99",
        priceValue: 5.99,
        image: IMAGES.meals.mozzarellaSticks,
      },
      {
        id: "jalapeno-poppers",
        name: "Jalapeno Poppers (6 pc)",
        description: "Cream cheese stuffed jalapenos, breaded and fried",
        price: "$5.49",
        priceValue: 5.49,
        image: IMAGES.meals.jalapenoPoppers,
      },
      {
        id: "buffalo-cauliflower-bites",
        name: "Buffalo Cauliflower Bites",
        description: "Crispy cauliflower bites tossed in buffalo sauce",
        price: "$5.99",
        priceValue: 5.99,
        image: IMAGES.meals.buffaloCauliflowerBites,
      },
      {
        id: "chicken-wings",
        name: "Chicken Wings (8 pc)",
        description: "Crispy wings tossed in your choice of sauce",
        price: "$7.99",
        priceValue: 7.99,
        image: IMAGES.meals.chickenWings,
      },
    ],
  },
  {
    id: "beverages-drinks",
    title: "Beverages & Drinks",
    description: "Refreshing options to complete your meal",
    accent: "blue",
    typography: IMAGES.menuTypography.beverages,
    items: [
      {
        id: "freshly-brewed-iced-tea",
        name: "Freshly Brewed Iced Tea",
        description: "Sweet or unsweet, brewed fresh daily",
        price: "$2.29",
        priceValue: 2.29,
        image: IMAGES.meals.freshlyBrewedIcedTea,
      },
      {
        id: "fresh-lemonade",
        name: "Fresh Lemonade",
        description: "Hand-squeezed lemonade, made fresh daily",
        price: "$2.79",
        priceValue: 2.79,
        image: IMAGES.meals.freshLemonade,
      },
      {
        id: "premium-coffee",
        name: "Premium Coffee",
        description: "Rich and bold, premium roast coffee",
        price: "$1.99",
        priceValue: 1.99,
        image: IMAGES.meals.premiumCoffee,
      },
      {
        id: "milkshakes",
        name: "Milkshakes",
        description: "Vanilla, chocolate, or strawberry — thick and creamy",
        price: "$4.49",
        priceValue: 4.49,
        image: IMAGES.meals.milkshakes,
      },
      {
        id: "fruit-smoothies",
        name: "Fruit Smoothies",
        description: "Strawberry banana, mango peach, or berry",
        price: "$3.99",
        priceValue: 3.99,
        image: IMAGES.meals.fruitSmoothies,
      },
      {
        id: "fresh-juice",
        name: "Fresh Juice",
        description: "Orange, apple, or cranberry — fresh squeezed",
        price: "$3.49",
        priceValue: 3.49,
        image: IMAGES.meals.freshJuice,
      },
    ],
  },
];
