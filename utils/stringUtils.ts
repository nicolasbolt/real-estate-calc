export function camelCaseToWords(input: string): string {
    return input
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, str => str.toUpperCase())
        .replace(/\s./g, str => str.toUpperCase());
}