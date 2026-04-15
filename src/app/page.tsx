import Link from "next/link";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const session = await auth();
  if (session?.user) redirect("/dashboard");

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <h1 className="text-5xl font-bold tracking-tight">
        Créez votre CV <span className="text-blue-600">en quelques minutes</span>
      </h1>
      <p className="mt-4 max-w-lg text-lg text-gray-500">
        Éditeur visuel, templates professionnels, export PDF, et une URL publique
        pour partager votre CV avec le monde.
      </p>
      <Link
        href="/login"
        className="mt-8 rounded-lg bg-gray-900 px-6 py-3 text-sm font-medium text-white hover:bg-gray-700"
      >
        Commencer gratuitement
      </Link>
    </main>
  );
}
