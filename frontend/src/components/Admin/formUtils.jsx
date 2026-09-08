// type="number" inputs can silently drop the decimal point on some
// keyboard layouts (e.g. a coordinate like 20.0837... gets typed in as
// 200837...), so lat/lon fields use plain text inputs and validate here
// instead of relying on the browser's number parsing.
export const isCoordinate = (value) => /^-?\d+(\.\d+)?$/.test(String(value).trim());
