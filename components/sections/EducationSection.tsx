import Image from "next/image";

import { Card, CardContent } from "@/components/ui/card";
import type { CertificateItem, EducationItem } from "@/data/portfolioData";

type EducationSectionProps = {
  education: EducationItem[];
  certificates: CertificateItem[];
};

export function EducationSection({ education, certificates }: EducationSectionProps) {
  return (
    <section className="section-block reveal-on-scroll mx-auto max-w-6xl px-6 sm:px-10" id="education">
      <div className="section-head reveal-item">
        <h2 className="section-title">Education Journey</h2>
        <p className="mt-3 max-w-2xl text-[var(--text-muted)]">
          A concise view of the academic path behind my technical foundation.
        </p>
      </div>

      <div className="education-grid mt-10 reveal-item" role="list" aria-label="Education Journey">
        {education.map((item) => (
          <Card key={`${item.institution}-${item.duration}`} className="education-card education-card--horizontal h-full" role="listitem">
            <CardContent className="p-0">
              <div className="education-card-body p-6 sm:p-7">
                <div className="education-card-head">
                  <div>
                    <div className="education-institution-row">
                      {item.logoSrc && (
                        <span className="education-logo-shell" aria-hidden="true">
                          <Image
                            src={item.logoSrc}
                            alt={item.logoAlt ?? `${item.institution} logo`}
                            width={24}
                            height={24}
                            className="education-logo-image"
                          />
                        </span>
                      )}
                      <div className="min-w-0">
                        <h3 className="text-lg font-semibold tracking-[-0.015em] text-[var(--foreground)] sm:text-xl">
                          {item.institution}
                        </h3>
                        <p className="mt-2 text-sm font-medium text-[var(--text-muted)] sm:text-[0.98rem]">{item.degree}</p>
                      </div>
                    </div>
                  </div>
                  <div className="education-meta-right">
                    <p className="education-duration text-xs uppercase tracking-[0.14em] text-[var(--text-muted)]">
                      {item.duration}
                    </p>
                    {item.results && (
                      <p className="text-xs tracking-[0.14em] text-[var(--text-muted)]">
                        {item.results}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-5 border-t border-[var(--line)] pt-4">
                  <p className="max-w-2xl text-sm leading-7 text-[var(--text-muted)]">
                    {item.description}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="certificates-group reveal-item">
        <div className="certificates-divider" aria-hidden="true" />
        <div className="certificates-head">
          <h3 className="certificates-title">Certificates</h3>
        </div>

        <div className="certificates-scroll" role="list" aria-label="Certificates">
          {certificates.map((item) => (
            <Card key={`${item.title}-${item.year}`} className="education-card certificate-card" role="listitem">
              <CardContent className="p-0">
                <div className="certificate-body">
                  <p className="certificate-year">{item.year}</p>
                  <h4 className="certificate-title">{item.title}</h4>
                  <p className="certificate-issuer">{item.issuer}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
