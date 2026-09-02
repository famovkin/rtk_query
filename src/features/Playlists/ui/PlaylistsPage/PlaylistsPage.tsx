import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  useDeletePlaylistMutation,
  useFetchPlaylistsQuery,
} from '../../api/playlistApi';
import type {
  PlaylistData,
  UpdatePlaylistArgs,
} from '../../api/playlistsApi.types';
import { CreatePlaylistForm } from './CreatePlaylistForm/CreatePlaylistForm';
import EditPlaylistForm from './EditPlaylistForm/EditPlaylistForm';
import PlaylistItem from './PlaylistItem/PlaylistItem';

import s from './PlaylistsPage.module.css';

const PlaylistsPage = () => {
  const [editedPlaylistId, setEditedPlaylistId] = useState<string | null>(null);
  const { register, handleSubmit, reset } = useForm<UpdatePlaylistArgs>();
  const { data } = useFetchPlaylistsQuery();
  const [deletePlaylist] = useDeletePlaylistMutation();

  const deletePlaylistHandler = (playlistId: string) => {
    if (confirm('Are you sure you want to delete the playlist?')) {
      deletePlaylist(playlistId);
    }
  };

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

  return (
    <div className={s.container}>
      <h1>Playlists page</h1>
      <CreatePlaylistForm />
      <div className={s.items}>
        {data?.data.map((playlist) => {
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
    </div>
  );
};

export default PlaylistsPage;
