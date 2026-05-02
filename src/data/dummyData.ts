import { Member, MemberRole, Notice, Event, DynamicForm, FormResponse, EventRegistration, Publication, Activity } from "../types";

export const dummyMembers: Member[] = [
  {
    id: "1",
    name: "Jahidul Hassan",
    secId: "SEC-2024-001",
    phone: "+8801234567890",
    email: "jahid@example.com",
    socials: {
      github: "https://github.com/jahid",
      linkedin: "https://linkedin.com/in/jahid",
    },
    skills: ["React", "Node.js", "TypeScript"],
    isPaid: true,
    paymentMethod: "Bkash",
    transactionId: "TRX12345678",
    universityId: "211-15-XXX",
    batch: "56",
    role: MemberRole.ADMIN,
    joinedAt: "2023-09-10",
  },
  {
    id: "2",
    name: "Sarah Ahmed",
    secId: "SEC-2024-002",
    phone: "+8801987654321",
    email: "sarah@example.com",
    socials: {
      github: "https://github.com/sarah",
    },
    skills: ["Python", "Machine Learning"],
    isPaid: true,
    paymentMethod: "Rocket",
    transactionId: "TRX87654321",
    universityId: "212-15-YYY",
    batch: "57",
    role: MemberRole.MEMBER,
    joinedAt: "2024-01-15",
  },
  {
    id: "3",
    name: "Tanvir Rahman",
    secId: "SEC-2023-045",
    phone: "+8801700000001",
    email: "tanvir@example.com",
    socials: {},
    skills: ["Java", "Android"],
    isPaid: true,
    universityId: "201-15-AAA",
    batch: "54",
    role: MemberRole.MEMBER,
    joinedAt: "2023-02-10",
  },
  {
    id: "4",
    name: "Maliha Islam",
    secId: "SEC-2023-089",
    phone: "+8801700000002",
    email: "maliha@example.com",
    socials: {},
    skills: ["UI/UX", "Figma"],
    isPaid: true,
    universityId: "202-15-BBB",
    batch: "55",
    role: MemberRole.MEMBER,
    joinedAt: "2023-05-20",
  },
  {
    id: "5",
    name: "Rakib Hasan",
    secId: "SEC-2024-112",
    phone: "+8801700000003",
    email: "rakib@example.com",
    socials: {},
    skills: ["Networking", "C++"],
    isPaid: false,
    universityId: "221-15-CCC",
    batch: "58",
    role: MemberRole.MEMBER,
    joinedAt: "2024-03-05",
  },
  {
    id: "6",
    name: "Nusrat Jahan",
    secId: "SEC-2024-156",
    phone: "+8801700000004",
    email: "nusrat@example.com",
    socials: {},
    skills: ["QA", "Selenium"],
    isPaid: true,
    universityId: "222-15-DDD",
    batch: "59",
    role: MemberRole.MODERATOR,
    joinedAt: "2024-04-12",
  },
];

export const dummyNotices: Notice[] = [
  {
    id: "1",
    title: "General Meeting Scheduled",
    content: "We will be having our monthly general meeting this Sunday at 2:00 PM in the auditorium.",
    author: "Admin",
    createdAt: "2024-03-01T10:00:00Z",
    priority: "high",
  },
  {
    id: "2",
    title: "Project Showcase 2024",
    content: "Registration is now open for the annual project showcase. Submit your project details by next Friday.",
    author: "Admin",
    createdAt: "2024-02-28T14:30:00Z",
    priority: "medium",
  },
];

export const dummyEvents: Event[] = [
  {
    id: "1",
    title: "Web Development Workshop",
    description: "Learn the basics of React and Tailwind CSS in this 4-hour intensive workshop.",
    date: "2024-04-15",
    location: "Lab 701, DIU",
    registrationFields: [
      { id: "f1", label: "Full Name", type: "text", required: true },
      { id: "f2", label: "Email Address", type: "email", required: true },
      { id: "f3", label: "Experience Level", type: "select", required: true, options: ["Beginner", "Intermediate", "Advanced"] },
    ],
    registrations: [],
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "2",
    title: "Cyber Security Seminar",
    description: "Expert talk on network security and ethical hacking.",
    date: "2023-11-20",
    location: "Auditorium, DIU",
    registrationFields: [],
    registrations: [],
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "3",
    title: "App Contest 2023",
    description: "Annual mobile app development competition.",
    date: "2023-08-10",
    location: "Main Campus",
    registrationFields: [],
    registrations: [],
    image: "https://images.unsplash.com/photo-1526498460520-4c246339dccb?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "4",
    title: "AI & ML Summit",
    description: "Exploring the future of artificial intelligence in software engineering.",
    date: "2024-02-25",
    location: "Smart City",
    registrationFields: [],
    registrations: [],
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070&auto=format&fit=crop",
  },
];

export const dummyEventRegistrations: EventRegistration[] = [
  {
    id: "er1",
    eventId: "1",
    submittedAt: "2024-05-10T10:00:00Z",
    data: {
      "Full Name": "Alice Smith",
      "University ID": "111-22-333",
      "Department": "CSE"
    }
  },
  {
    id: "er2",
    eventId: "1",
    submittedAt: "2024-05-10T11:30:00Z",
    data: {
      "Full Name": "Bob Wilson",
      "University ID": "444-55-666",
      "Department": "SWE"
    }
  },
  {
    id: "er3",
    eventId: "1",
    submittedAt: "2024-05-11T09:15:00Z",
    data: {
      "Full Name": "Charlie Brown",
      "University ID": "777-88-999",
      "Department": "CSE"
    }
  },
  {
    id: "er4",
    eventId: "1",
    submittedAt: "2024-05-12T14:45:00Z",
    data: {
      "Full Name": "Diana Prince",
      "University ID": "123-45-678",
      "Department": "EEE"
    }
  },
  {
    id: "er5",
    eventId: "1",
    submittedAt: "2024-05-13T16:20:00Z",
    data: {
      "Full Name": "Edward Norton",
      "University ID": "987-65-432",
      "Department": "SWE"
    }
  },
  {
    id: "er6",
    eventId: "1",
    submittedAt: "2024-05-13T17:05:00Z",
    data: {
      "Full Name": "Fiona Gallagher",
      "University ID": "555-44-333",
      "Department": "CSE"
    }
  }
];

export const dummyForms: DynamicForm[] = [
  {
    id: "f1",
    title: "Biometric Workshop Registration",
    description: "Collecting details for the upcoming advanced security workshop.",
    fields: [
      { id: "q1", label: "Full Name", type: "text", required: true },
      { id: "q2", label: "Student ID", type: "text", required: true },
      { id: "q3", label: "Preferred Session", type: "select", required: true, options: ["Morning", "Afternoon"] }
    ],
    createdAt: "2024-03-20T10:00:00Z",
    updatedAt: "2024-03-21T12:00:00Z",
    responsesCount: 24
  },
  {
    id: "f2",
    title: "SEC Alumni Feedback 2024",
    description: "Help us improve the club by sharing your experience as an alum.",
    fields: [
      { id: "q4", label: "Company Name", type: "text", required: false },
      { id: "q5", label: "Rating", type: "radio", required: true, options: ["1", "2", "3", "4", "5"] },
      { id: "q6", label: "Comments", type: "textarea", required: false }
    ],
    createdAt: "2024-03-15T09:00:00Z",
    updatedAt: "2024-03-15T09:00:00Z",
    responsesCount: 156
  }
];

export const dummyFormResponses: FormResponse[] = [
  {
    id: "r1",
    formId: "f1",
    submittedAt: "2024-04-01T14:30:00Z",
    data: {
      "Full Name": "Jahidul Hassan",
      "Student ID": "221-15-XXX",
      "Preferred Session": "Morning"
    }
  },
  {
    id: "r2",
    formId: "f1",
    submittedAt: "2024-04-01T15:10:00Z",
    data: {
      "Full Name": "Sarah Ahmed",
      "Student ID": "222-16-YYY",
      "Preferred Session": "Afternoon"
    }
  }
];

export const dummyPublications: Publication[] = [
  {
    id: "p1",
    title: "SEC Annual Newsletter 2023",
    description: "Digital print of our yearly highlights and club achievements.",
    type: 'Digital Print',
    pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    thumbnail: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1974&auto=format&fit=crop",
    date: "2023-12-15"
  },
  {
    id: "p2",
    title: "Quarterly Tech Report Q1",
    description: "Insights into the latest software engineering trends.",
    type: 'Report',
    pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    thumbnail: "https://images.unsplash.com/photo-1588666309990-d68f08e3d4a6?q=80&w=1970&auto=format&fit=crop",
    date: "2024-03-01"
  }
];

export const dummyActivities: Activity[] = [
  {
    id: "a1",
    title: "System Design Masterclass",
    description: "Deep dive into scalable architecture patterns.",
    date: "2024-04-20",
    type: 'Workshop',
    status: 'Completed'
  },
  {
    id: "a2",
    title: "Inter-Campus Hackathon",
    description: "The biggest coding challenge across all DIU campuses.",
    date: "2024-06-15",
    type: 'Contest',
    status: 'Draft'
  }
];
