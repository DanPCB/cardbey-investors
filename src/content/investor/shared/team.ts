import type { TeamMember } from "../schemas/types";

/**
 * Placeholder-safe team registry.
 * Do not publish empty role cards without identity.
 */
export const investorTeam: TeamMember[] = [
  {
    id: "team-founder",
    fullName: "[FOUNDER FULL NAME REQUIRED]",
    role: { en: "Founder", vi: "Founder" },
    location: "[LOCATION REQUIRED]",
    biography: {
      en: "[FOUNDER BIO REQUIRED]",
      vi: "[CẦN TIỂU SỬ FOUNDER]",
    },
    expertise: [
      { en: "[RELEVANT EXPERTISE REQUIRED]", vi: "[CẦN CHUYÊN MÔN]" },
    ],
    achievements: [
      {
        en: "[PAST ACHIEVEMENT REQUIRED]",
        vi: "[CẦN THÀNH TỰU TRƯỚC ĐÂY]",
      },
    ],
    status: "placeholder",
    public: false,
  },
  {
    id: "team-additional",
    fullName: "[TEAM MEMBER NAME REQUIRED]",
    role: { en: "[ROLE REQUIRED]", vi: "[CẦN VAI TRÒ]" },
    biography: {
      en: "[TEAM BIO REQUIRED]",
      vi: "[CẦN TIỂU SỬ]",
    },
    expertise: [],
    achievements: [],
    status: "placeholder",
    public: false,
  },
];

export function getPublicTeam(list: TeamMember[] = investorTeam) {
  return list.filter(
    (m) =>
      m.public &&
      m.status !== "placeholder" &&
      m.status !== "confidential" &&
      m.status !== "not_for_public_site" &&
      !m.fullName.includes("[")
  );
}
