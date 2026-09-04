import type {
  CreatePlaylistArgs,
  Payload,
  PlaylistData,
  PlaylistsResponse,
  UpdatePlaylistArgs,
} from './playlistsApi.types';
import { baseApi } from '@/app/api/baseApi';

export const playlistApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    fetchPlaylists: build.query<PlaylistsResponse, void>({
      query: () => 'playlists',
      providesTags: ['Playlist'],
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
      invalidatesTags: ['Playlist'],
    }),

    deletePlaylist: build.mutation<void, string>({
      query: (id) => ({
        method: 'DELETE',
        url: `playlists/${id}`,
      }),
      invalidatesTags: ['Playlist'],
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
      invalidatesTags: ['Playlist'],
    }),
  }),
});

export const {
  useFetchPlaylistsQuery,
  useCreatePlaylistMutation,
  useDeletePlaylistMutation,
  useUpdatePlaylistMutation,
} = playlistApi;
