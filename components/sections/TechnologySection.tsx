import { Icon } from "@/components/ui/Icon";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { technologies } from "@/data/company";

export function TechnologyBadge({ name }: { name: string }) {
  return (
    <span className="inline-flex items-center rounded-[7px] border border-line bg-white px-3 py-1.5 text-[0.9063rem] font-medium text-ink transition-colors hover:border-accent-line hover:text-accent-strong">
      {name}
    </span>
  );
}

export function TechnologySection() {
  return (
    <section className="section bg-mist" aria-labelledby="tech-heading">
      <div className="container-x">
        <SectionHeader
          id="tech-heading"
          title="Built With Modern Technology"
          intro="We pick proven, well-supported tools for each layer of the stack — and stay pragmatic about fitting in with what you already run."
        />
        <div className="overflow-hidden rounded-[12px] border border-line bg-white">
          {technologies.map((g) => (
            <div key={g.category} className="grid gap-4 border-b border-line px-6 py-5 last:border-0 md:grid-cols-[13rem_1fr] md:items-center md:px-8">
              <h3 className="inline-flex items-center gap-3 text-base">
                <Icon name={g.icon} className="h-5 w-5 text-accent" />
                {g.category}
              </h3>
              <ul className="flex flex-wrap gap-2">
                {g.items.map((t) => <li key={t}><TechnologyBadge name={t} /></li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
