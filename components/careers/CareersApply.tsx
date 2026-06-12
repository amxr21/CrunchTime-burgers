"use client";

import { useState } from "react";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import ApplicationModal, { type ApplicationModalSubmitData } from "@/components/careers/ApplicationModal";
import { useToast } from "@/lib/toast/ToastContext";

export type Role = {
  title: string;
  type: string;
  description: string;
};

type CareersApplyProps = {
  roles: Role[];
};

export default function CareersApply({ roles }: CareersApplyProps) {
  const { showToast } = useToast();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState(roles[0]?.title ?? "");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const roleTitles = roles.map((role) => role.title);

  function openModal(role: string) {
    setSelectedRole(role);
    setSubmitError(null);
    setModalOpen(true);
  }

  async function submitApplication(data: ApplicationModalSubmitData) {
    setSubmitting(true);
    setSubmitError(null);

    try {
      const res = await fetch("/api/careers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok || !result.ok) {
        setSubmitError("Something went wrong sending your application. Please try again.");
        return;
      }

      setModalOpen(false);
      showToast({
        title: "Application sent!",
        description: "Thanks for applying — we'll be in touch soon.",
      });
    } catch {
      setSubmitError("Network error — please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <Reveal className="col-span-12 grid grid-cols-1 gap-gutter sm:grid-cols-2 lg:grid-cols-3" stagger>
        {roles.map((role) => (
          <div key={role.title} className="flex flex-col rounded-2xl bg-brand-white/5 p-6">
            <h3 className="font-display text-3xl uppercase tracking-wide">{role.title}</h3>
            <p className="mt-1 text-sm uppercase tracking-wide text-brand-yellow">{role.type}</p>
            <p className="mt-3 flex-1 text-lg text-brand-white/70">{role.description}</p>
            <Button onClick={() => openModal(role.title)} className="mt-4 w-full justify-center">
              Apply Now
            </Button>
          </div>
        ))}
      </Reveal>

      {submitError && (
        <p role="alert" className="col-span-12 text-center text-lg text-brand-red">
          {submitError}
        </p>
      )}

      <ApplicationModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={submitApplication}
        submitting={submitting}
        roles={roleTitles}
        defaultRole={selectedRole}
      />
    </>
  );
}
