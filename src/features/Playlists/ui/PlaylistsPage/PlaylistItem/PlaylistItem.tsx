import type { FC } from 'react';

import PlaylistDescription from './PlaylistDescription/PlaylistDescription';
import PlaylistCover from './PlaylistCover/PlaylistCover';

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
      <PlaylistCover
        playlistId={playlist.id}
        images={playlist.attributes.images}
      />
      <PlaylistDescription
        title={playlist.attributes.title}
        name={playlist.attributes.user.name}
      />
      <button onClick={() => deletePlaylist(playlist.id)}>delete</button>
      <button onClick={() => editPlaylist(playlist)}>update</button>
    </>
  );
};

export default PlaylistItem;
