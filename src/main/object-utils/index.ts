export function propertyExists(
  obj: Record<string, unknown>,
  key: string
): boolean {
  return Object.prototype.hasOwnProperty.call(obj, key)
}
