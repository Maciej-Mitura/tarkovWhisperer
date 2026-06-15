export type ActionResult<T> =
  | { success: true; data: T; message?: string }
  | { success: false; error: string };

export const SAFE_ERROR_MESSAGE =
  "Unable to complete your request. Please try again.";

export function toActionError(): string {
  return SAFE_ERROR_MESSAGE;
}
