import {
  BookOpen, BrainCircuit, Cloud, CodeXml, Compass, Cpu, Database, Eye, Factory, Flag, FolderCheck,
  GraduationCap, Handshake, HeartPulse, House, Landmark, Layers, Maximize, MessageSquare, Plane,
  RadioTower, Repeat, Scale, ShieldCheck, ShoppingBag, Sparkles, Target, TrendingUp, Truck, Umbrella,
  Users, Workflow, Zap, type LucideIcon,
} from "lucide-react";
import type { IconName } from "@/types";

const map: Record<IconName, LucideIcon> = {
  code: CodeXml, database: Database, cloud: Cloud, brain: BrainCircuit, transform: Workflow,
  quality: ShieldCheck, bank: Landmark, health: HeartPulse, retail: ShoppingBag, factory: Factory,
  telecom: RadioTower, insurance: Umbrella, travel: Plane, logistics: Truck, tech: Cpu, energy: Zap,
  growth: TrendingUp, projects: FolderCheck, people: Users, stack: Layers, agile: Repeat, scale: Maximize,
  shield: ShieldCheck, chat: MessageSquare, handshake: Handshake, target: Target, spark: Sparkles,
  compass: Compass, home: House, mentor: GraduationCap, learn: BookOpen, integrity: Scale, flag: Flag, eye: Eye,
};

export function Icon({ name, className, strokeWidth = 1.75 }: { name: IconName; className?: string; strokeWidth?: number }) {
  const C = map[name];
  return <C aria-hidden="true" className={className} strokeWidth={strokeWidth} />;
}

/** Icon inside a soft accent tile — used on service, industry and benefit items. */
export function IconTile({ name, size = "md" }: { name: IconName; size?: "sm" | "md" }) {
  const box = size === "sm" ? "h-9 w-9 rounded-[8px]" : "h-11 w-11 rounded-[10px]";
  const ic = size === "sm" ? "h-[18px] w-[18px]" : "h-[22px] w-[22px]";
  return (
    <span className={`inline-flex shrink-0 items-center justify-center border border-accent-line/70 bg-accent-soft text-accent ${box}`}>
      <Icon name={name} className={ic} />
    </span>
  );
}
