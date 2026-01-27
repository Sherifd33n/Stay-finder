type LocationContent = {
  title: string;
  description: string;
};

export const locationContent: Record<string, LocationContent> = {
  lagos: {
    title: "Lagos:The heart of luxury",
    description:
      "Explore premium homes across Lagos, inspired by its vibrant lifestyle, iconic bridges, and waterfront views.",
  },

  abuja: {
    title: "Elegant Homes in Abuja",
    description:
      "Discover refined living in Nigeria’s capital, surrounded by modern infrastructure and serene landscapes.",
  },

  oyo: {
    title: "Exclusive Properties in Oyo",
    description:
      "Find beautifully designed homes rooted in culture, history, and contemporary comfort.",
  },

  rivers: {
    title: "Waterfront Living in Rivers State",
    description:
      "Experience modern properties shaped by river views, commerce, and energetic urban life.",
  },

  // fallback
  default: {
    title: "Available Properties",
    description:
      "Browse curated property listings across top locations.",
  },
};
