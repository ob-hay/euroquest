import { generateDynamicMonths } from "@/functions";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";


export const months = generateDynamicMonths();
export const popularCategories = [
  {
    slug: "leadership-strategic-management",
    name: "Leadership & Strategic Management",
  },
  {
    slug: "financial-management-investment-analysis",
    name: "Financial Management & Investment Analysis",
  },
  {
    slug: "project-management-planning",
    name: "Project Management & Planning",
  },
  {
    slug: "human-resources-management-training",
    name: "Human Resources Management & Training",
  },
  {
    slug: "public-relations-corporate-communication",
    name: "Public Relations & Corporate Communication",
  },
  {
    slug: "data-analytics-ai-decision-making",
    name: "Data Analytics, AI & Decision-Making",
  },
];

export const quickAccessLinks = [
  { href: "/", label: "Home" },
  { href: "/training-courses", label: "Categories" },
  { href: "/about", label: "About" },
  { href: "/blogs", label: "Blogs" },
  { href: "/sitemap", label: "Sitemap" },
  { href: "/contact", label: "Contact Us" },
  { href: "/terms", label: "Terms & Conditions" },
  { href: "/privacy-policy", label: "Privacy Policy" },
];

export const socialLinks = [
  { href: "#", Icon: FaFacebookF },
  { href: "#", Icon: FaInstagram },
  { href: "#", Icon: FaXTwitter  },
  { href: "#", Icon: FaLinkedinIn },
];

export const orderedMonths = generateDynamicMonths();

export const durationOptions = [
  { value: 5, label: "1 Week" },
  { value: 10, label: "2 Weeks" },
];

// API Endpoints
export const API_ENDPOINTS = {
  CATEGORIES: '/training-courses',
  COURSES: '/courses',
  CITIES: '/training-cities',
  UPCOMING_COURSES: '/get-upcoming-courses',
  BLOGS: '/blogs',
  SITEMAP: '/sitemap',
} as const;

export const services = [
  {
    icon: "https://euroqst.com/assets/images/service-icon3.svg",
    title: "In-house Courses",
    description: "EuroQuest International offers offer customized training courses within the organization."
  },
  {
    icon: "https://euroqst.com/assets/images/service-icon2.svg",
    title: "Classroom Courses", 
    description: "EuroQuest International offer training courses held in carefully selected locations in cities and capitals worldwide"
  },
  {
    icon: "https://euroqst.com/assets/images/service-icon1.svg",
    title: "Online Courses",
    description: "EuroQuest International offers offer flexible training courses delivered remotely."
  }
];