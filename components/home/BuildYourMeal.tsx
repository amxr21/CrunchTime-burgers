import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import MealCard from "@/components/ui/MealCard";
import { builtMeals } from "@/lib/data/home";

export default function BuildYourMeal() {
  return (
    <Section id="build-your-meal">
      <SectionHeading description="Start with your favorite base — beef, chicken, turkey, or plant-based — then customize with over 15 premium add-ons. From classic to creative, build exactly what you're craving.">
        Create Your Perfect Meal, Yourself!!
      </SectionHeading>

      <Reveal className="col-span-12 grid grid-cols-1 gap-gutter sm:grid-cols-4" delay={0.15} stagger>
        {builtMeals.map((meal, index) => (
          <MealCard
            key={`${meal.name}-${index}`}
            href="/make-it"
            name={meal.name}
            description={meal.by}
            price={meal.price}
            image={meal.image}
            top={meal.top}
          />
        ))}
      </Reveal>
    </Section>
  );
}
