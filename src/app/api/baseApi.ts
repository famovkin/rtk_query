import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './baseQueryWithReauth';

export const baseApi = createApi({
  reducerPath: 'baseApi',
  // Время жизни кэша
  // keepUnusedDataFor: 5,

  // refetchOnFocus: true,
  // refetchOnReconnect: true,
  tagTypes: ['Playlist', 'Auth'],
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
  // skipSchemaValidation: import.meta.env.PROD
});
