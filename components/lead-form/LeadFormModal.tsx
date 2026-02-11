"use client";

import { useState, useEffect } from 'react';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { hasSubmittedLead, markLeadSubmitted } from '@/lib/tracking';
import type { LeadFormData } from '@/types/lead';

interface LeadFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function LeadFormModal({
  isOpen,
  onClose,
  onSuccess,
}: LeadFormModalProps) {
  const [formData, setFormData] = useState<LeadFormData>({
    email: '',
    name: '',
    phone: '',
    consent: false,
  });
  const [errors, setErrors] = useState<Partial<LeadFormData>>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Check if already submitted on mount
  useEffect(() => {
    const alreadySubmitted = hasSubmittedLead();
    setSubmitted(alreadySubmitted);
  }, []);

  const validateForm = (): boolean => {
    const newErrors: Partial<LeadFormData> = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    // Name validation
    if (!formData.name) {
      newErrors.name = 'Name is required';
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    // Consent validation
    if (!formData.consent) {
      newErrors.consent = 'You must accept to continue';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        // Mark as submitted in localStorage
        markLeadSubmitted({ email: formData.email, name: formData.name });
        setSubmitted(true);

        // Call success callback
        if (onSuccess) {
          onSuccess();
        }

        // Auto-close after 1.5 seconds to show success message
        setTimeout(() => {
          onClose();
        }, 1500);
      } else {
        setErrors({ email: data.error || 'Submission failed' });
      }
    } catch (error) {
      console.error('Lead submission error:', error);
      setErrors({ email: 'An error occurred. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: keyof LeadFormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error for this field
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Download ACCA Syllabus">
      {submitted ? (
        <div className="py-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <svg
              className="h-8 w-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h3 className="mb-2 text-xl font-semibold text-secondary-900">
            Success!
          </h3>
          <p className="text-secondary-600">
            Your download will start shortly. Check your email for more study
            resources!
          </p>
        </div>
      ) : (
        <>
          <p className="mb-6 text-secondary-600">
            Get instant access to the complete ACCA syllabus. Enter your details
            below to download.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="email"
              label="Email Address"
              placeholder="your.email@example.com"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              error={errors.email}
              required
            />

            <Input
              type="text"
              label="Full Name"
              placeholder="John Doe"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              error={errors.name}
              required
            />

            <Input
              type="tel"
              label="Phone Number (Optional)"
              placeholder="+44 7700 900000"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
            />

            <div className="flex items-start">
              <input
                type="checkbox"
                id="consent"
                checked={formData.consent}
                onChange={(e) => handleChange('consent', e.target.checked)}
                className="mt-1 h-4 w-4 rounded border-secondary-300 text-primary-600 focus:ring-primary-500"
              />
              <label
                htmlFor="consent"
                className="ml-2 text-sm text-secondary-600"
              >
                I agree to receive study resources and updates via email. You
                can unsubscribe at any time. *
              </label>
            </div>
            {errors.consent && (
              <p className="text-sm text-red-500">{errors.consent}</p>
            )}

            <div className="flex gap-3">
              <Button
                type="submit"
                variant="primary"
                loading={loading}
                className="flex-1"
              >
                {loading ? 'Submitting...' : 'Download Now'}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={loading}
              >
                Cancel
              </Button>
            </div>
          </form>

          <p className="mt-4 text-xs text-secondary-500">
            We respect your privacy. Your data is secure and will never be shared
            with third parties.
          </p>
        </>
      )}
    </Modal>
  );
}
