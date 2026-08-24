"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { SectionHeading } from "@/components/ui/section-heading";
import { FAQ } from "@/content/faq";
import { cn } from "@/lib/utils";

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="section-x mx-auto max-w-[110rem] py-20 sm:py-28">
      <SectionHeading
        index="05"
        eyebrow="Питання та відповіді"
        title="Що запитують найчастіше"
        description="Якщо вашого питання тут немає — просто зателефонуйте або напишіть в Instagram."
      />

      <div className="mx-auto max-w-4xl border-t border-line">
        {FAQ.map((item, i) => {
          const isOpen = openIndex === i;

          return (
            <div key={item.question} className="border-b border-line">
              <h3>
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${i}`}
                  className="group flex w-full items-start gap-4 py-6 text-left sm:gap-6"
                >
                  <span
                    className={cn(
                      "mt-1 font-mono text-[11px] tracking-[0.2em] transition-colors duration-300",
                      isOpen ? "text-cyan" : "text-faint",
                    )}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <span
                    className={cn(
                      "flex-1 text-[16px] leading-snug font-medium transition-colors duration-300 sm:text-lg",
                      isOpen ? "text-paper" : "text-paper/70 group-hover:text-paper",
                    )}
                  >
                    {item.question}
                  </span>

                  <span
                    className={cn(
                      "mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-[13px] transition-all duration-300",
                      isOpen
                        ? "rotate-45 border-cyan text-cyan"
                        : "border-line text-faint group-hover:border-line-strong",
                    )}
                    aria-hidden
                  >
                    +
                  </span>
                </button>
              </h3>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={`faq-panel-${i}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="max-w-2xl pb-7 pl-8 text-[14px] leading-relaxed text-muted sm:pl-12 sm:text-[15px]">
                      {item.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
