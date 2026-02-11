// Email marketing integrations

export interface LeadData {
  email: string;
  name: string;
  phone?: string;
}

/**
 * Add lead to Mailchimp
 */
export async function addLeadToMailchimp(lead: LeadData): Promise<boolean> {
  const apiKey = process.env.MAILCHIMP_API_KEY;
  const server = process.env.MAILCHIMP_SERVER;
  const listId = process.env.MAILCHIMP_LIST_ID;

  if (!apiKey || !server || !listId) {
    console.warn('Mailchimp credentials not configured');
    return false;
  }

  try {
    const [firstName, ...lastNameParts] = lead.name.split(' ');
    const lastName = lastNameParts.join(' ');

    const response = await fetch(
      `https://${server}.api.mailchimp.com/3.0/lists/${listId}/members`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email_address: lead.email,
          status: 'subscribed',
          merge_fields: {
            FNAME: firstName,
            LNAME: lastName,
            PHONE: lead.phone || '',
          },
          tags: ['ACCA Syllabus Download'],
        }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      // If already subscribed, that's okay
      if (error.title === 'Member Exists') {
        return true;
      }
      throw new Error(error.detail || 'Failed to add to Mailchimp');
    }

    return true;
  } catch (error) {
    console.error('Mailchimp error:', error);
    return false;
  }
}

/**
 * Add lead to ConvertKit
 */
export async function addLeadToConvertKit(lead: LeadData): Promise<boolean> {
  const apiKey = process.env.CONVERTKIT_API_KEY;
  const formId = process.env.CONVERTKIT_FORM_ID;

  if (!apiKey || !formId) {
    console.warn('ConvertKit credentials not configured');
    return false;
  }

  try {
    const response = await fetch(
      `https://api.convertkit.com/v3/forms/${formId}/subscribe`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          api_key: apiKey,
          email: lead.email,
          first_name: lead.name.split(' ')[0],
          fields: {
            phone: lead.phone || '',
          },
          tags: ['acca-syllabus-download'],
        }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      // If already subscribed, that's okay
      if (error.message?.includes('already subscribed')) {
        return true;
      }
      throw new Error(error.message || 'Failed to add to ConvertKit');
    }

    return true;
  } catch (error) {
    console.error('ConvertKit error:', error);
    return false;
  }
}

/**
 * Add lead to email marketing platform
 * Tries Mailchimp first, falls back to ConvertKit
 */
export async function addLeadToEmailPlatform(
  lead: LeadData
): Promise<{ success: boolean; platform?: string; error?: string }> {
  // Try Mailchimp first
  if (process.env.MAILCHIMP_API_KEY) {
    const success = await addLeadToMailchimp(lead);
    if (success) {
      return { success: true, platform: 'Mailchimp' };
    }
  }

  // Fall back to ConvertKit
  if (process.env.CONVERTKIT_API_KEY) {
    const success = await addLeadToConvertKit(lead);
    if (success) {
      return { success: true, platform: 'ConvertKit' };
    }
  }

  // No platform configured or both failed
  return {
    success: false,
    error: 'No email platform configured or integration failed',
  };
}
