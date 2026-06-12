import type { Metadata } from "next";
import Section from "@/components/ui/Section";
import PageBanner from "@/components/ui/PageBanner";
import LegalContent from "@/components/ui/LegalContent";
import { IMAGES } from "@/lib/assets";

export const metadata: Metadata = {
  title: "Terms & Conditions | CRUNCHTIME",
};

export default function TermsPage() {
  return (
    <>
      <PageBanner image={IMAGES.findUsBanner} title="Terms & Conditions" subtitle="The Fine Print" />

      <Section>
        <LegalContent
          intro="By using the Crunchtime website and ordering from us, you agree to the following terms."
          blocks={[
            {
              heading: "Ordering",
              body: [
                "Orders placed through this site are pickup orders only — there is no online payment. Submitting an order sends a request to your chosen branch to begin preparing it. Payment is made in store on collection.",
              ],
            },
            {
              heading: "Availability & Pricing",
              body: [
                "Menu items, prices, and availability may vary by branch and can change without notice. Prices shown on the site are estimates and may differ slightly from the final amount charged in store.",
              ],
            },
            {
              heading: "Order Accuracy",
              body: [
                "Please double-check your order and contact details before submitting. While we do our best to fulfil every order as requested, branches reserve the right to contact you regarding substitutions or changes.",
              ],
            },
            {
              heading: "Acceptable Use",
              body: [
                "You agree not to misuse the site, including submitting false orders, attempting to disrupt the service, or using it for any unlawful purpose.",
              ],
            },
            {
              heading: "Changes to These Terms",
              body: [
                "We may update these terms from time to time. Continued use of the site after changes are posted constitutes acceptance of the updated terms.",
              ],
            },
          ]}
        />
      </Section>
    </>
  );
}
