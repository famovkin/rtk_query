import type {
  FetchBaseQueryError,
  NamedSchemaError,
} from '@reduxjs/toolkit/query';
import { errorToast } from './errorToast';
import type { ZodType } from 'zod';

export const withZodCatch = <T extends ZodType>(schema: T) => {
  return {
    responseSchema: schema,
    catchSchemaFailure: (err: NamedSchemaError): FetchBaseQueryError => {
      console.log('error')
      errorToast('Zod error. Details in the console', err.issues);
      return { status: 'CUSTOM_ERROR', error: 'Schema validation failed' };
    },
  };
};
