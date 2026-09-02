import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
  CreatePlaylistArgs,
  Payload,
  PlaylistData,
  PlaylistsResponse,
  UpdatePlaylistArgs,
} from './playlistsApi.types';

export const playlistApi = createApi({
  reducerPath: 'playlistApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    headers: {
      'API-KEY': import.meta.env.VITE_API_KEY,
    },
    prepareHeaders: (headers) => {
      headers.set(
        'Authorization',
        `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
      );
      return headers;
    },
  }),
  endpoints: (build) => ({
    fetchPlaylists: build.query<PlaylistsResponse, void>({
      query: () => 'playlists',
    }),

    createPlaylist: build.mutation<
      { data: PlaylistData },
      Payload<CreatePlaylistArgs>
    >({
      query: (body) => ({
        method: 'POST',
        url: 'playlists',
        body,
      }),
    }),

    deletePlaylist: build.mutation<void, string>({
      query: (id) => ({
        method: 'DELETE',
        url: `playlists/${id}`,
      }),
    }),

    updatePlaylist: build.mutation<
      void,
      { playlistId: string; body: Payload<UpdatePlaylistArgs> }
    >({
      query: ({ playlistId, body }) => ({
        method: 'PUT',
        url: `playlists/${playlistId}`,
        body,
      }),
    }),
  }),
});

export const {
  useFetchPlaylistsQuery,
  useCreatePlaylistMutation,
  useDeletePlaylistMutation,
  useUpdatePlaylistMutation,
} = playlistApi;
