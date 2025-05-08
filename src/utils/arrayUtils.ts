
/**
 * Converts an array of string values to an array of numbers
 * Used for converting string IDs to number IDs for Supabase queries
 */
export const toNumberArray = (values: string[]): number[] => {
  // Filter out any non-convertible values first to avoid NaN
  return values
    .filter(value => {
      // Check if value exists and is convertible to a number
      return value && 
             value !== "undefined" && 
             value !== "null" && 
             !isNaN(Number(value)) && 
             value !== "all";  // Filter out "all" value used in filters
    })
    .map(value => Number(value));
};

/**
 * Checks if a string can be converted to a number
 */
export const isNumeric = (value: string): boolean => {
  return !isNaN(Number(value));
};
