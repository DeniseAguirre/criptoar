export function formatPriceChart(price: number) {
  if (price >= 1000) {
    // Si el precio es mayor o igual a 1000, usar el formato de K para miles
    return (price / 1000).toFixed(3) + "K";
  } else if (price >= 1) {
    // Si el precio es mayor o igual a 1, mostrar solo 2 decimales
    return price.toFixed(2);
  } else {
    // Para precios menores a 1, mantener los valores principales después del punto
    const decimalPlaces = price < 0.1 ? 4 : 3;
    return price.toFixed(decimalPlaces);
  }
}
