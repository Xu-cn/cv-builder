import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { generateSlug } from "@/lib/utils";
import { z } from "zod";

const createSchema = z.object({
  title: z.string().min(1).max(100),
  templateId: z.string().default("classic"),
});

// GET /api/resume — list user's resumes
export async function GET() {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const resumes = await db.resume.findMany({
    where: { userId: session.user.id },
    orderBy: { updatedAt: "desc" },
    include: { _count: { select: { sections: true } } },
  });

  return NextResponse.json(resumes);
}

// POST /api/resume — create a new resume
export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const parsed = createSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const { title, templateId } = parsed.data;

  const resume = await db.resume.create({
    data: {
      userId: session.user.id,
      title,
      slug: generateSlug(title),
      templateId,
      meta: {
        headline: "",
        summary: "",
        phone: "",
        location: "",
        linkedin: "",
        github: "",
        website: "",
      },
      sections: {
        create: [
          { type: "experience", title: "Expérience", order: 0 },
          { type: "education", title: "Formation", order: 1 },
          { type: "skills", title: "Compétences", order: 2 },
          { type: "languages", title: "Langues", order: 3 },
        ],
      },
    },
    include: { sections: true },
  });

  return NextResponse.json(resume, { status: 201 });
}
