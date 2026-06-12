import type { Metadata } from "next";
import Section from "@/components/ui/Section";
import PageBanner from "@/components/ui/PageBanner";
import LegalContent from "@/components/ui/LegalContent";
import { IMAGES } from "@/lib/assets";

export const metadata: Metadata = {
  title: "Privacy Policy | CRUNCHTIME",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageBanner image={IMAGES.findUsBanner} title="Privacy Policy" subtitle="Your Privacy Matters" />

      <Section>
        <LegalContent
          intro="This policy explains what information Crunchtime collects through this website and how it is used."
          blocks={[
            {
              heading: "Information We Collect",
              body: [
                "We collect information you provide directly, such as your name and phone number when placing an order, along with your order details and items kept in your cart while you browse.",
              ],
            },
            {
              heading: "Cookies & Local Storage",
              body: [
                "We use your browser's local storage to remember items in your cart between visits. This data stays on your device and is not shared with us until you submit an order.",
              ],
            },
            {
              heading: "How We Use Your Information",
              body: [
                "Order information is sent to the branch you select so they can prepare and fulfil your order. We do not sell or share your information with third parties for marketing purposes.",
              ],
            },
            {
              heading: "Data Security",
              body: [
                "We take reasonable steps to protect the information submitted through this site, but no method of transmission over the internet is completely secure.",
              ],
            },
            {
              heading: "Contact Us",
              body: [
                "If you have any questions about this privacy policy, please get in touch with your nearest Crunchtime branch.",
              ],
            },
          ]}
        />
      </Section>
    </>
  );
}
