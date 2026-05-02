export enum MemberRole {
  ADMIN = "Admin",
  MEMBER = "Member",
  MODERATOR = "Moderator"
}

export interface SocialLinks {
  github?: string;
  linkedin?: string;
  facebook?: string;
  portfolio?: string;
}

export interface Member {
  id: string;
  name: string;
  secId: string;
  phone: string;
  email: string;
  socials: SocialLinks;
  skills: string[];
  isPaid: boolean;
  paymentMethod?: string;
  transactionId?: string;
  universityId: string;
  batch: string;
  role: MemberRole;
  joinedAt: string;
}

export interface Notice {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  priority: "low" | "medium" | "high";
}

export interface FormField {
  id: string;
  label: string;
  type: "text" | "number" | "email" | "select" | "checkbox" | "textarea" | "radio";
  required: boolean;
  options?: string[]; // For select and radio types
  placeholder?: string;
}

export interface DynamicForm {
  id: string;
  title: string;
  description: string;
  fields: FormField[];
  createdAt: string;
  updatedAt: string;
  responsesCount: number;
}

export interface FormResponse {
  id: string;
  formId: string;
  submittedAt: string;
  data: Record<string, any>; // Field label as key
}

export interface EventRegistration {
  id: string;
  eventId: string;
  submittedAt: string;
  data: Record<string, any>;
}

export interface Publication {
  id: string;
  title: string;
  description: string;
  type: 'Digital Print' | 'Newsletter' | 'Report';
  pdfUrl: string;
  thumbnail: string;
  date: string;
}

export interface Activity {
  id: string;
  title: string;
  description: string;
  date: string;
  type: 'Workshop' | 'Seminar' | 'Contest';
  status: 'Completed' | 'Draft';
}

export interface Comment {
  id: string;
  postId: string;
  userId: string;
  userName: string;
  content: string;
  createdAt: string;
  isHidden: boolean;
}

export interface Post {
  id: string;
  userId: string;
  userName: string;
  title: string;
  content: string;
  createdAt: string;
  isHidden: boolean;
  likesCount: number;
  commentsCount: number;
}

export interface Transaction {
  id: string;
  type: 'Income' | 'Expense';
  category: 'Member Fee' | 'Event Registration' | 'Sponsorship' | 'Venue' | 'Marketing' | 'Equipment' | 'Miscellaneous';
  amount: number;
  date: string;
  description: string;
  status: 'Completed' | 'Pending';
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  registrationFields: FormField[];
  registrations: any[]; // Dummy storage for registrations
  image?: string;
}
