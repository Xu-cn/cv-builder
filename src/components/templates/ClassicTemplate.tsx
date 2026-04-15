import type { ResumeMeta, ExperienceContent, EducationContent, SkillContent } from "@/types/resume";

interface TemplateProps {
  user: { name?: string | null; email?: string; image?: string | null };
  meta: ResumeMeta;
  sections: Array<{
    id: string;
    type: string;
    title: string;
    visible: boolean;
    items: Array<{ id: string; content: Record<string, unknown> }>;
  }>;
}

export function ClassicTemplate({ user, meta, sections }: TemplateProps) {
  return (
    <div className="cv-preview font-serif text-sm leading-relaxed text-gray-800">
      {/* Header */}
      <header className="mb-6 border-b-2 border-gray-800 pb-4 text-center">
        <h1 className="text-3xl font-bold tracking-tight">{user.name ?? "Votre Nom"}</h1>
        {meta.headline && <p className="mt-1 text-lg text-gray-600">{meta.headline}</p>}
        <div className="mt-2 flex flex-wrap justify-center gap-3 text-xs text-gray-500">
          {meta.phone && <span>{meta.phone}</span>}
          {user.email && <span>{user.email}</span>}
          {meta.location && <span>{meta.location}</span>}
          {meta.linkedin && <a href={meta.linkedin} className="underline">LinkedIn</a>}
          {meta.github && <a href={meta.github} className="underline">GitHub</a>}
          {meta.website && <a href={meta.website} className="underline">Site web</a>}
        </div>
      </header>

      {/* Summary */}
      {meta.summary && (
        <section className="mb-5">
          <p className="italic text-gray-600">{meta.summary}</p>
        </section>
      )}

      {/* Sections */}
      {sections.filter((s) => s.visible).map((section) => (
        <section key={section.id} className="mb-5">
          <h2 className="mb-2 border-b border-gray-300 pb-1 text-sm font-bold uppercase tracking-widest">
            {section.title}
          </h2>

          {section.type === "experience" &&
            section.items.map((item) => {
              const c = item.content as unknown as ExperienceContent;
              return (
                <div key={item.id} className="mb-3">
                  <div className="flex items-baseline justify-between">
                    <h3 className="font-semibold">{c.role}</h3>
                    <span className="text-xs text-gray-500">
                      {c.startDate} – {c.current ? "Présent" : c.endDate}
                    </span>
                  </div>
                  <p className="text-gray-600">{c.company}{c.location ? ` · ${c.location}` : ""}</p>
                  {c.bullets?.length > 0 && (
                    <ul className="mt-1 list-disc pl-5 text-gray-700">
                      {c.bullets.map((b, i) => <li key={i}>{b}</li>)}
                    </ul>
                  )}
                </div>
              );
            })}

          {section.type === "education" &&
            section.items.map((item) => {
              const c = item.content as unknown as EducationContent;
              return (
                <div key={item.id} className="mb-2">
                  <div className="flex items-baseline justify-between">
                    <h3 className="font-semibold">{c.degree}{c.field ? ` – ${c.field}` : ""}</h3>
                    <span className="text-xs text-gray-500">{c.startDate} – {c.endDate}</span>
                  </div>
                  <p className="text-gray-600">{c.school}</p>
                </div>
              );
            })}

          {section.type === "skills" && (
            <div className="flex flex-wrap gap-2">
              {section.items.map((item) => {
                const c = item.content as unknown as SkillContent;
                return (
                  <span key={item.id} className="rounded bg-gray-100 px-2 py-1 text-xs">
                    {c.name}
                  </span>
                );
              })}
            </div>
          )}
        </section>
      ))}
    </div>
  );
}
