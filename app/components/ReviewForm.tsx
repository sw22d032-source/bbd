"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { submitReview, type ReviewState } from "../actions/review";

const initial: ReviewState = { ok: false };

export function ReviewForm() {
  const [state, action, pending] = useActionState(submitReview, initial);
  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.ok) {
      formRef.current?.reset();
      setRating(5);
    }
  }, [state]);

  const input =
    "w-full rounded-xl border border-ink/10 bg-white px-4 py-3 text-sm text-ink placeholder:text-ink/35 transition focus:border-indigo focus:outline-none focus:ring-4 focus:ring-indigo/10";

  return (
    <form
      ref={formRef}
      action={action}
      className="rounded-3xl border border-ink/5 bg-white p-6 shadow-xl shadow-indigo/5 sm:p-8"
    >
      <h3 className="font-display text-lg font-bold text-ink">Сэтгэгдэл үлдээх</h3>
      <p className="mt-1 text-sm text-ink/55">
        Бидэнтэй хамтран ажилласан бол сэтгэгдлээ хуваалцаарай.
      </p>

      {/* Honeypot — хүнд харагдахгүй */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

      {/* Rating */}
      <div className="mt-6">
        <span className="text-sm font-semibold text-ink">Үнэлгээ</span>
        <div className="mt-2 flex gap-1" onMouseLeave={() => setHover(0)}>
          {[1, 2, 3, 4, 5].map((n) => {
            const on = n <= (hover || rating);
            return (
              <button
                key={n}
                type="button"
                aria-label={`${n} од`}
                onClick={() => setRating(n)}
                onMouseEnter={() => setHover(n)}
                className={`text-3xl transition-transform hover:scale-110 ${on ? "text-amber-400" : "text-ink/15"}`}
              >
                ★
              </button>
            );
          })}
        </div>
        <input type="hidden" name="rating" value={rating} />
        {state.errors?.rating && <p className="mt-1 text-xs text-red-500">{state.errors.rating}</p>}
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-semibold text-ink">
            Нэр <span className="text-red-500">*</span>
          </span>
          <input name="name" required maxLength={60} placeholder="Б. Бат" className={`${input} mt-1.5`} />
          {state.errors?.name && <p className="mt-1 text-xs text-red-500">{state.errors.name}</p>}
        </label>
        <label className="block">
          <span className="text-sm font-semibold text-ink">Албан тушаал, байгууллага</span>
          <input name="role" maxLength={80} placeholder="CEO, Компани" className={`${input} mt-1.5`} />
          {state.errors?.role && <p className="mt-1 text-xs text-red-500">{state.errors.role}</p>}
        </label>
      </div>

      <label className="mt-4 block">
        <span className="text-sm font-semibold text-ink">
          Сэтгэгдэл <span className="text-red-500">*</span>
        </span>
        <textarea
          name="text"
          required
          rows={4}
          maxLength={600}
          placeholder="Бидэнтэй ажилласан туршлагаа бичнэ үү..."
          className={`${input} mt-1.5 resize-none`}
        />
        {state.errors?.text && <p className="mt-1 text-xs text-red-500">{state.errors.text}</p>}
      </label>

      {state.message && (
        <p
          className={`mt-4 rounded-xl px-4 py-3 text-sm font-medium ${
            state.ok ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-600"
          }`}
        >
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="mt-6 w-full rounded-full bg-brand py-3.5 font-bold text-white shadow-lg shadow-indigo/25 transition-all hover:-translate-y-0.5 hover:shadow-xl disabled:opacity-60"
      >
        {pending ? "Илгээж байна..." : "Сэтгэгдэл илгээх"}
      </button>
    </form>
  );
}