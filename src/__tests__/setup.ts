import '@testing-library/jest-dom/vitest';

window.scrollTo = () => {};

if (!URL.createObjectURL) {
  URL.createObjectURL = () => 'blob:mock-csv-url';
}
if (!URL.revokeObjectURL) {
  URL.revokeObjectURL = () => {};
}
