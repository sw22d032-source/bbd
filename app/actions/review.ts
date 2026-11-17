"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { prisma } from "../../lib/prisma";
import { getAdmin } from "../../lib/auth";

export type ReviewState = {
  ok: boolean;
  message?: string;
  errors?: Partial<Record<"name" | "role" | "text" | "rating", string>>;
};

// ============================================
// Сайтаас сэтгэгдэл илгээх
// ============================================
export async function submitReview(
  _prev: ReviewState,
  formData: FormData
): Promise<ReviewState> {
  // Spam bot хамгаалалт (хүнд харагдахгүй талбар)
  if (String(formData.get("website") ?? "").trim()) {
    return { ok: true, message: "Баярлалаа! Таны сэтгэгдэл хянагдсаны дараа нийтлэгдэнэ." };
  }

  const name = String(formData.get("name") ?? "").trim();
  const role = String(formData.get("role") ?? "").trim();
  const text = String(formData.get("text") ?? "").trim();
  const rating = Number(formData.get("rating") ?? 0);

  const errors: ReviewState["errors"] = {};
  if (name.length < 2 || name.length > 60) errors.name = "Нэрээ 2–60 тэмдэгтээр оруулна уу";
  if (role.length > 80) errors.role = "80 тэмдэгтээс хэтрэхгүй";
  if (text.length < 10) errors.text = "Дор хаяж 10 тэмдэгт бичнэ үү";
  if (text.length > 600) errors.text = "600 тэмдэгтээс хэтрэхгүй";
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) errors.rating = "Үнэлгээ сонгоно уу";

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() ?? h.get("x-real-ip") ?? null;

  try {
    // Нэг IP-ээс 10 минутад 3-аас олон удаа илгээхийг хориглоно
    if (ip) {
      const recent = await prisma.review.count({
        where: { ipAddress: ip, createdAt: { gte: new Date(Date.now() - 10 * 60 * 1000) } },
      });
      if (recent >= 3) {
        return { ok: false, message: "Хэт олон удаа илгээлээ. Түр хүлээгээд дахин оролдоно уу." };
      }
    }

    await prisma.review.create({
      data: { name, role: role || null, text, rating, ipAddress: ip },
    });
  } catch (e) {
    console.error("Review save error:", e);
    return { ok: false, message: "Алдаа гарлаа. Дахин оролдоно уу." };
  }

  return { ok: true, message: "Баярлалаа! Таны сэтгэгдэл хянагдсаны дараа нийтлэгдэнэ." };
}

// ============================================
// Админ: статус солих / устгах
// ============================================
export async function setReviewStatus(formData: FormData) {
  const admin = await getAdmin();
  if (!admin) return;

  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "");
  if (!id || !["APPROVED", "HIDDEN", "PENDING"].includes(status)) return;

  await prisma.review.update({ where: { id }, data: { status } });
  revalidatePath("/");
  revalidatePath("/admin/reviews");
}

export async function deleteReview(formData: FormData) {
  const admin = await getAdmin();
  if (!admin) return;

  const id = String(formData.get("id") ?? "");
  if (!id) return;

  await prisma.review.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/reviews");
}