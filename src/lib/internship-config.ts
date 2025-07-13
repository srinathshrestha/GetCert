// Internship Configuration
// This file contains the default internship details used for certificate generation

export interface InternshipConfig {
  domain: string;
  startDate: string;
  endDate: string;
  coordinator: {
    name: string;
    title: string;
    organization: string;
  };
  company: {
    name: string;
    fullName: string;
    address: {
      line1: string;
      line2: string;
      line3: string;
    };
    cin: string;
    website: string;
    email: string;
    phone: string;
  };
}

// Default internship configuration for LinkVerse Labs
export const INTERNSHIP_CONFIG: InternshipConfig = {
  // The field/domain of internship
  domain: "Web Development",

  // Internship period dates
  startDate: "2nd July 2025",
  endDate: "16th July 2025",

  // Coordinator/Signatory details
  coordinator: {
    name: "Harshdeepsinh",
    title: "Internship Coordinator",
    organization: "LinkVerse Labs, Ahmedabad",
  },

  // Company details
  company: {
    name: "LinkVerse",
    fullName: "LinkVerse Labs Private LTD",
    address: {
      line1: "E-703, Ganesh Glory 11,",
      line2: "SG Highway, Ahmedabad",
      line3: "CIN: U62099GJ2025PTC158752",
    },
    cin: "U62099GJ2025PTC158752",
    website: "www.linkverselabs.com",
    email: "info@linkverselabs.com",
    phone: "+91 6354035567",
  },
};

// Function to get current date in readable format
export function getCurrentDate(): string {
  const now = new Date();
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return now.toLocaleDateString("en-US", options);
}

// Function to customize config for specific domains or batches
export function getInternshipConfig(
  customizations?: Partial<InternshipConfig>
): InternshipConfig {
  return {
    ...INTERNSHIP_CONFIG,
    ...customizations,
  };
}
