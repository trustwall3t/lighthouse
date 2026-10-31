import testimonialsJson from "@/data/testimonials.json";
import type { Testimonial } from "@/types/site";

type JsonRow = {
  id?: number;
  name?: string;
  position?: string;
  what_is_said?: string;
  picture?: string;
  reviewed_at?: string;
};

export function portraitUrl(id: number | null, picture: string | null): string {
  const pic = picture?.trim() ?? "";
  if (pic.startsWith("http://") || pic.startsWith("https://")) return pic;

  let relative = pic.replace(/^\//, "");
  if (relative.startsWith("storage/")) {
    relative = relative.slice("storage/".length);
  }
  if (relative.startsWith("public/storage/")) {
    relative = relative.slice("public/storage/".length);
  }
  if (relative.startsWith("main/img/")) {
    return `/${relative}`;
  }
  if (relative.startsWith("testimonials/")) {
    return `/storage/${relative}`;
  }
  if (relative) {
    const file = relative.split("/").pop() ?? relative;
    return `/storage/testimonials/${file}`;
  }

  const seed = id ?? 0;
  const gender = seed % 2 === 0 ? "men" : "women";
  return `https://randomuser.me/api/portraits/${gender}/${seed % 100}.jpg`;
}

export function loadHomeTestimonials(): Testimonial[] {
  const rows = (testimonialsJson as { testimonials?: JsonRow[] }).testimonials ?? [];
  return rows.map((row) => {
    const id = row.id != null ? Number(row.id) : null;
    return {
      id,
      name: row.name ?? "Member",
      title: row.position ?? "Great experience",
      body: row.what_is_said ?? "",
      avatarUrl: portraitUrl(id, row.picture ?? null),
      reviewedAt: row.reviewed_at ?? null,
    };
  });
}
