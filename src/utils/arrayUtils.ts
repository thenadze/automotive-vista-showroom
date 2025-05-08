
/**
 * Converts an array of string values to an array of numbers
 * Used for converting string IDs to number IDs for Supabase queries
 */
export const toNumberArray = (values: string[]): number[] => {
  return values.map(value => Number(value));
};
