export type ProjectKind = "retail" | "pharma";

export type Project = {
  slug: string;
  name: string;
  industry: string;
  kind: ProjectKind;
  description: string;
  tagline: string;
  problem: string;
  solution: string;
  strategy: string;
  build: string;
  metrics: { label: string; value: string }[];
  hours: number;
  accent: string;
  bg: string;
  url: string;
  image: string;
};

import blushBeadsAsset from "@/assets/blush-beads.png";
import dayamedAsset from "@/assets/dayamed-home.png";

export const projects: Project[] = [
  {
    slug: "blush-and-beads",
    name: "Blush & Beads Creation",
    industry: "Handcrafted Jewelry",
    kind: "retail",
    description: "A boutique storefront for handwoven pearl and bead jewelry.",
    tagline: "One handcrafted world.",
    problem:
      "A growing handmade jewelry brand needed a storefront that felt as delicate and considered as the pieces themselves.",
    solution:
      "A soft, editorial e-commerce experience with cinematic product imagery, a calm palette, and a checkout flow tuned for first-time buyers.",
    strategy:
      "Lead with the craft. Let the photography breathe. Treat each collection like a small story, not a product grid.",
    build:
      "A responsive storefront with collection pages, product detail layouts, an About story, and contact — all built around the brand's blush and gold palette.",
    metrics: [
      { label: "Status", value: "Live" },
      { label: "Type", value: "Storefront" },
      { label: "Stack", value: "React" },
      { label: "Pages", value: "4" },
    ],
    hours: 40,
    accent: "#c9a26b",
    bg: "#1a0f12",
    url: "blushandbeads.com",
    image: blushBeadsAsset,
  },
  {
    slug: "dayamed-life-sciences",
    name: "DAYAMED LIFE SCIENCES",
    industry: "Pharmaceutical Website",
    kind: "pharma",
    description:
      "A modern pharmaceutical website designed to establish trust, highlight healthcare solutions, and create a premium digital presence through smooth interactions and clean visual storytelling.",
    tagline: "Advancing healthcare through trust.",
    problem:
      "A pharmaceutical distributor needed a digital presence that signaled trust, quality, and scale to hospitals, distributors, and healthcare partners across India.",
    solution:
      "A calm, clinical yet premium website with confident typography, considered whitespace, and smooth GSAP-driven storytelling across product, quality, and contact flows.",
    strategy:
      "Lead with credibility. Foreground GMP certification, 200+ formulations, and pan-India distribution before selling anything.",
    build:
      "Responsive marketing site with Home, About, Products, Quality, and Contact. Built with React, GSAP animations, and a healthcare-grade blue system.",
    metrics: [
      { label: "Industry", value: "Healthcare" },
      { label: "Services", value: "UI/UX + Dev" },
      { label: "Year", value: "2026" },
      { label: "Status", value: "Live" },
    ],
    hours: 90,
    accent: "#2563ff",
    bg: "#0a1633",
    url: "dayamed.com",
    image: dayamedAsset,
  },
];
