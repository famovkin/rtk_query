import type { FC } from 'react';

import type { PlaylistData } from '@/features/Playlists/api/playlistsApi.types';

type PlaylistItemProp = {
  playlist: PlaylistData;
  deletePlaylist: (playlistId: string) => void;
  editPlaylist: (playlist: PlaylistData) => void;
};

export const PlaylistItem: FC<PlaylistItemProp> = ({
  playlist,
  deletePlaylist,
  editPlaylist,
}) => {
  return (
    <>
      <div>title: {playlist.attributes.title}</div>
      <div>userName: {playlist.attributes.user.name}</div>
      <button onClick={() => deletePlaylist(playlist.id)}>delete</button>
      <button onClick={() => editPlaylist(playlist)}>update</button>
    </>
  );
};

export default PlaylistItem;
