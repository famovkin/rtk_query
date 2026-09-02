import { useUpdatePlaylistMutation } from '@/features/Playlists/api/playlistApi';
import type { UpdatePlaylistArgs } from '@/features/Playlists/api/playlistsApi.types';
import type { FC } from 'react';
import {
  type SubmitHandler,
  type UseFormHandleSubmit,
  type UseFormRegister,
} from 'react-hook-form';

type EditPlaylistFormProps = {
  editedPlaylistId: string;
  setEditedPlaylistId: (playlistId: null) => void;
  editPlaylist: (playlist: null) => void;
  register: UseFormRegister<UpdatePlaylistArgs>;
  handleSubmit: UseFormHandleSubmit<UpdatePlaylistArgs>;
};

const EditPlaylistForm: FC<EditPlaylistFormProps> = ({
  editedPlaylistId,
  setEditedPlaylistId,
  editPlaylist,
  register,
  handleSubmit,
}) => {
  const [updatePlaylist] = useUpdatePlaylistMutation();

  const onSubmit: SubmitHandler<UpdatePlaylistArgs> = (data) => {
    if (!editedPlaylistId) return;

    updatePlaylist({
      playlistId: editedPlaylistId,
      body: {
        data: {
          type: 'playlists',
          attributes: {
            ...data,
          },
        },
      },
    })
      .unwrap()
      .then(() => setEditedPlaylistId(null));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Edit playlist</h2>
      <div>
        <input {...register('title')} placeholder={'title'} />
      </div>
      <button type={'submit'}>save</button>
      <button type={'button'} onClick={() => editPlaylist(null)}>
        cancel
      </button>
    </form>
  );
};

export default EditPlaylistForm;
