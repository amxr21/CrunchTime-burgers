import type { Metadata } from "next";
import Section from "@/components/ui/Section";
import PageBanner from "@/components/ui/PageBanner";
import LegalContent from "@/components/ui/LegalContent";
import { IMAGES } from "@/lib/assets";

export const metadata: Metadata = {
  title: "Customer's Data | CRUNCHTIME",
};

export default function CustomerDataPage() {
  return (
    <>
      <PageBanner image={IMAGES.findUsBanner} title="Customer's Data" subtitle="How We Handle Your Information" />

      <Section>
        <LegalContent
          intro="When you place an order with Crunchtime, we collect a small amount of information so we can get your order to the right branch."
          blocks={[
            {
              heading: "What We Collect",
              body: [
                "When you submit an order, we collect your name, phone number, any note you add for the branch, and the items in your order.",
              ],
            },
            {
              heading: "How We Use It",
              body: [
                "This information is sent to the branch you select so staff can prepare your order and contact you if needed. We do not use it for marketing or share it with third parties.",
              ],
            },
            {
              heading: "How Long We Keep It",
              body: [
                "Order details are retained only as long as needed to fulfil your order and for basic record-keeping at the branch.",
              ],
            },
            {
              heading: "Your Rights",
              body: [
                "You can contact any Crunchtime branch directly if you have questions about information you've shared with us, or to request that it be deleted.",
              ],
            },
          ]}
        />
      </Section>
    </>
  );
}
