export const bytesToMegaBytes = (bytes: number, digits: number = 3) =>
  parseFloat((bytes / (1024 * 1024)).toFixed(digits))
