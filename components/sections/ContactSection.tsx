"use client";

import { useState, type FormEvent } from "react";
import { Check, ChevronRight, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  GitHubIcon,
  GmailIcon,
  LinkedInIcon,
  PhoneIcon,
  WhatsAppIcon,
} from "@/components/ui/icons";

const EMAIL = "prasadanjula1@gmail.com";
const PHONE_DISPLAY = "+94 77 195 0486";

const channels = [
  {
    label: "Email",
    value: EMAIL,
    href: `mailto:${EMAIL}`,
    Icon: GmailIcon,
    external: false,
  },
  {
    label: "WhatsApp",
    value: PHONE_DISPLAY,
    href: "https://wa.me/94771950486",
    Icon: WhatsAppIcon,
    external: true,
  },
  {
    label: "Phone",
    value: PHONE_DISPLAY,
    href: "tel:+94771950486",
    Icon: PhoneIcon,
    external: false,
  },
];

const elsewhere = [
  { label: "GitHub", href: "https://github.com/Anjula2001", Icon: GitHubIcon },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/anjulaamarakoon/",
    Icon: LinkedInIcon,
  },
];

type Errors = Partial<Record<"name" | "email" | "message", string>>;

export function ContactSection() {
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();

    const nextErrors: Errors = {};
    if (!name) {
      nextErrors.name = "Please add your name.";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = "Please enter a valid email address.";
    }
    if (message.length < 10) {
      nextErrors.message = "Please write at least 10 characters.";
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    const subject = `Portfolio Contact - ${name}`;
    const body = [`Name: ${name}`, `Email: ${email}`, "", message].join("\n");
    const url = `https://mail.google.com/mail/?view=cm&fs=1&to=${EMAIL}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    const popup = window.open(url, "_blank", "noopener,noreferrer");
    if (!popup) {
      // Popup blocked: fall back to navigating in the same tab.
      window.location.href = url;
    }

    setSent(true);
  };

  return (
    <section
      className="section-block reveal-on-scroll mx-auto max-w-6xl px-6 sm:px-10"
      id="contact"
    >
      <div className="section-head reveal-item">
        <h2 className="section-title">Contact</h2>
        <p className="section-lede">
          Share a brief about your project, role, or collaboration idea.
        </p>
      </div>

      <div className="contact-layout reveal-item">
        <div className="contact-card">
          <h3 className="contact-card-title">Send a message</h3>
          <p className="contact-card-note">
            Opens a pre-filled draft in Gmail so you can review it before sending.
          </p>

          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <div className="contact-form-row">
              <div className="field">
                <label className="field-label" htmlFor="contact-name">
                  Name
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  className="glass-input"
                  placeholder="Your name"
                  autoComplete="name"
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? "contact-name-error" : undefined}
                />
                {errors.name ? (
                  <p className="field-error" id="contact-name-error">
                    {errors.name}
                  </p>
                ) : null}
              </div>

              <div className="field">
                <label className="field-label" htmlFor="contact-email">
                  Email
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  className="glass-input"
                  placeholder="you@example.com"
                  autoComplete="email"
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "contact-email-error" : undefined}
                />
                {errors.email ? (
                  <p className="field-error" id="contact-email-error">
                    {errors.email}
                  </p>
                ) : null}
              </div>
            </div>

            <div className="field">
              <label className="field-label" htmlFor="contact-message">
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={6}
                className="glass-input"
                placeholder="Tell me a little about what you have in mind."
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? "contact-message-error" : undefined}
              />
              {errors.message ? (
                <p className="field-error" id="contact-message-error">
                  {errors.message}
                </p>
              ) : null}
            </div>

            <div className="contact-submit-row">
              <Button type="submit" size="lg" className="inline-flex items-center gap-2">
                <Mail size={16} aria-hidden="true" />
                Send Message
              </Button>

              <p className="form-status" role="status">
                {sent ? (
                  <>
                    <Check size={16} aria-hidden="true" />
                    Draft opened in a new tab.
                  </>
                ) : null}
              </p>
            </div>
          </form>
        </div>

        <div className="contact-card">
          <h3 className="contact-card-title">Reach me directly</h3>
          <p className="contact-card-note">Usually quickest by WhatsApp or email.</p>

          <div className="channel-list">
            {channels.map(({ label, value, href, Icon, external }) => (
              <a
                key={label}
                href={href}
                className="channel"
                target={external ? "_blank" : undefined}
                rel={external ? "noreferrer" : undefined}
              >
                <span className="channel-icon" aria-hidden="true">
                  <Icon className="channel-glyph" />
                </span>
                <span className="channel-body">
                  <span className="channel-label">{label}</span>
                  <span className="channel-value">{value}</span>
                </span>
                <ChevronRight size={16} className="channel-chevron" aria-hidden="true" />
              </a>
            ))}
          </div>

          <div className="contact-card-footer">
            <div className="channel-divider" aria-hidden="true" />
            <p className="kicker">Elsewhere</p>
            <div className="contact-elsewhere mt-3">
              {elsewhere.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="contact-chip"
                >
                  <Icon className="h-3.75 w-3.75" />
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
