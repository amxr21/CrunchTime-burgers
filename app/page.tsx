import Hero from "@/components/home/Hero";
import Categories from "@/components/home/Categories";
import About from "@/components/home/About";
import BuildYourMeal from "@/components/home/BuildYourMeal";
import WhyCrunchtime from "@/components/home/WhyCrunchtime";
import TaglineBanner from "@/components/home/TaglineBanner";

export default function Home() {
  return (
    <>
      <Hero />
      <Categories />
      <About />
      <BuildYourMeal />
      <WhyCrunchtime />
      <TaglineBanner />
    </>
  );
}
