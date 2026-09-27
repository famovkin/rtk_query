export function isErrorWithDetailArray(
  error: unknown,
): error is { errors: { detail: string }[] } {
  // return (
  //   typeof error === 'object' &&
  //   error !== null &&
  //   'errors' in error &&
  //   Array.isArray((error as any).errors) &&
  //   (error as any).errors.length > 0 &&
  //   typeof (error as any).errors[0].detail === 'string'
  // )

  if (typeof error !== 'object' || error === null) return false;

  const typedError = error as Record<string, unknown>;

  if (!('errors' in typedError)) return false;

  const errors = typedError.errors;
  if (!Array.isArray(errors)) return false;

  if (errors.length === 0) return false;

  const firstItem = errors[0];

  if (typeof firstItem !== 'object' || firstItem === null) return false;

  return typeof (firstItem as Record<string, unknown>).detail === 'string';
}
