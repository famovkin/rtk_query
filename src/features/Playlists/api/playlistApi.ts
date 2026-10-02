import type { Images } from '@/common/types';
import type {
  CreatePlaylistArgs,
  FetchPlaylistsArgs,
  Payload,
  PlaylistData,
  UpdatePlaylistArgs,
} from './playlistsApi.types';
import { baseApi } from '@/app/api/baseApi';
import {
  playlistCreateResponseSchema,
  playlistsResponseSchema,
} from '../model/playlist.schemas';
import { withZodCatch } from '@/common/utils';
import { imagesSchema } from '@/common/schemas';

export const playlistApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    fetchPlaylists: build.query({
      query: (params: FetchPlaylistsArgs) => ({ url: 'playlists', params }),
      ...withZodCatch(playlistsResponseSchema),
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
      ...withZodCatch(playlistCreateResponseSchema),
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
      query: ({ playlistId, body }) => {
        return {
          method: 'PUT',
          url: `playlists/${playlistId}`,
          body,
        };
      },
      onQueryStarted: async (queryArgument, mutationLifeCycleApi) => {
        const { body, playlistId } = queryArgument;
        const { queryFulfilled, dispatch, getState } = mutationLifeCycleApi;
        const args = playlistApi.util.selectCachedArgsForQuery(
          getState(),
          'fetchPlaylists',
        );

        const patchCollections: any[] = [];

        args.forEach((args) => {
          patchCollections.push(
            dispatch(
              playlistApi.util.updateQueryData(
                'fetchPlaylists',
                {
                  pageNumber: args.pageNumber,
                  pageSize: args.pageSize,
                  search: args.search,
                },
                (state) => {
                  const index = state.data.findIndex(
                    (playlist) => playlist.id === playlistId,
                  );

                  if (index !== 1) {
                    state.data[index].attributes = {
                      ...state.data[index].attributes,
                      ...body.data.attributes,
                    };
                  }
                },
              ),
            ),
          );
        });

        try {
          await queryFulfilled;
        } catch (e) {
          console.log(e);
          patchCollections.forEach((patchCollection) => patchCollection.undo());
        }
      },
      invalidatesTags: ['Playlist'],
    }),

    uploadPlaylistCover: build.mutation<
      Images,
      { playlistId: string; file: File }
    >({
      query: ({ playlistId, file }) => {
        const formData = new FormData();
        formData.append('file', file);

        return {
          method: 'POST',
          url: `playlists/${playlistId}/images/main`,
          body: formData,
        };
      },
      ...withZodCatch(imagesSchema),
      invalidatesTags: ['Playlist'],
    }),

    deletePlaylistCover: build.mutation<void, string>({
      query: (playlistId) => ({
        method: 'DELETE',
        url: `playlists/${playlistId}/images/main`,
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
  useUploadPlaylistCoverMutation,
  useDeletePlaylistCoverMutation,
} = playlistApi;
