import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { db } from "@/lib/db";
import { ClassicTemplate } from "@/components/templates/ClassicTemplate";
import type { ResumeMeta } from "@/types/resume";

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resume = await db.resume.findUnique({
    where: { slug: params.slug },
    include: { user: { select: { name: true } } },
  });
  if (!resume || !resume.isPublic) return {};

  const meta = resume.meta as ResumeMeta | null;
  return {
    title: `${resume.user.name} — ${meta?.headline ?? "CV"}`,
    description: meta?.summary?.slice(0, 160) ?? `CV de ${resume.user.name}`,
    openGraph: {
      title: `${resume.user.name} — ${meta?.headline ?? "CV"}`,
      description: meta?.summary?.slice(0, 160),
      type: "profile",
    },
  };
}

export default async function PublicCVPage({ params }: Props) {
  const resume = await db.resume.findUnique({
    where: { slug: params.slug },
    include: {
      user: { select: { name: true, email: true, image: true } },
      sections: {
        where: { visible: true },
        orderBy: { order: "asc" },
        include: { items: { orderBy: { order: "asc" } } },
      },
    },
  });

  if (!resume || !resume.isPublic) notFound();

  // Incrémenter les vues (fire-and-forget)
  db.resume.update({ where: { id: resume.id }, data: { views: { increment: 1 } } }).catch(() => {});

  const meta = (resume.meta ?? {}) as ResumeMeta;

  // TODO: router vers le bon template selon resume.templateId
  return (
    <main className="flex min-h-screen items-start justify-center bg-gray-100 py-10">
      <ClassicTemplate
        user={resume.user}
        meta={meta}
        sections={resume.sections.map(section => ({
          ...section,
          items: section.items.map(item => ({
            id: item.id,
            content: (item.content ?? {}) as Record<string, unknown>,
          })),
        }))}
      />
    </main>
  );
}
