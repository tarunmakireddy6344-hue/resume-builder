import ModernTemplate from './ModernTemplate';
import ClassicTemplate from './ClassicTemplate';
import MinimalTemplate from './MinimalTemplate';
import CreativeTemplate from './CreativeTemplate';
import ExecutiveTemplate from './ExecutiveTemplate';
import AcademicTemplate from './AcademicTemplate';
import SignatureTemplate from './SignatureTemplate';
import StartupTemplate from './StartupTemplate';
import EliteTemplate from './EliteTemplate';
import FunctionalTemplate from './FunctionalTemplate';

export const TEMPLATES = [
  {
    id: 'signature',
    name: 'Signature Premium',
    description: 'Elite Two-column with gold accents & timeline',
    badge: 'Executive',
    badgeType: 'purple',
    component: SignatureTemplate,
    colors: ['#0F172A', '#D4AF37', '#F1F5F9'],
    previewImage: '/previews/signature.png',
  },
  {
    id: 'modern',
    name: 'Modern Professional',
    description: 'Clean & high-impact with a bold navy header',
    badge: 'Popular',
    badgeType: 'primary',
    component: ModernTemplate,
    colors: ['#0F172A', '#2563EB', '#38BDF8'],
    previewImage: '/previews/modern.png',
  },
  {
    id: 'executive',
    name: 'Executive Premium',
    description: 'Elegant serif design for senior leaders',
    badge: 'Best / Premium',
    badgeType: 'purple',
    component: ExecutiveTemplate,
    colors: ['#1E293B', '#64748B', '#F1F5F9'],
    previewImage: '/previews/executive.png',
  },
  {
    id: 'academic',
    name: 'Simple / Academic',
    description: 'Ultra-clean ATS-focussed standard layout',
    badge: 'ATS Friendly',
    badgeType: 'success',
    component: AcademicTemplate,
    colors: ['#000000', '#333333', '#999999'],
    previewImage: '/previews/academic.png',
  },
  {
    id: 'minimal',
    name: 'Sleek Minimal',
    description: 'Sophisticated design with architectural focus',
    badge: 'Modern',
    badgeType: 'primary',
    component: MinimalTemplate,
    colors: ['#0F172A', '#1E293B', '#E2E8F0'],
    previewImage: '/previews/minimal.png',
  },
  {
    id: 'classic',
    name: 'Classic Standard',
    description: 'Traditional trusted layout with Garamond fonts',
    badge: 'Standard',
    badgeType: 'secondary',
    component: ClassicTemplate,
    colors: ['#111', '#444', '#888'],
    previewImage: '/previews/classic.png',
  },
  {
    id: 'creative',
    name: 'Modern Creative',
    description: 'Two-column layout with deep indigo sidebar',
    badge: 'Portfolio',
    badgeType: 'primary',
    component: CreativeTemplate,
    colors: ['#1E1B4B', '#2563EB', '#93C5FD'],
    previewImage: '/previews/creative.png',
  },
  {
    id: 'startup',
    name: 'Startup Bold',
    description: 'High-tech, bold header with electric accents',
    badge: 'Tech / Modern',
    badgeType: 'primary',
    component: StartupTemplate,
    colors: ['#0F172A', '#3B82F6', '#60A5FA'],
    previewImage: '/previews/startup.png',
  },
  {
    id: 'elite',
    name: 'Elite Luxury',
    description: 'Sophisticated design for high-end corporate roles',
    badge: 'Luxury',
    badgeType: 'purple',
    component: EliteTemplate,
    colors: ['#1A1A1A', '#D4AF37', '#F5F5F5'],
    previewImage: '/previews/elite.png',
  },
  {
    id: 'functional',
    name: 'Functional Pro',
    description: 'Sidebar-based layout focusing on skills impact',
    badge: 'Skills Focus',
    badgeType: 'success',
    component: FunctionalTemplate,
    colors: ['#F8FAFC', '#2DD4BF', '#94A3B8'],
    previewImage: '/previews/functional.png',
  },
];

export function getTemplate(id) {
  return TEMPLATES.find((t) => t.id === id) || TEMPLATES[0];
}

export default function ResumeRenderer({ resume }) {
  const template = getTemplate(resume.templateId);
  const Component = template.component;
  
  // Custom Color Logic
  const primaryColor = resume.customColor || template.colors[1] || template.colors[0];
  const textColor = resume.customTextColor || '#374151';
  
  return <Component resume={resume} primaryColor={primaryColor} textColor={textColor} />;
}
