import type { LocaleCode } from "@/content/investor";

export type ClaimKind = "fact" | "projection" | "interpretation" | "thesis";

const LABELS: Record<ClaimKind, { en: string; vi: string }> = {
  fact: { en: "FACT", vi: "SỰ KIỆN" },
  projection: { en: "PROJECTION", vi: "DỰ BÁO" },
  interpretation: { en: "INTERPRETATION", vi: "DIỄN GIẢI" },
  thesis: { en: "CARDBEY THESIS", vi: "LUẬN ĐIỂM CARDBEY" },
};

export function ClaimLabel({ kind, locale }: { kind: ClaimKind; locale: LocaleCode }) {
  return (
    <span className={`iv3-claim-label iv3-claim-label--${kind}`}>
      {LABELS[kind][locale]}
    </span>
  );
}
