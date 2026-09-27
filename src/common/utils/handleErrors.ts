import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { isErrorWithProperty } from './isErrorWithProperty';
import { isErrorWithDetailArray } from './isErrorWithDetailArray';
import { trimToMaxLength } from './trimToMaxLength';
import { errorToast } from './errorToast';

export const handleErrors = (error: FetchBaseQueryError) => {
  switch (error.status) {
    case 'TIMEOUT_ERROR':
    case 'CUSTOM_ERROR':
    case 'FETCH_ERROR':
    case 'PARSING_ERROR':
      errorToast(error.error);
      break;

    case 404:
      if (isErrorWithProperty(error.data, 'error')) {
        errorToast(error.data.error);
      }
      break;

    case 400:
    case 403:
      if (isErrorWithDetailArray(error.data)) {
        errorToast(trimToMaxLength(error.data.errors[0].detail));
      } else {
        errorToast(JSON.stringify(error.data));
      }
      break;

    case 401:
    case 429:
      // 1. Type Assertion
      // errorToast((error.data as { message: string }).message);

      // 2. JSON.stringify
      // errorToast(JSON.stringify(error.data));

      // 3. Type predicate
      if (isErrorWithProperty(error.data, 'message')) {
        errorToast(error.data.message);
      } else {
        errorToast(JSON.stringify(error.data));
      }
      break;

    default:
      if (error.status >= 500 && error.status < 600) {
        errorToast('Server error occurred. Please try again later.');
      } else {
        errorToast('Some error occurred');
      }
  }
};
