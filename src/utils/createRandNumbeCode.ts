export function generateCodeRandPass() {
  // Math.random() genera un número decimal entre 0 (inclusive) y 1 (exclusive).
  // Multiplicamos por 1000000 para obtener un número entre 0 y 999999.
  // Math.floor() redondea hacia abajo al número entero más cercano.
  let codigo = Math.floor(Math.random() * 1000000);
  
  // Aseguramos que el código tenga exactamente 6 dígitos.
  // Si el número es menor que 100000, se agregan ceros al inicio.
  let codigoString = codigo.toString().padStart(6, '0');
  
  return codigoString;
}

