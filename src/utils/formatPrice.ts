/**
 * Convert a number into a locale-aware currency string,
 * e.g. “US$ 1,234.56” or “NT$ 3,280”.
 *
 * @param value     The amount to format (number | numeric string)
 * @param currency  ISO-4217 code, e.g. 'USD', 'HKD', 'TWD'
 * @param locale    BCP-47 locale tag (default 'en-US')
 */
export function formatPrice(
  value: number | string,
  currency: string = 'USD',
  locale: string = 'en-US'
): string {
  const amount = typeof value === 'string' ? Number(value) : value;

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
}
