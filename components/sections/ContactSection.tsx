import { Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function ContactSection() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-28 sm:px-10 reveal-on-scroll" id="contact">
      <Card className="p-8 sm:p-12 reveal-item">
        <h2 className="section-title">Contact</h2>
        <p className="mt-3 max-w-2xl text-[var(--text-muted)]">
          Share a brief about your project, role, or collaboration idea.
        </p>

        <form className="mt-10 grid gap-4 sm:grid-cols-2">
          <input type="text" placeholder="Your name" className="glass-input" />
          <input type="email" placeholder="Email" className="glass-input" />
          <textarea placeholder="Message" rows={5} className="glass-input sm:col-span-2" />
          <div className="sm:col-span-2">
            <Button size="lg" className="inline-flex items-center">
              <Mail size={16} />
              Send Message
            </Button>
          </div>
        </form>
      </Card>
    </section>
  );
}
