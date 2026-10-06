import type { Service } from "@/types";

export const services: Service[] = [
  {
    slug: "software-engineering",
    title: "Software Engineering",
    shortTitle: "Software Engineering",
    icon: "code",
    summary:
      "Custom software applications, APIs, microservices, enterprise platforms, modernization and application development.",
    description:
      "We design and build software that carries real business load — customer-facing products, internal platforms and the APIs that connect them. Our engineers work from a clear architecture, ship in short increments and leave behind code your own teams can maintain.",
    capabilities: [
      "Custom Software Development",
      "Web Application Development",
      "Mobile Application Development",
      "Enterprise Application Development",
      "API Development",
      "Microservices",
      "Application Modernization",
      "Legacy Modernization",
      "Software Architecture",
    ],
    technologies: ["Java", "Spring Boot", "Node.js", ".NET", "Python", "React", "Angular", "Next.js", "PostgreSQL", "Kafka"],
    benefits: [
      { title: "Faster releases", text: "Modular services and automated pipelines let teams ship features without waiting on a monolith." },
      { title: "Lower maintenance cost", text: "Clean architecture, test coverage and documentation reduce the cost of every future change." },
      { title: "Room to grow", text: "Systems designed for horizontal scale handle new markets, users and integrations." },
    ],
  },
  {
    slug: "data-analytics",
    title: "Data & Analytics",
    shortTitle: "Data & Analytics",
    icon: "database",
    summary:
      "Data platforms, data engineering, analytics, business intelligence and data-driven decision making.",
    description:
      "We turn scattered operational data into a dependable platform: governed pipelines, a single source of truth and reporting that business teams trust. The goal is simple — decisions made on current, accurate numbers.",
    capabilities: [
      "Data Engineering",
      "Data Warehousing",
      "Data Lakes",
      "ETL/ELT",
      "Business Intelligence",
      "Data Analytics",
      "Data Visualization",
      "Data Governance",
      "Real-Time Data Processing",
    ],
    technologies: ["SQL", "PostgreSQL", "Snowflake", "Databricks", "Apache Spark", "dbt", "Airflow", "Power BI", "Tableau", "Kafka"],
    benefits: [
      { title: "One version of the truth", text: "Consistent definitions and governed models end the debate over whose numbers are right." },
      { title: "Fresher insight", text: "Automated and streaming pipelines replace overnight batch jobs and manual spreadsheets." },
      { title: "AI-ready foundations", text: "Clean, well-modelled data is the prerequisite for every machine learning initiative." },
    ],
  },
  {
    slug: "cloud-devops",
    title: "Cloud & DevOps",
    shortTitle: "Cloud & DevOps",
    icon: "cloud",
    summary:
      "Cloud migration, cloud-native applications, DevOps, CI/CD, infrastructure automation and platform engineering.",
    description:
      "We help organizations move to the cloud deliberately — assessing what to migrate, re-platform or rebuild — and then run it well, with infrastructure as code, automated delivery and cost visibility from day one.",
    capabilities: [
      "Cloud Consulting",
      "Cloud Migration",
      "Cloud Architecture",
      "Cloud-Native Development",
      "DevOps",
      "CI/CD",
      "Infrastructure as Code",
      "Kubernetes",
      "Cloud Security",
    ],
    technologies: ["AWS", "Microsoft Azure", "Google Cloud", "Docker", "Kubernetes", "Terraform", "GitHub Actions", "Jenkins", "Helm", "Prometheus"],
    benefits: [
      { title: "Predictable cost", text: "Right-sized infrastructure, tagging and FinOps practices keep cloud spend visible and controlled." },
      { title: "Reliable releases", text: "Repeatable pipelines and environments remove the risk from deployment day." },
      { title: "Resilience built in", text: "Multi-zone design, automated recovery and observability keep services available." },
    ],
  },
  {
    slug: "ai-machine-learning",
    title: "AI & Machine Learning",
    shortTitle: "AI & ML",
    icon: "brain",
    summary:
      "AI solutions, machine learning, generative AI, intelligent automation and predictive analytics.",
    description:
      "We build AI that earns its place in production: use cases chosen for measurable value, models grounded in your own data, and the guardrails, evaluation and monitoring that enterprise use demands.",
    capabilities: [
      "Machine Learning",
      "Generative AI",
      "LLM Applications",
      "AI Chatbots",
      "Predictive Analytics",
      "Intelligent Automation",
      "AI Consulting",
      "Recommendation Systems",
    ],
    technologies: ["Python", "PyTorch", "scikit-learn", "LangChain", "Vector databases", "MLflow", "Azure OpenAI", "Amazon Bedrock", "Vertex AI"],
    benefits: [
      { title: "Value-first use cases", text: "We prioritise problems where AI changes a business metric, not just a demo." },
      { title: "Trustworthy output", text: "Retrieval grounding, evaluation suites and human review keep results accurate and explainable." },
      { title: "Production, not pilots", text: "MLOps practices take models from notebook to monitored, versioned service." },
    ],
  },
  {
    slug: "digital-transformation",
    title: "Digital Transformation",
    shortTitle: "Digital Transformation",
    icon: "transform",
    summary:
      "Technology modernization, process transformation, enterprise architecture and digital strategy.",
    description:
      "We connect business strategy to the technology roadmap that delivers it. That means mapping how work actually flows today, designing the target architecture, and sequencing change so value arrives early and risk stays contained.",
    capabilities: [
      "Digital Strategy",
      "Enterprise Architecture",
      "Process Automation",
      "Technology Modernization",
      "Platform Engineering",
      "API Strategy",
      "System Integration",
    ],
    technologies: ["TOGAF-aligned methods", "BPMN", "MuleSoft", "Apache Camel", "REST & GraphQL", "Event-driven architecture", "Low-code platforms"],
    benefits: [
      { title: "Clear roadmap", text: "A phased plan that ties every technology investment to a business outcome." },
      { title: "Connected systems", text: "API-led integration removes swivel-chair work between applications." },
      { title: "Lasting capability", text: "We build your team's skills alongside the platform so change continues after we leave." },
    ],
  },
  {
    slug: "quality-engineering",
    title: "Quality Engineering",
    shortTitle: "Quality Engineering",
    icon: "quality",
    summary:
      "Software testing, automation, performance engineering, security testing and quality assurance.",
    description:
      "We treat quality as an engineering discipline, not a final gate. Automated suites run with every change, performance is measured before customers feel it, and security checks are part of the pipeline.",
    capabilities: [
      "Functional Testing",
      "Automation Testing",
      "API Testing",
      "Performance Testing",
      "Security Testing",
      "Continuous Testing",
      "Quality Engineering",
    ],
    technologies: ["Selenium", "Playwright", "Cypress", "REST Assured", "Postman", "JMeter", "k6", "OWASP ZAP", "SonarQube"],
    benefits: [
      { title: "Fewer production defects", text: "Issues are caught at the pull request, where they are cheapest to fix." },
      { title: "Confident releases", text: "Regression suites that run in minutes let teams release more often." },
      { title: "Known limits", text: "Load and stress testing reveal capacity limits before peak traffic does." },
    ],
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
