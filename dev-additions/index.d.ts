// /**
//  * @description Converts a dictionary from one form to another.
//  * @returns The formatted dictionary. Dictionary is returned as a `string` if output is in CSV format and returned as an `object` if output is in JSON format.
//  */
// export function convertDict(
//   dict: object,
//   sortBy: 'keyword' | 'language',
//   to: 'csv' | 'json'
// ): string | object;

/**
 * @description Inspects the dictionary. Checks for invalid keywords and untallied localizations.
 * @returns False if dictionary has error(s).
 */
export function inspectDict(dict: object): boolean;

/**
 * @description Helps convert legacy structured dictionaries into newer ones.
 * You should use JSON.stringify on the returned value of this function and save it as your actual dictionary.
 * @returns The dictionary in new format, structured by keywords.
 */
export function convertDict(dict: Array<object>): object;

// /**
//  * @description
//  * @returns Does the project contain any error
//  */
// export function inspectProject(dict: object): boolean;
