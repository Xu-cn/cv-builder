import type { Metadata } from "next";
import { CVPageClient } from "./CVPageClient";

export const metadata: Metadata = {
  title: "Xu Chen — Ingénieur en Système d'Informations et Cybersécurité",
  description:
    "Ingénieur généraliste ECE Paris, passionné par la tech, les marchés financiers et le sport.",
  openGraph: {
    title: "Xu Chen — Ingénieur en Système d'Information et Cybersécurité",
    description: "Curieux par nature — code, hardware, marchés, sport.",
    type: "profile",
  },
};

export default function CVPage() {
  return <CVPageClient />;
}
