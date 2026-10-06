import { MapPin } from "lucide-react";
import { site } from "@/data/site";

/** Shows a Google Maps embed when `site.contact.mapEmbedUrl` is set; otherwise a neutral placeholder. */
export function MapPlaceholder() {
  const src = site.contact.mapEmbedUrl;
  if (src) {
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
  return (
    <div className="relative h-[240px] overflow-hidden rounded-[16px] border border-line bg-white" role="img" aria-label="Office map — available once the office address is published">
      <svg aria-hidden className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" viewBox="0 0 400 240">
        <rect width="400" height="240" fill="#f4f6fa" />
        <g stroke="#e1e6ee" strokeWidth="10" fill="none" strokeLinecap="round">
          <path d="M-10 70 C 80 60, 140 110, 220 100 S 360 60, 420 80" />
          <path d="M60 -10 C 70 80, 40 160, 90 260" />
          <path d="M280 -10 C 260 90, 300 170, 270 260" />
          <path d="M-10 190 C 120 170, 260 210, 420 180" />
        </g>
        <g stroke="#cbd3df" strokeWidth="1" fill="none" strokeDasharray="3 5">
          <path d="M-10 130 H 420" /><path d="M180 -10 V 260" />
        </g>
      </svg>
      <div className="relative flex h-full flex-col items-center justify-center px-6 text-center">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-ink text-white shadow-[var(--shadow-lift)]"><MapPin aria-hidden className="h-6 w-6" /></span>
        <p className="mt-3 rounded-[8px] bg-white/90 px-3 py-1.5 text-sm font-semibold text-ink">{site.contact.country}</p>
        <p className="mt-1 rounded bg-white/80 px-2 text-[0.8125rem] text-muted">Office map will appear here once the address is published</p>
      </div>
    </div>
  );
}
