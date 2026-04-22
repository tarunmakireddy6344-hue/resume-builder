/**
 * Determines whether black or white text should be used on a given background color
 * @param {string} hexColor - Background color in hex format (#RRGGBB)
 * @returns {string} - '#FFFFFF' or '#000000'
 */
export function getContrastColor(hexColor) {
  if (!hexColor || hexColor.length < 6) return '#FFFFFF';
  
  const hex = hexColor.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  
  // Calculate relative luminance
  // https://www.w3.org/TR/WCAG20/#relativeluminancedef
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  
  return luminance > 0.5 ? '#000000' : '#FFFFFF';
}
