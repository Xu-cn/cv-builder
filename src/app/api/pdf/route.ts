import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import puppeteer from "puppeteer";
import { absoluteUrl } from "@/lib/utils";

// GET /api/pdf?resumeId=xxx
export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const resumeId = req.nextUrl.searchParams.get("resumeId");
  if (!resumeId) return NextResponse.json({ error: "Missing resumeId" }, { status: 400 });

  const resume = await db.resume.findFirst({
    where: { id: resumeId, userId: session.user.id },
  });
  if (!resume) return NextResponse.json({ error: "Not found" }, { status: 404 });

  // On utilise Puppeteer pour render la page publique en PDF
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  try {
    const page = await browser.newPage();

    // Temporairement rendre public pour le screenshot, ou utiliser un token interne
    await page.goto(absoluteUrl(`/cv/${resume.slug}`), { waitUntil: "networkidle0" });

    const pdf = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: { top: "0", right: "0", bottom: "0", left: "0" },
    });

    return new NextResponse(pdf, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${resume.title}.pdf"`,
      },
    });
  } finally {
    await browser.close();
  }
}
