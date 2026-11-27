/**
 * Single source of truth for all site content.
 * Edit this file when the CV changes. Components only decide how it is displayed.
 */

export type Role = {
  id: string;
  org: string;
  title: string;
  /** Display range, e.g. "03/2024 — Present" */
  period: string;
  start: string; // YYYY-MM, used for the compact year label
  current?: boolean;
  kind: "work" | "recognition";
  summary: string;
  highlights: string[];
  tags: string[];
};

type MetricBase = {
  label: string;
  detail: string;
};

/** A metric is either an animated number or a fixed piece of text, never neither. */
export type Metric =
  | (MetricBase & { value: number; prefix?: string; suffix?: string })
  | (MetricBase & { display: string });

export type PortfolioItem = {
  id: string;
  title: string;
  description: string;
  tag: string;
  /** Add a URL and the card becomes a live link. */
  href?: string;
};

export type Social = {
  label: string;
  /** Leave empty to keep the link hidden. */
  href: string;
};

/** One line of the "pipeline run" panel in the hero. */
export type RunLogRow = {
  step: string;
  text: string;
  note?: string;
  done: boolean;
};

/** Heading text for a section. `muted` is the greyed-out second half of the title. */
export type SectionCopy = {
  label: string;
  title: string;
  muted?: string;
  intro?: string;
};

const metrics: Metric[] = [
  {
    value: 80,
    prefix: "> ",
    suffix: "%",
    label: "Faster pipelines",
    detail:
      "End-to-end runtime cut by migrating client pipelines from SAS to Databricks (PySpark).",
  },
  {
    value: 40,
    suffix: "%",
    label: "Lower cloud spend",
    detail: "Monthly GCP cost reduced by navigating and optimising legacy systems.",
  },
  {
    value: 90,
    suffix: "%",
    label: "Less manual reporting",
    detail: "Traders' reporting workload removed with a Python report automation application.",
  },
  {
    display: "TB+",
    label: "Multi-terabyte scale",
    detail: "Multi-terabyte datasets processed through a consolidated GCP data architecture.",
  },
];

/** Keep the figures here in step with `metrics` above. */
const runLog: RunLogRow[] = [
  { done: true, step: "extract", text: "analytics · SCMP, Dentsu Aegis" },
  { done: true, step: "transform", text: "SAS → Databricks (PySpark)", note: "-80% runtime" },
  { done: true, step: "optimise", text: "GCP monthly spend", note: "-40% cost" },
  { done: false, step: "load", text: "data engineer", note: "running" },
];

const portfolio: PortfolioItem[] = [
  {
    id: "case-studies",
    title: "Pipeline case studies",
    description:
      "Deep dives into migrations, architecture decisions and the cost and runtime numbers behind them.",
    tag: "Case studies",
  },
  {
    id: "writing",
    title: "Notes from the warehouse",
    description: "Short, practical writing on data modelling, orchestration and cloud cost.",
    tag: "Writing",
  },
  {
    id: "open-source",
    title: "Open-source and tooling",
    description: "Reusable pipeline templates, CI/CD patterns and utilities.",
    tag: "Code",
  },
];

/** Extra links shown under the main contact button. */
const socials: Social[] = [{ label: "GitHub", href: "" }];

export const profile = {
  name: "Avery Chan",
  firstName: "Avery",
  lastName: "Chan",
  title: "Data Engineer",
  location: "Hong Kong",
  timezone: "UTC+8",
  tagline: "I turn tangled legacy pipelines into fast, governed, cost-efficient data architectures to support business objectives.",
  description:
    "Avery Chan is a Data Engineer specialising in cloud data architecture, pipeline migration and cost optimisation on on-premise and cloud platforms.",
  status: "Open to Senior Data Engineer roles",
  languages: ["English", "Chinese"],

  about: {
    paragraphs: [
      "I started in analytics, building dashboards and automating reports for publishers, advertisers and sales teams. That work taught me what the business actually asks of its data, and what breaks when pipelines are an afterthought.",
      "Today I design and build the architecture underneath: dimensional models, standardised pipelines and orchestration across on-premise and cloud platforms. I have worked directly with business teams and clients in banking, insurance and retail to turn requirements into a target-state architecture, then execute it.",
      "My focus is on supporting business objectives with data architectures that are fast, governed, cost-efficient and easy to maintain.",
    ],
    focus: [
      "Data architecture",
      "Data governance",
      "Legacy-to-lakehouse migration",
      "Performance and cost optimisation",
      "Client-facing delivery",
    ],
  },

  metrics,
  runLog,

  roles: [
    {
      id: "hotmob",
      org: "Hotmob Limited",
      title: "Data Engineer",
      period: "03/2024 — Present",
      start: "2024-03",
      current: true,
      kind: "work",
      summary:
        "Design and build data pipelines for internal and external projects, from requirements through to production.",
      highlights: [
        "Worked directly with business teams and clients across banks and insurance to gather requirements and shape target-state data architecture roadmaps aligned with corporate goals.",
        "Migrated client pipelines from SAS to Databricks (PySpark), reducing end-to-end runtime by over 80%.",
        "Led GCP cost optimisation by navigating legacy systems, cutting monthly cloud costs by 40%.",
        "Consolidated disparate pipelines into one coherent GCP architecture, from dimensional models to standardised pipelines for multi-terabyte datasets. Delivered with Docker, Airflow and GitHub Actions CI/CD, and monitored through centralised logging.",
      ],
      tags: ["Databricks", "PySpark", "GCP", "Airflow", "Docker", "GitHub Actions"],
    },
    {
      id: "luxury-retail",
      org: "Confidential Client — Major Luxury Retail",
      title: "Data Engineer",
      period: "04/2023 — 08/2023",
      start: "2023-04",
      kind: "work",
      summary: "Designed and developed a data workspace, and handled data monitoring and patching.",
      highlights: [
        "Architected and delivered a scalable Azure data ecosystem on a Medallion architecture, integrating complex Salesforce and Heroku datasets via Azure Data Factory within a 3-month timeline.",
        "Designed logical and physical data models in Azure SQL to streamline reporting and analytics on CRM data.",
        "Built reconciliation reports in Power Query to assure data quality after the Salesforce migration.",
        "Wrote technical specifications and user manuals to hand off to infrastructure and analytics teams.",
      ],
      tags: ["Azure Data Factory", "Azure SQL", "Medallion", "Salesforce"],
    },
    {
      id: "un-hackathon",
      org: "United Nations, Hackmakers",
      title: "World Innovation Day Hackathon 2021 — Winning team",
      period: "05/2021",
      start: "2021-05",
      kind: "recognition",
      summary:
        "Built a solution that matches working adults with learning companions who share their aspirations.",
      highlights: [
        "Collaborated with teammates from over 2,000 participants worldwide, from ideation through prototyping to pitching. One of six finalist teams.",
        "Used the momentum to pivot into data engineering: full-stack web development, dimensional modelling and database design, plus AWS Solutions Architect certification.",
      ],
      tags: ["Product", "Prototyping", "Pitching"],
    },
    {
      id: "scmp",
      org: "South China Morning Post Publishing Limited",
      title: "Data Analyst",
      period: "06/2019 — 05/2021",
      start: "2019-06",
      kind: "work",
      summary: "Generated and communicated data insights on online content publishing.",
      highlights: [
        "Managed data pipelines and delivered reporting with Airflow, Google BigQuery, Tableau and Google Data Studio.",
        "Built Tableau dashboards for the sales team to spot market trends and high-potential clients.",
        "Built KPI dashboards for editorial across articles, social posts and video.",
        "Presented insights and trained teams on in-house data products.",
      ],
      tags: ["BigQuery", "Airflow", "Tableau", "Data Studio"],
    },
    {
      id: "dentsu",
      org: "Dentsu Aegis Network",
      title: "Data Analyst",
      period: "07/2018 — 06/2019",
      start: "2018-07",
      kind: "work",
      summary: "Managed, analysed and modelled data for programmatic advertising.",
      highlights: [
        "Ran Airflow pipelines on Google Cloud, sourcing data from SSP, DSP and Google Analytics.",
        "Designed and built a Python report automation application that cut programmatic traders' reporting workload by 90%.",
        "Optimised campaigns using past conversions and audience data, and implemented GTM and DMP site tagging for more granular retargeting.",
      ],
      tags: ["Python", "Airflow", "Google Cloud", "GTM"],
    },
    {
      id: "minecos",
      org: "MineCos Limited",
      title: "Intern Research Analyst",
      period: "06/2017 — 09/2017",
      start: "2017-06",
      kind: "work",
      summary: "Independently performed data cleansing, modelling and model evaluation.",
      highlights: [
        "Ran ETL on a bilingual cosmetics corpus with 30+ dimensions using VBA and Python.",
        "Trained topic models that rate similarity between cosmetic products with accuracy above 80%.",
      ],
      tags: ["Python", "VBA", "NLP"],
    },
    {
      id: "cyberport",
      org: "Cyberport University Partnership Programme",
      title: "Representative of City University of Hong Kong — Winning team",
      period: "05/2017 — 11/2017",
      start: "2017-05",
      kind: "recognition",
      summary: "Created Fintech solutions tackling marketing pain points.",
      highlights: [
        "Applied data analytics, machine learning and mobile application development.",
        "Trained alongside Stanford University and leading Fintech firms to build industry-ready business plans.",
      ],
      tags: ["Fintech", "Machine learning", "Mobile"],
    },
  ] satisfies Role[],

  stack: [
    {
      group: "Languages",
      items: ["SQL", "Python", "PySpark"],
    },
    {
      group: "Platforms",
      items: ["Databricks", "GCP", "Azure Data Factory", "BigQuery"],
    },
    {
      group: "Orchestration and delivery",
      items: ["Airflow", "Docker", "GitHub Actions", "Compute Engine"],
    },
  ],

  skills: [
    "ETL / ELT",
    "Data warehousing",
    "Data migration",
    "Cloud data architecture",
    "Performance and cost optimisation",
  ],

  credentials: [
    {
      issuer: "Microsoft",
      title: "Data Engineering on Microsoft Azure",
      date: "02/2024",
    },
    {
      issuer: "Amazon Web Services",
      title: "AWS Certified Solutions Architect — Associate",
      date: "02/2023",
    },
    {
      issuer: "SAS",
      title: "SAS Certified Base Programmer for SAS 9",
      date: "04/2018",
    },
  ],

  education: {
    school: "City University of Hong Kong",
    degree: "Bachelor of Business Administration in Business Analysis",
    minor: "Minor in Computer Science",
    period: "09/2016 — 07/2018",
  },

  portfolio,
  socials,

  /** Where the contact section sends visitors. */
  contact: {
    label: "Connect on LinkedIn",
    href: "http://linkedin.com/p/avery-chan",
  },

  sections: {
    about: {
      label: "About",
      title:
        "Data analyst turned data engineer, with a bias for systems that are simple to run and cheap to keep.",
    },
    impact: {
      label: "Impact",
      title: "Measured in runtime, cost",
      muted: "and hours returned.",
    },
    journey: {
      label: "Career journey",
      title: "From reporting on the data",
      muted: "to engineering the platform.",
      intro:
        "Across advertising, publishing, retail and financial services, moving steadily closer to the infrastructure.",
    },
    stack: {
      label: "Stack and skills",
      title: "The toolchain,",
      muted: "and what I use it for.",
    },
    credentials: {
      label: "Credentials",
      title: "Certified across",
      muted: "Azure, AWS and SAS.",
    },
    portfolio: {
      label: "Portfolio",
      title: "Selected work,",
      muted: "landing soon.",
      intro:
        "Project write-ups, writing and tooling are on the way. Each slot below becomes a live link as it ships.",
    },
    contact: {
      label: "Contact",
      title: "Have a data platform to",
      muted: "build, fix or migrate?",
    },
  } satisfies Record<string, SectionCopy>,
};

export type Profile = typeof profile;
