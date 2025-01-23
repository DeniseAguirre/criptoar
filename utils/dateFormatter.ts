export const formatDate = (date: string | Date) => {
  const dateObj = typeof date === "string" ? new Date(date) : date;

  const meses = [
    "enero",
    "febrero",
    "marzo",
    "abril",
    "mayo",
    "junio",
    "julio",
    "agosto",
    "septiembre",
    "octubre",
    "noviembre",
    "diciembre",
  ];

  const dia = dateObj.getDate();
  const mes = meses[dateObj.getMonth()];
  const año = dateObj.getFullYear();
  const hora = dateObj.getHours().toString().padStart(2, "0");
  const minutos = dateObj.getMinutes().toString().padStart(2, "0");

  return `${dia} de ${mes} de ${año}, ${hora}:${minutos}hs`;
};
