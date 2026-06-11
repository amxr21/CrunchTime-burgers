"use client";

/**
 * Pickup-order ("cart") page.
 *
 * This is NOT e-commerce checkout — there is no online payment. The customer
 * assembles an order here, and submitting it notifies the chosen branch
 * (via WhatsApp + email) so staff can start preparing it. The customer pays
 * and collects the order in store.
 */

import { useState } from "react";
import Image from "next/image";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import CartItemRow from "@/components/cart/CartItemRow";
import BranchPicker from "@/components/cart/BranchPicker";
import PhoneModal, { type PhoneModalSubmitData } from "@/components/cart/PhoneModal";
import OrderSuccess from "@/components/cart/OrderSuccess";
import { useCart } from "@/lib/cart/CartContext";
import { branches } from "@/lib/data/branches";
import { ICONS } from "@/lib/assets";

export default function CartPage() {
  const { items, hydrated, subtotal, itemCount, clear } = useCart();
  const [branchId, setBranchId] = useState(branches[0].id);
  const [modalOpen, setModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [success, setSuccess] = useState<{ reference: string; phone: string } | null>(null);

  const selectedBranch = branches.find((b) => b.id === branchId) ?? branches[0];

  async function submitOrder(contact: PhoneModalSubmitData) {
    setSubmitting(true);
    setSubmitError(null);

    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: contact.name,
          phone: contact.phone,
          note: contact.note,
          branchId,
          items: items.map((item) => ({ id: item.id, qty: item.qty })),
          company: contact.company,
          elapsedMs: contact.elapsedMs,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        setSubmitError("Something went wrong sending your order. Please try again.");
        return;
      }

      setModalOpen(false);
      setSuccess({ reference: data.reference, phone: contact.phone });
      clear();
    } catch {
      setSubmitError("Network error — please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <Section>
        <OrderSuccess
          reference={success.reference}
          branch={selectedBranch}
          phone={success.phone}
          onPlaceAnother={() => setSuccess(null)}
        />
      </Section>
    );
  }

  return (
    <Section className="gap-y-8">
      <Reveal className="col-span-12">
        <h1 className="font-display text-6xl uppercase tracking-wide sm:text-7xl">Your Order</h1>
        <p className="mt-2 max-w-2xl text-xl text-brand-white/70">
          Order ahead — pay &amp; collect in store. This sends your order to the branch to start
          preparing.
        </p>
      </Reveal>

      {!hydrated ? null : items.length === 0 ? (
        <Reveal className="col-span-12 flex flex-col items-center gap-4 py-16 text-center">
          <Image src={ICONS.cartBag} alt="" width={48} height={44} className="opacity-60" />
          <p className="text-2xl text-brand-white/70">Your order is empty.</p>
          <Button href="/menu" size="lg">
            Browse the menu
          </Button>
        </Reveal>
      ) : (
        <div className="col-span-12 grid grid-cols-1 gap-gutter lg:grid-cols-12">
          <Reveal className="lg:col-span-8" stagger>
            <div className="rounded-2xl bg-brand-white/5 p-4 sm:p-6">
              {items.map((item) => (
                <CartItemRow key={item.id} item={item} />
              ))}
            </div>
          </Reveal>

          <Reveal className="flex flex-col gap-6 lg:col-span-4" delay={0.1}>
            <div className="rounded-2xl bg-brand-white/5 p-6">
              <h2 className="font-display text-3xl uppercase tracking-wide">Summary</h2>
              <div className="mt-3 flex justify-between text-xl">
                <span className="text-brand-white/70">Items</span>
                <span>{itemCount}</span>
              </div>
              <div className="mt-1 flex justify-between text-xl">
                <span className="text-brand-white/70">Subtotal (estimate)</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <p className="mt-3 text-lg text-brand-yellow">
                Pay in store on pickup — no online payment.
              </p>
            </div>

            <div className="rounded-2xl bg-brand-white/5 p-6">
              <h2 className="font-display text-3xl uppercase tracking-wide">Pickup branch</h2>
              <div className="mt-3">
                <BranchPicker selectedBranchId={branchId} onSelect={setBranchId} />
              </div>
            </div>

            {submitError && (
              <p role="alert" className="text-lg text-brand-red">
                {submitError}
              </p>
            )}

            <Button onClick={() => setModalOpen(true)} size="lg" className="w-full justify-center">
              Send order to branch
            </Button>
          </Reveal>
        </div>
      )}

      <PhoneModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={submitOrder}
        submitting={submitting}
      />
    </Section>
  );
}
