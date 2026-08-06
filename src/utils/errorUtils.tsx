import { ERROR_MESSAGES } from "../constants/messages";

type RequestType = "books" | "page";

export const getErrorMessage = (status: number, requestType: RequestType) => {
  if (status === 404) {
    return ERROR_MESSAGES.NOT_FOUND;
  }
  if (status === 500) {
    return ERROR_MESSAGES.SERVER_ERROR;
  }
  if (requestType === "books") {
    return ERROR_MESSAGES.FETCH_BOOKS_FAILED;
  }
  if (requestType === "page") {
    return ERROR_MESSAGES.FETCH_PAGE_FAILED;
  }
  return ERROR_MESSAGES.COMMON;
};
