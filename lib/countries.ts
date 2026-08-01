/**
 * Dialling codes, for the phone field on the enquiry form.
 *
 * The visitor types the national number only — the part they would give
 * another local — and picks the country from a list. That is how people
 * actually know their own number: an Indian owner thinks of it as ten digits,
 * not as +91 followed by ten digits, and asking for the international form is
 * the most common reason a phone field gets filled in wrongly.
 *
 * Options are keyed by ISO code rather than by dialling code because dialling
 * codes are not unique: +1 is the United States and Canada, +7 is Russia and
 * Kazakhstan. Storing the ISO code keeps the answer unambiguous and lets the
 * server rebuild the number itself rather than trusting a hidden field.
 *
 * `nsn` is the national significant number length where it is fixed and well
 * known. It drives a helpful error ("Indian numbers are 10 digits") for the
 * markets we actually sell into. It is deliberately absent for countries with
 * variable-length numbering — guessing there would reject valid numbers, which
 * is a far worse failure than accepting a wrong one.
 */

export type Country = {
  /** ISO 3166-1 alpha-2. The value submitted by the form. */
  iso: string;
  name: string;
  /** Dialling code without the plus. */
  dial: string;
  /** Fixed national number length, where there is one. */
  nsn?: number;
};

/** [iso, name, dial, nsn?] */
const DATA: [string, string, string, number?][] = [
  ['AF', 'Afghanistan', '93', 9],
  ['AL', 'Albania', '355'],
  ['DZ', 'Algeria', '213', 9],
  ['AD', 'Andorra', '376'],
  ['AO', 'Angola', '244', 9],
  ['AG', 'Antigua & Barbuda', '1268'],
  ['AR', 'Argentina', '54'],
  ['AM', 'Armenia', '374', 8],
  ['AW', 'Aruba', '297'],
  ['AU', 'Australia', '61', 9],
  ['AT', 'Austria', '43'],
  ['AZ', 'Azerbaijan', '994', 9],
  ['BS', 'Bahamas', '1242'],
  ['BH', 'Bahrain', '973', 8],
  ['BD', 'Bangladesh', '880', 10],
  ['BB', 'Barbados', '1246'],
  ['BY', 'Belarus', '375', 9],
  ['BE', 'Belgium', '32', 9],
  ['BZ', 'Belize', '501'],
  ['BJ', 'Benin', '229'],
  ['BT', 'Bhutan', '975', 8],
  ['BO', 'Bolivia', '591', 8],
  ['BA', 'Bosnia & Herzegovina', '387'],
  ['BW', 'Botswana', '267'],
  ['BR', 'Brazil', '55', 11],
  ['BN', 'Brunei', '673'],
  ['BG', 'Bulgaria', '359'],
  ['BF', 'Burkina Faso', '226', 8],
  ['BI', 'Burundi', '257', 8],
  ['KH', 'Cambodia', '855'],
  ['CM', 'Cameroon', '237', 9],
  ['CA', 'Canada', '1', 10],
  ['CV', 'Cape Verde', '238'],
  ['CF', 'Central African Republic', '236'],
  ['TD', 'Chad', '235'],
  ['CL', 'Chile', '56', 9],
  ['CN', 'China', '86', 11],
  ['CO', 'Colombia', '57', 10],
  ['KM', 'Comoros', '269'],
  ['CG', 'Congo - Brazzaville', '242'],
  ['CD', 'Congo - Kinshasa', '243'],
  ['CR', 'Costa Rica', '506', 8],
  ['CI', 'Côte d’Ivoire', '225'],
  ['HR', 'Croatia', '385'],
  ['CU', 'Cuba', '53'],
  ['CY', 'Cyprus', '357', 8],
  ['CZ', 'Czechia', '420', 9],
  ['DK', 'Denmark', '45', 8],
  ['DJ', 'Djibouti', '253'],
  ['DM', 'Dominica', '1767'],
  ['DO', 'Dominican Republic', '1809'],
  ['EC', 'Ecuador', '593'],
  ['EG', 'Egypt', '20', 10],
  ['SV', 'El Salvador', '503', 8],
  ['GQ', 'Equatorial Guinea', '240'],
  ['ER', 'Eritrea', '291'],
  ['EE', 'Estonia', '372'],
  ['SZ', 'Eswatini', '268'],
  ['ET', 'Ethiopia', '251', 9],
  ['FJ', 'Fiji', '679'],
  ['FI', 'Finland', '358'],
  ['FR', 'France', '33', 9],
  ['GA', 'Gabon', '241'],
  ['GM', 'Gambia', '220'],
  ['GE', 'Georgia', '995', 9],
  ['DE', 'Germany', '49'],
  ['GH', 'Ghana', '233', 9],
  ['GR', 'Greece', '30', 10],
  ['GD', 'Grenada', '1473'],
  ['GT', 'Guatemala', '502', 8],
  ['GN', 'Guinea', '224'],
  ['GY', 'Guyana', '592'],
  ['HT', 'Haiti', '509', 8],
  ['HN', 'Honduras', '504', 8],
  ['HK', 'Hong Kong SAR', '852', 8],
  ['HU', 'Hungary', '36', 9],
  ['IS', 'Iceland', '354', 7],
  ['IN', 'India', '91', 10],
  ['ID', 'Indonesia', '62'],
  ['IR', 'Iran', '98', 10],
  ['IQ', 'Iraq', '964', 10],
  ['IE', 'Ireland', '353', 9],
  ['IL', 'Israel', '972', 9],
  ['IT', 'Italy', '39'],
  ['JM', 'Jamaica', '1876'],
  ['JP', 'Japan', '81', 10],
  ['JO', 'Jordan', '962', 9],
  ['KZ', 'Kazakhstan', '7', 10],
  ['KE', 'Kenya', '254', 9],
  ['KW', 'Kuwait', '965', 8],
  ['KG', 'Kyrgyzstan', '996', 9],
  ['LA', 'Laos', '856'],
  ['LV', 'Latvia', '371', 8],
  ['LB', 'Lebanon', '961'],
  ['LS', 'Lesotho', '266', 8],
  ['LR', 'Liberia', '231'],
  ['LY', 'Libya', '218', 9],
  ['LI', 'Liechtenstein', '423'],
  ['LT', 'Lithuania', '370', 8],
  ['LU', 'Luxembourg', '352'],
  ['MO', 'Macao SAR', '853', 8],
  ['MG', 'Madagascar', '261', 9],
  ['MW', 'Malawi', '265'],
  ['MY', 'Malaysia', '60'],
  ['MV', 'Maldives', '960', 7],
  ['ML', 'Mali', '223', 8],
  ['MT', 'Malta', '356', 8],
  ['MR', 'Mauritania', '222', 8],
  ['MU', 'Mauritius', '230', 8],
  ['MX', 'Mexico', '52', 10],
  ['MD', 'Moldova', '373', 8],
  ['MC', 'Monaco', '377'],
  ['MN', 'Mongolia', '976', 8],
  ['ME', 'Montenegro', '382'],
  ['MA', 'Morocco', '212', 9],
  ['MZ', 'Mozambique', '258', 9],
  ['MM', 'Myanmar', '95'],
  ['NA', 'Namibia', '264'],
  ['NP', 'Nepal', '977', 10],
  ['NL', 'Netherlands', '31', 9],
  ['NZ', 'New Zealand', '64'],
  ['NI', 'Nicaragua', '505', 8],
  ['NE', 'Niger', '227', 8],
  ['NG', 'Nigeria', '234', 10],
  ['MK', 'North Macedonia', '389', 8],
  ['NO', 'Norway', '47', 8],
  ['OM', 'Oman', '968', 8],
  ['PK', 'Pakistan', '92', 10],
  ['PS', 'Palestine', '970', 9],
  ['PA', 'Panama', '507', 8],
  ['PG', 'Papua New Guinea', '675'],
  ['PY', 'Paraguay', '595', 9],
  ['PE', 'Peru', '51', 9],
  ['PH', 'Philippines', '63', 10],
  ['PL', 'Poland', '48', 9],
  ['PT', 'Portugal', '351', 9],
  ['PR', 'Puerto Rico', '1787'],
  ['QA', 'Qatar', '974', 8],
  ['RO', 'Romania', '40', 9],
  ['RU', 'Russia', '7', 10],
  ['RW', 'Rwanda', '250', 9],
  ['SA', 'Saudi Arabia', '966', 9],
  ['SN', 'Senegal', '221', 9],
  ['RS', 'Serbia', '381'],
  ['SC', 'Seychelles', '248', 7],
  ['SL', 'Sierra Leone', '232', 8],
  ['SG', 'Singapore', '65', 8],
  ['SK', 'Slovakia', '421', 9],
  ['SI', 'Slovenia', '386', 8],
  ['SO', 'Somalia', '252'],
  ['ZA', 'South Africa', '27', 9],
  ['KR', 'South Korea', '82', 10],
  ['SS', 'South Sudan', '211', 9],
  ['ES', 'Spain', '34', 9],
  ['LK', 'Sri Lanka', '94', 9],
  ['SD', 'Sudan', '249', 9],
  ['SR', 'Suriname', '597'],
  ['SE', 'Sweden', '46', 9],
  ['CH', 'Switzerland', '41', 9],
  ['SY', 'Syria', '963', 9],
  ['TW', 'Taiwan', '886', 9],
  ['TJ', 'Tajikistan', '992', 9],
  ['TZ', 'Tanzania', '255', 9],
  ['TH', 'Thailand', '66', 9],
  ['TL', 'Timor-Leste', '670'],
  ['TG', 'Togo', '228', 8],
  ['TT', 'Trinidad & Tobago', '1868'],
  ['TN', 'Tunisia', '216', 8],
  ['TR', 'Türkiye', '90', 10],
  ['TM', 'Turkmenistan', '993', 8],
  ['UG', 'Uganda', '256', 9],
  ['UA', 'Ukraine', '380', 9],
  ['AE', 'United Arab Emirates', '971', 9],
  ['GB', 'United Kingdom', '44', 10],
  ['US', 'United States', '1', 10],
  ['UY', 'Uruguay', '598', 8],
  ['UZ', 'Uzbekistan', '998', 9],
  ['VE', 'Venezuela', '58', 10],
  ['VN', 'Vietnam', '84', 9],
  ['YE', 'Yemen', '967', 9],
  ['ZM', 'Zambia', '260', 9],
  ['ZW', 'Zimbabwe', '263', 9],
];

export const countries: Country[] = DATA.map(([iso, name, dial, nsn]) => ({ iso, name, dial, nsn }));

const byIso = new Map(countries.map((c) => [c.iso, c]));

/** Falls back rather than throwing: a bad ISO must not lose us the enquiry. */
export const DEFAULT_COUNTRY = 'IN';

export function countryOf(iso: string | undefined | null): Country {
  return (iso && byIso.get(iso.toUpperCase())) || byIso.get(DEFAULT_COUNTRY)!;
}

export function isCountry(iso: string): boolean {
  return byIso.has(iso.toUpperCase());
}

/**
 * Flag as an emoji built from the ISO code's regional indicator letters, so
 * there are no flag images to ship, resize or keep in sync. Windows renders
 * these as letter pairs rather than flags, which is why the country name and
 * dialling code are always shown as well and never replaced by the flag.
 */
export function flagOf(iso: string): string {
  return iso
    .toUpperCase()
    .replace(/[^A-Z]/g, '')
    .split('')
    .map((c) => String.fromCodePoint(127397 + c.charCodeAt(0)))
    .join('');
}

/** Markets we sell into most, lifted to the top of the list. */
export const PRIORITY_ISO = ['IN', 'AE', 'US', 'GB', 'CA', 'AU', 'SG', 'SA', 'ZA', 'NZ'];

/** Rebuilds the full international number from what the form submitted. */
export function toE164(iso: string, nationalDigits: string): string {
  return `+${countryOf(iso).dial}${nationalDigits}`;
}
