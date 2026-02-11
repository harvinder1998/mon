"use client";

import { useState } from 'react';
import Button from '@/components/ui/Button';
import LeadFormModal from '@/components/lead-form/LeadFormModal';
import { hasSubmittedLead } from '@/lib/tracking';

interface DownloadButtonProps {
  level: string;
  title: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

export default function DownloadButton({
  level,
  title,
  variant = 'primary',
  size = 'md',
}: DownloadButtonProps) {
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const handleDownloadClick = async () => {
    // Check if user has already submitted lead
    const submitted = hasSubmittedLead();

    if (!submitted) {
      // Show lead form
      setShowLeadForm(true);
      return;
    }

    // User has submitted, proceed with download
    await initiateDownload();
  };

  const initiateDownload = async () => {
    setDownloading(true);

    try {
      const response = await fetch(`/api/download?level=${level}`);
      const data = await response.json();

      if (data.success && data.url) {
        // Open download URL in new tab
        window.open(data.url, '_blank');
      } else if (data.requiresLead) {
        // Lead form required
        setShowLeadForm(true);
      } else {
        alert('Failed to download. Please try again.');
      }
    } catch (error) {
      console.error('Download error:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setDownloading(false);
    }
  };

  const handleLeadSuccess = () => {
    // Lead form submitted successfully, initiate download
    setShowLeadForm(false);
    setTimeout(() => {
      initiateDownload();
    }, 500);
  };

  return (
    <>
      <Button
        variant={variant}
        size={size}
        onClick={handleDownloadClick}
        loading={downloading}
      >
        {downloading ? (
          'Preparing Download...'
        ) : (
          <>
            <svg
              className="mr-2 h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            Download {title}
          </>
        )}
      </Button>

      <LeadFormModal
        isOpen={showLeadForm}
        onClose={() => setShowLeadForm(false)}
        onSuccess={handleLeadSuccess}
      />
    </>
  );
}
