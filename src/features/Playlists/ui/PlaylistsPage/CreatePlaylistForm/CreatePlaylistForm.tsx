import { useCreatePlaylistMutation } from '@/features/Playlists/api/playlistApi';
import type { CreatePlaylistArgs } from '@/features/Playlists/api/playlistsApi.types';
import { useForm, type SubmitHandler } from 'react-hook-form';

export const CreatePlaylistForm = () => {
  const { register, handleSubmit, setValue } = useForm<CreatePlaylistArgs>();

  const [createPlaylist] = useCreatePlaylistMutation();

  const onSubmit: SubmitHandler<CreatePlaylistArgs> = (data) => {
    createPlaylist({
      data: {
        type: 'playlists',
        attributes: {
          ...data,
        },
      },
    })
      .unwrap()
      .then(() => {
        setValue('title', '');
        setValue('description', '');
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Create new playlist</h2>
      <div>
        <input {...register('title')} placeholder={'title'} />
      </div>
      <div>
        <input {...register('description')} placeholder={'description'} />
      </div>
      <button>create playlist</button>
    </form>
  );
};
