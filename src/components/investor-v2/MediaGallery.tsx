import { t, type LocaleCode, type ProductMediaAsset } from "@/content/investor";
import { getPublicMedia, shouldShowMediaGallery } from "@/content/investor/shared/media";
import { trackInvestorEvent } from "@/lib/analytics";

export function MediaGallery({
  media,
  locale,
  isDev,
}: {
  media: ProductMediaAsset[];
  locale: LocaleCode;
  isDev: boolean;
}) {
  const publicItems = getPublicMedia(media);
  if (!shouldShowMediaGallery(media)) {
    if (isDev) {
      return (
        <p className="iv2-placeholder-note" data-media-fallback="dev">
          {locale === "vi"
            ? `${media.length} mục media đang chờ duyệt/asset — ẩn ở production.`
            : `${media.length} media items awaiting approval/assets — hidden in production.`}
        </p>
      );
    }
    return null;
  }

  return (
    <div className="iv2-media-gallery">
      {publicItems.map((item) => (
        <figure
          key={item.id}
          className={`iv2-media-frame iv2-media-frame--${item.displayMode || "browser-frame"}`}
        >
          <img
            src={item.assetPath}
            alt={t(item.altText, locale)}
            loading="lazy"
            width={960}
            height={600}
            onLoad={() =>
              trackInvestorEvent("product_proof_opened", {
                mediaId: item.id,
                kind: "media_view",
              })
            }
          />
          <figcaption>
            <strong>{t(item.title, locale)}</strong>
            <span>{t(item.caption, locale)}</span>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
