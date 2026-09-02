import { contactLinks } from "@/data/portfolioData";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <div className="footer-inner">
          <p>
            &copy; {new Date().getFullYear()} Anjula Amarakoon. Built with Next.js
            and Tailwind CSS.
          </p>
          <nav className="footer-links" aria-label="Elsewhere">
            {contactLinks.map((link) => (
              <a key={link.label} href={link.href} target="_blank" rel="noreferrer">
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
