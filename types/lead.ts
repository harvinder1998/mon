// Lead form types

export interface LeadFormData {
  email: string;
  name: string;
  phone?: string;
  consent: boolean;
  source?: string;
}

export interface LeadSubmissionResponse {
  success: boolean;
  message?: string;
  error?: string;
}

export interface StoredLeadData {
  email: string;
  name: string;
  submittedAt: string;
}
