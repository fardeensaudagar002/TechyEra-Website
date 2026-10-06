import Image from "next/image";
import { UserRound } from "lucide-react";
import { SocialIcon } from "@/components/ui/SocialIcons";
import type { Leader } from "@/types";

export function LeaderCard({ leader }: { leader: Leader }) {
  const pending = !leader.name;
  return (
    <article className="flex h-full flex-col rounded-[12px] border border-line bg-white p-6">
      <div className="relative aspect-[4/3] overflow-hidden rounded-[8px] bg-mist blueprint">
        {leader.photo ? (
          <Image src={leader.photo} alt={`Portrait of ${leader.name}`} fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover" />
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="inline-flex h-16 w-16 items-center justify-center rounded-full border border-accent-line bg-white text-accent">
              <UserRound aria-hidden className="h-8 w-8" strokeWidth={1.5} />
            </span>
          </div>
        )}
      </div>
      <h3 className="mt-5 text-[1.0625rem] leading-snug">{leader.role}</h3>
      <p className={pending ? "mt-1 text-[0.9375rem] text-muted" : "mt-1 text-[0.9375rem] font-medium text-ink-2"}>
        {pending ? "Profile to be published" : leader.name}
      </p>
      <p className="mt-3 flex-1 text-[0.9063rem] leading-relaxed text-muted">{leader.bio || leader.focus}</p>
      {leader.linkedin && (
        <a href={leader.linkedin} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-accent">
          <SocialIcon name="linkedin" className="h-4 w-4" /> LinkedIn<span className="sr-only"> profile of {leader.name} (opens in a new tab)</span>
        </a>
      )}
    </article>
  );
}
