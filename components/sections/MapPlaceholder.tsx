import { site } from "@/data/site";

/** Shows a Google Maps embed when `site.contact.mapEmbedUrl` is set; renders nothing until then. */
export function MapPlaceholder() {
  const src = site.contact.mapEmbedUrl;
  if (!src) return null;
  return (
    <div className="overflow-hidden rounded-[16px] border border-line">
      <iframe
        title={`${site.name} office location`}
        src={src}
        className="block h-[280px] w-full"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </div>
  );
}
