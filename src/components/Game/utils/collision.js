// collision.js
// ----------------------------------------------------
// Detección de colisiones AABB (Axis-Aligned Bounding Box)
// para sprites rectangulares (Kirby, enemigos, estrellas, etc.)
// ----------------------------------------------------

/**
 * Verifica si dos objetos (a y b) colisionan entre sí.
 * Ambos deben tener las propiedades: x, y, width, height.
 *
 * @param {Object} a - Primer objeto (por ejemplo, Kirby)
 * @param {Object} b - Segundo objeto (por ejemplo, enemigo)
 * @param {number} [tolerance=0] - Margen opcional para ajustar la sensibilidad
 * @returns {boolean} - true si hay colisión
 */
export function isColliding(a, b, tolerance = 0) {
  return (
    a.x + tolerance < b.x + b.width - tolerance &&
    a.x + a.width - tolerance > b.x + tolerance &&
    a.y + tolerance < b.y + b.height - tolerance &&
    a.y + a.height - tolerance > b.y + tolerance
  );
}

/**
 * Verifica si un objeto (por ejemplo, Kirby) colisiona con alguno
 * de los elementos en un arreglo (por ejemplo, enemigos).
 *
 * @param {Object} target - El objeto principal (Kirby)
 * @param {Array<Object>} items - Lista de objetos con {x, y, width, height}
 * @param {number} [tolerance=0]
 * @returns {boolean} - true si hay colisión con alguno
 */
export function isCollidingWithAny(target, items, tolerance = 0) {
  return items.some((item) => isColliding(target, item, tolerance));
}
