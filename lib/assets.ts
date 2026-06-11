/**
 * Central registry of static asset paths under `public/`.
 * Reference these constants instead of hardcoding string paths.
 */

export const ICONS = {
  logo: "/icons/logo.svg",
  cartBag: "/icons/cart-bag.svg",
  locationPin: "/icons/location-pin.svg",
  phone: "/icons/call.svg",
  whatsapp: "/icons/whatsapp.svg",
  frame: "/icons/icon-frame.svg",
  group: "/icons/icon-group.svg",
  groupAlt1: "/icons/icon-group-1.svg",
  groupAlt2: "/icons/icon-group-2.svg",
} as const;

export const IMAGES = {
  heroBurger: "/images/hero.png",
  scratches: "/images/scratches.png",
  pattern: "/images/pattern.jpg",
  typography: "/images/typography.png",
  typography2: "/images/typography2.png",
  topBadge: "/images/top.png",

  menuTypography: {
    burgers: "/images/typography/BURGERS.png",
    sandwiches: "/images/typography/SANDWICHES.png",
    shareables: "/images/typography/SHAREABLES.png",
    beverages: "/images/typography/BEVERAGES.png",
  },
  makeBurgerBanner: "/images/make-burger-banner.jpg",
  findUsBanner: "/images/find-us-banner.jpg",
  workingHoursBanner: "/images/working-hours-banner.jpg",

  elementPatterns: {
    red: "/images/element-pattern-1.png",
    yellow: "/images/element-pattern-2.png",
    green: "/images/element-pattern-3.png",
    blue: "/images/element-pattern-4.png",
  },

  categories: {
    signatureBurgers: "/images/categories/signature-burgers.jpg",
    crispyChicken: "/images/categories/crispy-chicken.jpg",
    sidesShareables: "/images/categories/sides-shareables.jpg",
    beveragesDrinks: "/images/categories/beverages-drinks.jpg",
  },

  about: {
    photo1: "/images/about/about-1.jpg",
    photo2: "/images/about/about-2.jpg",
    photo3: "/images/about/about-3.jpg",
    photo4: "/images/about/about-4.jpg",
  },

  burgers: {
    monsterStack: "/images/burgers/monster-stack.png",
    buffaloMadness: "/images/burgers/buffalo-madness.png",
    theTexan: "/images/burgers/the-texan.png",
  },

  emojis: {
    chicken: "/images/emojies/chicken.png",
    fries: "/images/emojies/fries.png",
    drink: "/images/emojies/drink.png",
    wrap: "/images/emojies/wrap.png",
  },

  meals: {
    originalCrunchtime: "/images/meals/original-crunchtime.png",
    doubleCrunchClassic: "/images/meals/double-crunch-classic.png",
    bbqBaconBlaster: "/images/meals/bbq-bacon-blaster.png",
    mushroomSwissMelt: "/images/meals/mushroom-swiss-melt.png",
    spicyJalapenoHeat: "/images/meals/spicy-jalapeno-heat.png",
    superMonsterStack: "/images/meals/super-monster-stack.png",
    breakfastBeastBurger: "/images/meals/breakfast-beast-burger.png",
    veggieSupreme: "/images/meals/veggie-supreme.png",

    originalCrispyChicken: "/images/meals/original-crispy-chicken.png",
    nashvilleHotChicken: "/images/meals/nashville-hot-chicken.png",
    buffaloRanchMadness: "/images/meals/buffalo-ranch-madness.png",
    chickenClubDeluxe: "/images/meals/chicken-club-deluxe.png",
    nashvilleHeatWrap: "/images/meals/nashville-heat-wrap.png",
    chickenTenderBasket: "/images/meals/chicken-tender-basket.png",

    famousCrunchFries: "/images/meals/famous-crunch-fries.png",
    sweetPotatoFries: "/images/meals/sweet-potato-fries.png",
    loadedCheeseFries: "/images/meals/loaded-cheese-fries.png",
    onionRings: "/images/meals/onion-rings.png",
    mozzarellaSticks: "/images/meals/mozzarella-sticks.png",
    jalapenoPoppers: "/images/meals/jalapeno-poppers.png",
    buffaloCauliflowerBites: "/images/meals/buffalo-cauliflower-bites.png",
    chickenWings: "/images/meals/chicken-wings.png",

    freshlyBrewedIcedTea: "/images/meals/freshly-brewed-iced-tea.png",
    freshLemonade: "/images/meals/fresh-lemonade.png",
    premiumCoffee: "/images/meals/premium-coffee.png",
    milkshakes: "/images/meals/milkshakes.png",
    fruitSmoothies: "/images/meals/fruit-smoothies.png",
    freshJuice: "/images/meals/fresh-juice.png",
  },
} as const;
