import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "../../../lib/prisma";
import { getAdmin } from "../../../lib/auth";
import { deleteReview, setReviewStatus } from "../../actions/review";

const TABS = [
  { key: "PENDING", label: "Хүлээгдэж буй" },
  { key: "APPROVED", label: "Нийтлэгдсэн" },
  { key: "HIDDEN", label: "Нуусан" },
] as const;

const BADGE: Record<string, string> = {
  PENDING: "bg-amber-100 text-amber-700",
  APPROVED: "bg-emerald-100 text-emerald-700",
  HIDDEN: "bg-ink/10 text-ink/60",
};

export default async function ReviewsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const admin = await getAdmin();
  if (!admin) redirect("/admin/login");

  const { status = "PENDING" } = await searchParams;

  const [reviews, counts] = await Promise.all([
    prisma.review.findMany({ where: { status }, orderBy: { createdAt: "desc" } }),
    prisma.review.groupBy({ by: ["status"], _count: { _all: true } }),
  ]);
  const countOf = (s: string) => counts.find((c) => c.status === s)?._count._all ?? 0;

  return (
    <main className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-8">
      <h1 className="font-display text-2xl font-bold text-ink sm:text-3xl">Сэтгэгдэл</h1>
      <p className="mt-1 text-sm text-ink/60">
        Сайтаас ирсэн сэтгэгдлийг зөвшөөрсний дараа нүүр хуудсанд харагдана.
      </p>

      <div className="mb-5 mt-6 flex flex-wrap gap-2">
        {TABS.map((t) => (
          <Link
            key={t.key}
            href={`/admin/reviews?status=${t.key}`}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
              status === t.key ? "bg-indigo text-white" : "bg-white text-ink/70 ring-1 ring-ink/10 hover:bg-ink/5"
            }`}
          >
            {t.label} <span className="opacity-70">({countOf(t.key)})</span>
          </Link>
        ))}
      </div>

      {reviews.length === 0 ? (
        <div className="rounded-2xl border border-ink/10 bg-white px-6 py-16 text-center text-ink/50">
          Сэтгэгдэл алга.
        </div>
      ) : (
        <ul className="space-y-3">
          {reviews.map((r) => (
            <li key={r.id} className="rounded-2xl border border-ink/10 bg-white p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-bold text-ink">
                    {r.name}
                    {r.role && <span className="font-normal text-ink/50"> · {r.role}</span>}
                  </p>
                  <p className="mt-0.5 text-sm text-amber-400">
                    {"★".repeat(r.rating)}
                    <span className="text-ink/15">{"★".repeat(5 - r.rating)}</span>
                    <span className="ml-2 text-xs text-ink/40">
                      {r.createdAt.toLocaleString("mn-MN", { timeZone: "Asia/Ulaanbaatar" })}
                    </span>
                  </p>
                </div>
                <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${BADGE[r.status] ?? ""}`}>
                  {TABS.find((t) => t.key === r.status)?.label ?? r.status}
                </span>
              </div>

              <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-ink/75">{r.text}</p>

              <div className="mt-4 flex flex-wrap gap-2 border-t border-ink/5 pt-4">
                {r.status !== "APPROVED" && (
                  <form action={setReviewStatus}>
                    <input type="hidden" name="id" value={r.id} />
                    <input type="hidden" name="status" value="APPROVED" />
                    <button className="rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-emerald-700">
                      ✓ Зөвшөөрөх
                    </button>
                  </form>
                )}
                {r.status !== "HIDDEN" && (
                  <form action={setReviewStatus}>
                    <input type="hidden" name="id" value={r.id} />
                    <input type="hidden" name="status" value="HIDDEN" />
                    <button className="rounded-lg bg-ink/5 px-3 py-1.5 text-xs font-bold text-ink/70 hover:bg-ink/10">
                      Нуух
                    </button>
                  </form>
                )}
                <form action={deleteReview}>
                  <input type="hidden" name="id" value={r.id} />
                  <button className="rounded-lg px-3 py-1.5 text-xs font-bold text-red-600 hover:bg-red-50">
                    Устгах
                  </button>
                </form>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}