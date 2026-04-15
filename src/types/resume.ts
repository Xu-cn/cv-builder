// ─── Resume data types (matching Prisma JSON fields) ───

export interface ResumeMeta {
  headline?: string;
  summary?: string;
  phone?: string;
  location?: string;
  linkedin?: string;
  github?: string;
  website?: string;
}

export interface ExperienceContent {
  company: string;
  role: string;
  startDate: string;
  endDate?: string;
  current?: boolean;
  location?: string;
  bullets: string[];
}

export interface EducationContent {
  school: string;
  degree: string;
  field?: string;
  startDate: string;
  endDate?: string;
  gpa?: string;
  description?: string;
}

export interface SkillContent {
  name: string;
  level?: "beginner" | "intermediate" | "advanced" | "expert";
}

export interface LanguageContent {
  name: string;
  level?: string;
}

export interface ProjectContent {
  name: string;
  url?: string;
  description?: string;
  tech?: string[];
}

export type SectionType =
  | "experience"
  | "education"
  | "skills"
  | "languages"
  | "projects"
  | "certifications"
  | "custom";

export type ItemContent =
  | ExperienceContent
  | EducationContent
  | SkillContent
  | LanguageContent
  | ProjectContent
  | Record<string, unknown>;

// ─── API payloads ──────────────────────────────────────

export interface CreateResumePayload {
  title: string;
  templateId?: string;
}

export interface UpdateResumePayload {
  title?: string;
  templateId?: string;
  isPublic?: boolean;
  meta?: ResumeMeta;
}

export interface ReorderPayload {
  id: string;
  order: number;
}
