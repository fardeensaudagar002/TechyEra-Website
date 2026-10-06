import type { Industry } from "@/types";

export const industries: Industry[] = [
  {
    slug: "banking-financial-services",
    title: "Banking & Financial Services",
    shortTitle: "BFSI",
    icon: "bank",
    summary: "Digital banking, payment platforms, risk analytics, data platforms and financial applications.",
    description:
      "Financial institutions need to launch digital products quickly while meeting strict regulatory, security and uptime expectations. We engineer platforms that balance both — modern customer journeys on top of auditable, resilient cores.",
    focusAreas: ["Digital banking channels", "Payment and lending platforms", "Risk and fraud analytics", "Regulatory reporting data platforms", "Core system integration"],
    relatedServices: ["software-engineering", "data-analytics", "cloud-devops"],
  },
  {
    slug: "healthcare",
    title: "Healthcare",
    shortTitle: "Healthcare",
    icon: "health",
    summary: "Healthcare platforms, patient applications, analytics and secure digital solutions.",
    description:
      "Healthcare organizations handle sensitive data across many disconnected systems. We build secure, interoperable applications that give clinicians and patients the right information at the right time, with privacy designed in.",
    focusAreas: ["Patient engagement apps", "Clinical data integration", "Healthcare analytics", "Telehealth platforms", "Privacy and access controls"],
    relatedServices: ["software-engineering", "data-analytics", "quality-engineering"],
  },
  {
    slug: "retail-ecommerce",
    title: "Retail & E-commerce",
    shortTitle: "Retail",
    icon: "retail",
    summary: "Customer experience, commerce platforms, recommendation systems and analytics.",
    description:
      "Retailers compete on experience and speed. We build commerce platforms that stay fast at peak, personalise with real behavioural data and connect online and store operations into one view of the customer.",
    focusAreas: ["Headless commerce", "Personalisation and recommendations", "Inventory and order visibility", "Customer data platforms", "Peak-load performance"],
    relatedServices: ["software-engineering", "ai-machine-learning", "data-analytics"],
  },
  {
    slug: "manufacturing",
    title: "Manufacturing",
    shortTitle: "Manufacturing",
    icon: "factory",
    summary: "IoT, automation, supply-chain technology, analytics and smart manufacturing.",
    description:
      "Manufacturers are connecting the shop floor to the enterprise. We help bring machine, quality and supply data together so plants can predict issues, reduce waste and plan with confidence.",
    focusAreas: ["IoT data ingestion", "Predictive maintenance", "Quality analytics", "Supply-chain visibility", "ERP and MES integration"],
    relatedServices: ["data-analytics", "ai-machine-learning", "digital-transformation"],
  },
  {
    slug: "insurance",
    title: "Insurance",
    shortTitle: "Insurance",
    icon: "insurance",
    summary: "Insurance platforms, analytics, automation and digital customer experiences.",
    description:
      "Insurers want faster quotes, simpler claims and sharper pricing. We modernise policy and claims workflows, automate document-heavy processes and build the analytics behind better underwriting.",
    focusAreas: ["Policy administration modernization", "Claims automation", "Underwriting analytics", "Document intelligence", "Agent and customer portals"],
    relatedServices: ["digital-transformation", "ai-machine-learning", "software-engineering"],
  },
  {
    slug: "telecom",
    title: "Telecom",
    shortTitle: "Telecom",
    icon: "telecom",
    summary: "Network analytics, customer platforms, automation and digital transformation.",
    description:
      "Telecom operators run some of the largest data volumes in any industry. We build the pipelines, analytics and self-service platforms that improve network insight, reduce churn and automate operations.",
    focusAreas: ["Network and usage analytics", "Customer self-service platforms", "Churn prediction", "OSS/BSS integration", "Operations automation"],
    relatedServices: ["data-analytics", "cloud-devops", "digital-transformation"],
  },
  {
    slug: "travel-hospitality",
    title: "Travel & Hospitality",
    shortTitle: "Travel",
    icon: "travel",
    summary: "Booking systems, customer experience, analytics and digital platforms.",
    description:
      "Travel businesses depend on real-time availability and seamless journeys. We build booking and guest platforms that integrate with distribution partners and stay responsive when demand spikes.",
    focusAreas: ["Booking and reservation systems", "Distribution and partner APIs", "Guest experience apps", "Revenue analytics", "Loyalty platforms"],
    relatedServices: ["software-engineering", "cloud-devops", "data-analytics"],
  },
  {
    slug: "logistics-transportation",
    title: "Logistics & Transportation",
    shortTitle: "Logistics",
    icon: "logistics",
    summary: "Fleet technology, tracking, optimization and supply-chain analytics.",
    description:
      "Logistics runs on visibility and timing. We build tracking, routing and warehouse systems that give operators and customers a live picture of every shipment, and analytics that find cost in the network.",
    focusAreas: ["Fleet and shipment tracking", "Route optimization", "Warehouse systems", "Customer tracking portals", "Supply-chain analytics"],
    relatedServices: ["software-engineering", "data-analytics", "ai-machine-learning"],
  },
  {
    slug: "technology",
    title: "Technology",
    shortTitle: "Technology",
    icon: "tech",
    summary: "Product engineering, SaaS platforms, scaling and engineering capacity for tech companies.",
    description:
      "Software and SaaS companies need engineering capacity that works like their own team. We plug into product roadmaps to build features, harden platforms for scale and modernise architecture as the business grows.",
    focusAreas: ["SaaS product engineering", "Multi-tenant architecture", "Platform reliability", "Developer tooling", "AI feature development"],
    relatedServices: ["software-engineering", "cloud-devops", "quality-engineering"],
  },
  {
    slug: "energy-utilities",
    title: "Energy & Utilities",
    shortTitle: "Energy",
    icon: "energy",
    summary: "Asset analytics, smart metering data, field operations and customer platforms.",
    description:
      "Energy and utility providers manage distributed assets and growing volumes of meter data. We build data platforms and field applications that support reliability, forecasting and better customer service.",
    focusAreas: ["Smart meter data platforms", "Asset performance analytics", "Demand forecasting", "Field workforce apps", "Customer billing portals"],
    relatedServices: ["data-analytics", "ai-machine-learning", "software-engineering"],
  },
];

export const getIndustry = (slug: string) => industries.find((i) => i.slug === slug);
