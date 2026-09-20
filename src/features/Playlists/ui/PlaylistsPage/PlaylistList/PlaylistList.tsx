import { useState, type FC } from 'react';
import s from './PlaylistList.module.css';
import type {
  PlaylistData,
  UpdatePlaylistArgs,
} from '@/features/Playlists/api/playlistsApi.types';
import EditPlaylistForm from '../EditPlaylistForm/EditPlaylistForm';
import { useForm } from 'react-hook-form';
import PlaylistItem from '../PlaylistItem/PlaylistItem';
import { useDeletePlaylistMutation } from '@/features/Playlists/api/playlistApi';

type PlaylistListProps = {
  playlists: PlaylistData[],
  isPlaylistLoading: boolean;
};

const PlaylistList: FC<PlaylistListProps> = ({ playlists, isPlaylistLoading }) => {
  const [editedPlaylistId, setEditedPlaylistId] = useState<string | null>(null);

  const { register, handleSubmit, reset } = useForm<UpdatePlaylistArgs>();
  const [deletePlaylist] = useDeletePlaylistMutation();

  const editPlaylistHandler = (playlist: PlaylistData | null) => {
    if (playlist) {
      setEditedPlaylistId(playlist.id);
      reset({
        title: playlist.attributes.title,
        tagIds: playlist.attributes.tags.map((t) => t.id),
        description: '',
      });
    } else {
      setEditedPlaylistId(null);
    }
  };

  const deletePlaylistHandler = (playlistId: string) => {
    if (confirm('Are you sure you want to delete the playlist?')) {
      deletePlaylist(playlistId);
    }
  };

  return (
    <div className={s.items}>
      {!playlists.length && !isPlaylistLoading && <h2>Playlists not found</h2>}
      {playlists.map((playlist) => {
        const isEditing = editedPlaylistId === playlist.id;

        return (
          <div className={s.item} key={playlist.id}>
            {isEditing ? (
              <EditPlaylistForm
                editedPlaylistId={editedPlaylistId}
                setEditedPlaylistId={setEditedPlaylistId}
                editPlaylist={editPlaylistHandler}
                register={register}
                handleSubmit={handleSubmit}
              />
            ) : (
              <PlaylistItem
                playlist={playlist}
                deletePlaylist={deletePlaylistHandler}
                editPlaylist={editPlaylistHandler}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default PlaylistList;
