const formatDate = (date) => {
  const newDate = new Date(date);
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = newDate.toLocaleDateString("fr-FR", options); // Utilisation de la locale française (fr-FR) pour le formatage de la date
  return formattedDate;
};

export default formatDate;