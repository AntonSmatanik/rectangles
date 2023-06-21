import { isArrayOfNumbers } from "../functions";

const useParseParam = (
  searchParams: URLSearchParams,
  queryParam: string,
  sizesRef: React.MutableRefObject<number[]>
): { errorMessage: string } => {
  const paramValue = searchParams.get(queryParam);

  let errorMessage: string = "";

  if (!paramValue) {
    errorMessage = `Query parameter '${queryParam}' is missing`;
  } else {
    try {
      const parsedParam = JSON.parse(paramValue);

      if (Array.isArray(parsedParam)) {
        if (parsedParam.length === 0) {
          errorMessage = `Query parameter '${queryParam}' is an empty array`;
        } else {
          if (!isArrayOfNumbers(parsedParam)) {
            errorMessage = `Query parameter '${queryParam}' must be an array of numbers`;
          } else {
            sizesRef.current = parsedParam;
          }
        }
      } else {
        errorMessage = `Query parameter '${queryParam}' must be an array`;
      }
    } catch (e) {
      errorMessage = `Query parameter '${queryParam}' is malformed`;
    }
  }

  return { errorMessage };
};

export default useParseParam;
