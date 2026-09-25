"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Mail } from "lucide-react";
import { GitHubIcon, LinkedInIcon, KaggleIcon } from "@/components/ui/icons";
import { contactLinks } from "@/data/portfolioData";

function getLinkIcon(label: string) {
  switch (label.toLowerCase()) {
    case "github":
      return <GitHubIcon className="h-3.5 w-3.5" />;
    case "linkedin":
      return <LinkedInIcon className="h-3.5 w-3.5" />;
    case "kaggle":
      return <KaggleIcon className="h-3.5 w-3.5" />;
    case "email":
      return <Mail size={14} aria-hidden="true" />;
    default:
      return null;
  }
}

export function SiteFooter() {
  return (
    <footer className="site-footer" id="site-footer">
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="footer-content"
        >
          {/* Main Row: Statement on one side, clean tactile chips on the other */}
          <div className="footer-main-row">
            <h2 className="footer-statement text-balance">
              Let’s build something intelligent.
            </h2>

            <nav className="footer-nav" aria-label="Social and contact links">
              {contactLinks.map((link) => {
                const isExternal = !link.href.startsWith("mailto:");
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noreferrer" : undefined}
                    className="footer-chip group"
                  >
                    <span className="footer-chip-icon" aria-hidden="true">
                      {getLinkIcon(link.label)}
                    </span>
                    <span className="footer-chip-label">{link.label}</span>
                    <ArrowUpRight
                      size={13}
                      className="footer-chip-arrow"
                      aria-hidden="true"
                    />
                  </a>
                );
              })}
            </nav>
          </div>

          {/* Bottom Colophon */}
          <div className="footer-bottom">
            <p className="footer-copyright">
              © 2026 Anjula Amarakoon
            </p>
            <p className="footer-signature">
              Designed &amp; engineered by Anjula.
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
