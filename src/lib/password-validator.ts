// lib/passwordValidator.ts

import { allowedSpecialChars, getUnsupportedCharacters } from './utils';

function escapeRegex(str: string): string {
  return str.replace(/[-[\]/{}()*+?.\\^$|]/g, '\\$&');
}

export function isValidPassword(val: string): boolean {
  const hasLower = /[a-z]/.test(val);
  const hasUpper = /[A-Z]/.test(val);
  const hasDigit = /\d/.test(val);
  const hasSpecial = new RegExp(`[${escapeRegex(allowedSpecialChars)}]`).test(
    val
  );
  const noUnsupported = getUnsupportedCharacters(val).length === 0;
  return hasLower && hasUpper && hasDigit && hasSpecial && noUnsupported;
}

export function getPasswordValidationMessage(val: string): { message: string } {
  const missingRequirements: string[] = [];

  if (!/[a-z]/.test(val)) missingRequirements.push('1 lowercase');
  if (!/[A-Z]/.test(val)) missingRequirements.push('1 uppercase');
  if (!/\d/.test(val)) missingRequirements.push('1 number');
  if (!new RegExp(`[${escapeRegex(allowedSpecialChars)}]`).test(val))
    missingRequirements.push('1 special character');

  const unsupportedChars = getUnsupportedCharacters(val);

  const baseMessage =
    missingRequirements.length > 0
      ? `Password must contain at least ${missingRequirements.join(', ')}`
      : '';

  if (unsupportedChars.length === 1) {
    return {
      message: [
        baseMessage,
        `Character "${unsupportedChars[0]}" is not supported.`
      ]
        .filter(Boolean)
        .join('. ')
    };
  }

  if (unsupportedChars.length > 1) {
    return {
      message: [
        baseMessage,
        `Unsupported characters: ${unsupportedChars.join(' ')}`
      ]
        .filter(Boolean)
        .join('. ')
    };
  }

  if (baseMessage) {
    return { message: baseMessage + '.' };
  }

  return { message: '' };
}
