export const queryParam: string = "sizes";

const defaultParams = [100, 46, 21, 60, 24];

export const defaultQueryParamValues: string = `?${queryParam}=${encodeURIComponent(
  JSON.stringify(defaultParams)
)}`;
