
export const calculateDaysUntilEUControl = (inspectionDueDate?: string): number | null => {
  if (!inspectionDueDate) return null;
  const today = new Date();
  const euDate = new Date(inspectionDueDate);
  const diffTime = euDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

export const isEUControlSoon = (daysLeft: number | null): boolean => {
  return daysLeft !== null && daysLeft <= 60;
};
