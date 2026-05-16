export function calculateExperience(startDate, endDate) {
  // Convert input strings to Date objects if they aren't already
  const start = new Date(startDate);
  const end = new Date(endDate);

  // Check for invalid dates
  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    return "Invalid date input";
  }

  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();
  let days = end.getDate() - start.getDate();

  // Adjust months and years if the end day is before the start day
  if (days < 0) {
    months--;
    // Add the number of days in the end month to the days difference
    // Using new Date(year, month, 0).getDate() gets the last day of the previous month
    const daysInLastMonth = new Date(
      end.getFullYear(),
      end.getMonth(),
      0
    ).getDate();
    days += daysInLastMonth;
  }

  // Adjust years if the end month is before the start month
  if (months < 0) {
    years--;
    months += 12;
  }

  // Handle cases where start date is in the future relative to end date
  if (years < 0) {
    return "Start date cannot be after end date";
  }

  return {
    years: years,
    months: months,
    days: days,
  };
}
