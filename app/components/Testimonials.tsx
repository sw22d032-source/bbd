import { prisma } from "../../lib/prisma";
import { ReviewForm } from "./ReviewForm";
import { Reveal } from "./ui/Reveal";
import { Section, SectionHeading } from "./ui/Section";

async function getReviews() {
  try {
    return await prisma.review.findMany({
      where: { status: "APPROVED" },
      orderBy: { createdAt: "desc" },
      take: 9,
    });
  } catch (e) {
    console.error("Reviews load error:", e);
    return [];
  }
}

export async function Testimonials() {
  const reviews = await getReviews();

  return (
    <Section id="reviews" variant="light">
      <Reveal>
        <SectionHeading
          eyebrow="Сэтгэгдэл"
          title={
            <>
              Харилцагчид <span className="text-brand">юу гэж</span> хэлдэг
            </>
          }
        />
      </Reveal>

      {reviews.length > 0 ? (
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {reviews.map((r, i) => (
            <Reveal key={r.id} delay={i * 80} className="h-full">
              <figure className="relative flex h-full flex-col rounded-3xl border border-ink/5 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo/10">
                <span aria-hidden className="text-brand font-display text-6xl leading-none">
                  “
                </span>
                <blockquote className="-mt-4 flex-1 whitespace-pre-line leading-relaxed text-ink/75">
                  {r.text}
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-ink/5 pt-5">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand font-display text-sm font-bold text-white">
                    {r.name.replace(/^[^ ]+\. ?/, "").charAt(0).toUpperCase() || r.name.charAt(0)}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-bold text-ink">{r.name}</p>
                    {r.role && <p className="truncate text-sm text-ink/55">{r.role}</p>}
                  </div>
                  <div className="shrink-0 text-sm text-amber-400" aria-label={`${r.rating} од`}>
                    {"★".repeat(r.rating)}
                    <span className="text-ink/15">{"★".repeat(5 - r.rating)}</span>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      ) : (
        <p className="mt-10 text-center text-ink/50">
          Одоогоор сэтгэгдэл алга. Анхны сэтгэгдлийг та үлдээгээрэй 👇
        </p>
      )}

      <Reveal delay={100}>
        <div className="mx-auto mt-14 max-w-2xl">
          <ReviewForm />
        </div>
      </Reveal>
    </Section>
  );
}