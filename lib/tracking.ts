// Lead tracking utilities for localStorage management

const LEAD_SUBMITTED_KEY = 'leadSubmitted';
const LEAD_DATA_KEY = 'leadData';
const CONSENT_GIVEN_KEY = 'cookieConsent';

/**
 * Check if user has already submitted a lead form
 */
export function hasSubmittedLead(): boolean {
  if (typeof window === 'undefined') return false;

  try {
    const submitted = localStorage.getItem(LEAD_SUBMITTED_KEY);
    return submitted === 'true';
  } catch (error) {
    console.error('Error checking lead submission status:', error);
    return false;
  }
}

/**
 * Mark that user has submitted lead form
 */
export function markLeadSubmitted(leadData?: {
  email: string;
  name: string;
}): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(LEAD_SUBMITTED_KEY, 'true');
    if (leadData) {
      localStorage.setItem(
        LEAD_DATA_KEY,
        JSON.stringify({
          ...leadData,
          submittedAt: new Date().toISOString(),
        })
      );
    }
  } catch (error) {
    console.error('Error marking lead as submitted:', error);
  }
}

/**
 * Get stored lead data
 */
export function getLeadData(): {
  email: string;
  name: string;
  submittedAt: string;
} | null {
  if (typeof window === 'undefined') return null;

  try {
    const data = localStorage.getItem(LEAD_DATA_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error getting lead data:', error);
    return null;
  }
}

/**
 * Check if user has given cookie consent
 */
export function hasGivenConsent(): boolean {
  if (typeof window === 'undefined') return false;

  try {
    const consent = localStorage.getItem(CONSENT_GIVEN_KEY);
    return consent === 'true';
  } catch (error) {
    console.error('Error checking cookie consent:', error);
    return false;
  }
}

/**
 * Save cookie consent
 */
export function saveConsent(given: boolean): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(CONSENT_GIVEN_KEY, given ? 'true' : 'false');
  } catch (error) {
    console.error('Error saving cookie consent:', error);
  }
}

/**
 * Clear all tracking data (for testing or user request)
 */
export function clearTrackingData(): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.removeItem(LEAD_SUBMITTED_KEY);
    localStorage.removeItem(LEAD_DATA_KEY);
    localStorage.removeItem(CONSENT_GIVEN_KEY);
  } catch (error) {
    console.error('Error clearing tracking data:', error);
  }
}
