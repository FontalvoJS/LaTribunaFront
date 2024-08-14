export const formatDate = (dateString: string, ignoreFormat = false, isPosponed = false) => {
  const date = new Date(dateString);
  const now = new Date();

  const diffInMillis = now.getTime() - date.getTime();
  const diffInMinutes = Math.floor(diffInMillis / (1000 * 60));
  const diffInHours = Math.floor(diffInMillis / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInMillis / (1000 * 60 * 60 * 24));

  if (diffInMinutes < 60 && !ignoreFormat) {
    return `Hace ${diffInMinutes} minutos`;
  } else if (diffInHours < 24 && !ignoreFormat) {
    return `Hace ${diffInHours} horas`;
  } else if (diffInDays <= 7 && !ignoreFormat) {
    return `Hace ${diffInDays} días`;
  } else {
    const day = date.getDate();
    const month = date
      .toLocaleString("default", { month: "short" })
      .toUpperCase();
    const year = date.getFullYear();
    const hours = date.getHours() % 12 || 12;
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = date.getHours() >= 12 ? "P.M." : "A.M.";

    return `${day} ${month} ${year} - ${hours}:${minutes} ${ampm}`;
  }
};