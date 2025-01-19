export function isValidTime(time: string): boolean {
  // Match 12-hour format (e.g., "8:00 AM", "3:15 PM")
  const twelveHourFormat = /^(1[0-2]|0?[1-9]):[0-5][0-9]\s?(AM|PM|am|pm)$/;
  
  // Match 24-hour format (e.g., "08:00", "15:15")
  const twentyFourHourFormat = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
  
  return twelveHourFormat.test(time) || twentyFourHourFormat.test(time);
}