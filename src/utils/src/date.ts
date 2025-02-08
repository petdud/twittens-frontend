import { format, formatDistanceToNow } from "date-fns";

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return format(date, "yyyy-MM-dd HH:mm");
};

export const formatTimeAgo = (dateString: string) => {
  const date = new Date(dateString);
  return formatDistanceToNow(date, { addSuffix: true });
};
