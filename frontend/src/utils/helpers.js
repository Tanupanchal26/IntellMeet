/**
 * Format an ISO date string to a readable format.
 * @param {string} iso
 * @returns {string}
 */
export const formatDate = (iso) =>
  new Date(iso).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

/**
 * Generate a random 6-character meeting code.
 * @returns {string}
 */
export const generateMeetingCode = () =>
  Math.random().toString(36).substring(2, 8).toUpperCase();
