// Función para formatear timestamps a fechas legibles
export const formatTimestamps = (timestamps: number[]): string[] => {
  return timestamps.map((timestamp) => {
    const date = new Date(timestamp);
    return `${date.getDate()}/${date.getMonth() + 1}`;
  });
};
