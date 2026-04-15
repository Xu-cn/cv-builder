import { redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const resumes = await db.resume.findMany({
    where: { userId: session.user.id },
    orderBy: { updatedAt: "desc" },
    include: { _count: { select: { sections: true } } },
  });

  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Mes CVs</h1>
        <Link
          href="/editor/new"
          className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700"
        >
          + Nouveau CV
        </Link>
      </div>

      {resumes.length === 0 ? (
        <div className="mt-16 text-center text-gray-500">
          <p className="text-lg">Aucun CV pour le moment</p>
          <p className="mt-1 text-sm">Créez votre premier CV en cliquant sur le bouton ci-dessus.</p>
        </div>
      ) : (
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {resumes.map((resume) => (
            <Link
              key={resume.id}
              href={`/editor/${resume.id}`}
              className="group rounded-lg border border-gray-200 p-5 transition hover:border-gray-400 hover:shadow-sm"
            >
              <h2 className="font-semibold group-hover:underline">{resume.title}</h2>
              <p className="mt-1 text-xs text-gray-500">
                {resume._count.sections} sections · Template: {resume.templateId}
              </p>
              <p className="mt-1 text-xs text-gray-400">
                Modifié le {new Date(resume.updatedAt).toLocaleDateString("fr-FR")}
              </p>
              <div className="mt-2 flex gap-2">
                {resume.isPublic && (
                  <span className="rounded bg-green-50 px-2 py-0.5 text-xs text-green-700">Public</span>
                )}
                <span className="rounded bg-gray-50 px-2 py-0.5 text-xs text-gray-500">
                  {resume.views} vue{resume.views !== 1 ? "s" : ""}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
