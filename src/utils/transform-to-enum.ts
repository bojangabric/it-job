export function transformToEnum(value: string) {
  return value.replace(/[\s-\/]/g, '_').toUpperCase();
}
