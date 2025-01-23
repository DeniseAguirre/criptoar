/**
 * Formatea un número grande en un formato abreviado con símbolo de moneda.
 * Ejemplo: 103190969672 -> $103.19B
 * @param value El número a formatear.
 * @param currency El símbolo de la moneda (por ejemplo, "$" para USD).
 * @param decimals Número de decimales a mostrar.
 * @returns Una cadena formateada (por ejemplo, "$103.19B").
 */
const formatCurrencyShort = (
  value: number,
  currency: string = "$",
  decimals: number = 2
): string => {
  if (value < 1_000) {
    // Si el número es menor a 1000, lo mostramos sin abreviar
    return `${currency}${value.toFixed(decimals)}`;
  }

  // Define los sufijos de abreviación
  const suffixes = ["", "K", "M", "B", "T", "P"];
  const tier = Math.floor(Math.log10(value) / 3); // Determina el índice del sufijo

  // Calcula el divisor para el nivel actual (1K, 1M, 1B, etc.)
  const scaledValue = value / Math.pow(10, tier * 3);

  // Formatea el valor con los decimales solicitados y agrega el sufijo correspondiente
  return `${currency}${scaledValue.toFixed(decimals)}${suffixes[tier]}`;
};

export default formatCurrencyShort;
