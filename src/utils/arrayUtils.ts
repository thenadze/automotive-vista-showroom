
/**
 * Converts an array of string values to an array of numbers
 * Used for converting string IDs to number IDs for Supabase queries
 */
export const toNumberArray = (values: string[]): number[] => {
  // Filter out any non-convertible values first to avoid NaN
  return values
    .filter(value => value && !isNaN(Number(value)))
    .map(value => Number(value));
};
