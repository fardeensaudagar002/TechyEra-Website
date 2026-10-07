import Image from "next/image";
import { clients } from "@/data/company";

/** Monochrome client/partner row. Hidden until real clients are added in data/company.ts. */
export function ClientStrip() {
  if (!clients.length) return null;
  return (
    <section aria-labelledby="clients-heading" className="border-y border-line bg-white">
      <div className="container-x grid gap-8 py-10 lg:grid-cols-[minmax(0,17rem)_1fr] lg:items-center lg:gap-12">
        <h2 id="clients-heading" className="text-[1.0625rem] font-semibold leading-snug text-ink">
          Technology solutions built around your business.
        </h2>
        <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-[10px] border border-line bg-line sm:grid-cols-3 lg:grid-cols-6">
          {clients.map((c) => (
            <li key={c.name} className="flex h-20 items-center justify-center bg-white px-4 grayscale">
              {c.logo ? (
                <Image src={c.logo} alt={c.name} width={120} height={40} className="h-8 w-auto opacity-70" />
              ) : (
                <span className="text-[0.9375rem] font-semibold tracking-[-0.01em] text-[#8a94a8]">{c.name}</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
