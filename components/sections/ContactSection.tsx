"use client";

import type { FormEvent } from "react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function ContactSection() {
  const quickContacts = [
    {
      label: "WhatsApp",
      value: "+94 77 195 0486",
      href: "https://wa.me/94771950486",
      iconSrc: "/apple.png",
      iconAlt: "WhatsApp icon",
    },
    {
      label: "Phone",
      value: "+94 77 195 0486",
      href: "tel:+94771950486",
      iconSrc: "/telephone.png",
      iconAlt: "Telephone icon",
    },
  ];

  const handleEmailSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();

    const subject = `Portfolio Contact${name ? ` - ${name}` : ""}`;
    const body = [
      name ? `Name: ${name}` : "",
      email ? `Email: ${email}` : "",
      "",
      message || "Hi, I would like to discuss a project with you.",
    ]
      .filter(Boolean)
      .join("\n");

    const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=prasadanjula1@gmail.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    const popup = window.open(gmailComposeUrl, "_blank", "noopener,noreferrer");

    // Fallback for browsers that block popups: navigate in the same tab.
    if (!popup) {
      window.location.href = gmailComposeUrl;
    }
  };

  return (
    <section className="mx-auto max-w-6xl px-6 pb-28 sm:px-10 reveal-on-scroll" id="contact">
      <Card className="p-8 sm:p-12 reveal-item">
        <h2 className="section-title">Contact</h2>
        <p className="mt-3 max-w-2xl text-[var(--text-muted)]">
          Share a brief about your project, role, or collaboration idea.
        </p>

        <form className="mt-10 grid gap-4 sm:grid-cols-2" onSubmit={handleEmailSubmit}>
          <input type="text" name="name" placeholder="Your name" className="glass-input" required />
          <input type="email" name="email" placeholder="Email" className="glass-input" required />
          <textarea name="message" placeholder="Message" rows={5} className="glass-input sm:col-span-2" required />
          <div className="sm:col-span-2">
            <Button type="submit" size="lg" className="inline-flex items-center gap-2">
              <Image src="/gmail.png" alt="Gmail icon" width={18} height={18} />
              Send Message
            </Button>
          </div>
        </form>

        <div className="mt-8 border-t border-[var(--line)] pt-6">
          <p className="text-xs uppercase tracking-[0.1em] text-[var(--text-muted)]">Quick Contact</p>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {quickContacts.map((method) => (
              <a
                key={method.label}
                href={method.href}
                target={method.label === "Phone" ? undefined : "_blank"}
                rel={method.label === "WhatsApp" ? "noreferrer" : undefined}
                className="group flex items-center gap-3 rounded-2xl border border-[var(--line)] bg-white/70 px-4 py-3 transition hover:-translate-y-0.5 hover:border-[var(--line-strong)] hover:bg-white/90"
              >
                <span className="relative h-10 w-10 overflow-hidden">
                  <Image src={method.iconSrc} alt={method.iconAlt} fill sizes="40px" className="object-contain" />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs uppercase tracking-[0.08em] text-[var(--text-muted)]">{method.label}</span>
                  <span className="block truncate text-sm font-medium text-[var(--foreground)]">{method.value}</span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </Card>
    </section>
  );
}
