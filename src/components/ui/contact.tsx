"use client";

import ContactForm from "@/components/ui/contact-01-utils/contact-form";
import { BrandWordmark, ALL_AFRICAN_BRANDS } from "@/components/brand-wordmark";

interface ContactProps {
  topic?: string | null;
}

const Contact = ({ topic }: ContactProps) => {
  return (
    <section className="py-12 sm:py-16 bg-[#FAF8F5]">
      <div className="max-w-3xl px-4 sm:px-6 lg:px-8 mx-auto">
        {/* Main Contact Form */}
        <ContactForm initialTopic={topic} />

        {/* Company Brand Partners Showcase Under the Form */}
        <div className="mt-10 pt-8 border-t border-zinc-200/80 text-center space-y-4">
          <span className="block text-[13px] text-zinc-500 font-semibold uppercase tracking-wider">
            Trusted by top African tech companies
          </span>

          <div className="w-full relative group py-2">
            {ALL_AFRICAN_BRANDS.length > 2 ? (
              <div className="w-full overflow-hidden">
                <div className="marquee-scroll gap-10 sm:gap-14 items-center select-none">
                  {[...ALL_AFRICAN_BRANDS, ...ALL_AFRICAN_BRANDS, ...ALL_AFRICAN_BRANDS].map((brand, index) => (
                    <div
                      key={`${brand}-${index}`}
                      className="flex items-center shrink-0 opacity-95 hover:opacity-100 transition-all duration-200 cursor-pointer hover:scale-105"
                    >
                      <BrandWordmark brand={brand} />
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-8 sm:gap-12 select-none flex-wrap">
                {ALL_AFRICAN_BRANDS.map((brand) => (
                  <div
                    key={brand}
                    className="flex items-center shrink-0 opacity-95 hover:opacity-100 transition-all duration-200 cursor-pointer hover:scale-105"
                  >
                    <BrandWordmark brand={brand} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
