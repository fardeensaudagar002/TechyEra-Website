import Image from "next/image";
import { clients } from "@/data/company";

/** Monochrome client/partner row. Add `logo` paths in data/company.ts to replace placeholders. */
export function ClientStrip() {
  return (
    <section aria-labelledby="clients-heading" className="border-y border-line bg-white">
      <div className="container-x grid gap-8 py-10 lg:grid-cols-[minmax(0,17rem)_1fr] lg:items-center lg:gap-12">
        <h2 id="clients-heading" className="text-[1.0625rem] font-semibold leading-snug text-ink">
          Technology solutions built around your business.
        </h2>
        <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-[10px] border border-line bg-line sm:grid-cols-3 lg:grid-cols-6">
          {clients.map((c, i) => (
            <li key={c.name} className="flex h-20 items-center justify-center bg-white px-4 grayscale">
              {c.logo ? (
                <Image src={c.logo} alt={c.name} width={120} height={40} className="h-8 w-auto opacity-70" />
              ) : (
                <span className="inline-flex items-center gap-2 text-[0.9375rem] font-semibold tracking-[-0.01em] text-[#8a94a8]">
                  <PlaceholderMark variant={i} />
                  {c.name}
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function PlaceholderMark({ variant }: { variant: number }) {
  const v = variant % 6;
  return (
    <svg viewBox="0 0 20 20" className="h-5 w-5" aria-hidden fill="none" stroke="currentColor" strokeWidth="1.8">
      {v === 0 && <circle cx="10" cy="10" r="7" />}
      {v === 1 && <rect x="3" y="3" width="14" height="14" rx="3" />}
      {v === 2 && <path d="M10 3 17 16H3Z" strokeLinejoin="round" />}
      {v === 3 && <path d="M3 10h14M10 3v14" strokeLinecap="round" />}
      {v === 4 && <path d="M10 2.5 17 7v6l-7 4.5L3 13V7Z" strokeLinejoin="round" />}
      {v === 5 && <><circle cx="7" cy="10" r="4" /><circle cx="13" cy="10" r="4" /></>}
    </svg>
  );
}
