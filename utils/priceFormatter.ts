export const formatPrice = (price: number): string => {
  return (
    new Intl.NumberFormat("es-ES", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 3,
      style: "decimal",
    }).format(price) + " US$"
  );
};
