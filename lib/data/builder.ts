export type BuilderOption = {
  label: string;
  price: number;
};

export type BuilderField = {
  id: string;
  label: string;
  placeholder: string;
  options: BuilderOption[];
};

export const builderFields: BuilderField[] = [
  {
    id: "bun",
    label: "Select Your Base:",
    placeholder: "Bun Types",
    options: [
      { label: "Sesame Bun", price: 1.5 },
      { label: "Brioche Bun", price: 2.0 },
      { label: "Lettuce Wrap", price: 1.0 },
      { label: "Pretzel Bun", price: 2.5 },
    ],
  },
  {
    id: "protein",
    label: "Select Your Protein",
    placeholder: "Meat Types",
    options: [
      { label: "Beef Patty", price: 5.0 },
      { label: "Crispy Chicken", price: 4.5 },
      { label: "Grilled Chicken", price: 4.5 },
      { label: "Plant-Based Patty", price: 5.5 },
    ],
  },
  {
    id: "cheese",
    label: "Add Cheese",
    placeholder: "Cheese Type",
    options: [
      { label: "Cheddar", price: 1.0 },
      { label: "Swiss", price: 1.0 },
      { label: "Pepper Jack", price: 1.25 },
      { label: "No Cheese", price: 0 },
    ],
  },
  {
    id: "toppings",
    label: "Choose Toppings",
    placeholder: "Free Basics",
    options: [
      { label: "Lettuce, Tomato, Onion", price: 0 },
      { label: "Pickles & Jalapenos", price: 0 },
      { label: "Crispy Onion Strings", price: 0.75 },
      { label: "Grilled Mushrooms", price: 0.75 },
    ],
  },
  {
    id: "addons",
    label: "Extra Add-ons",
    placeholder: "Meat Types",
    options: [
      { label: "Extra Patty", price: 3.0 },
      { label: "Bacon", price: 1.5 },
      { label: "Fried Egg", price: 1.5 },
      { label: "Avocado", price: 1.75 },
    ],
  },
];

export const basePrice = 8.99;
