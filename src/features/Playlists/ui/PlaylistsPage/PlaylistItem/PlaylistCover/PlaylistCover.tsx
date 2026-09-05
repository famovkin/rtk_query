import type { ChangeEvent, FC } from 'react';

import defaultCover from '@/assets/images/default-playlist-cover.png';
import {
  useDeletePlaylistCoverMutation,
  useUploadPlaylistCoverMutation,
} from '@/features/Playlists/api/playlistApi';
import type { Images } from '@/common/types';

import s from './PlaylistCover.module.css';
import { toast } from 'react-toastify';

const allowedCoverTypes = ['image/jpeg', 'image/png', 'image/gif'];
const maxCoverSize = 1024 * 1024;

type PlaylistCoverType = {
  playlistId: string;
  images: Images;
};

const PlaylistCover: FC<PlaylistCoverType> = ({ playlistId, images }) => {
  const [uploadPlaylistCover] = useUploadPlaylistCoverMutation();
  const [deletePlaylistCover] = useDeletePlaylistCoverMutation();

  const originalCover = images.main.find((cover) => cover.type === 'original');
  const srcCover = originalCover ? originalCover.url : defaultCover;

  const uploadPlaylistCoverHandler = (
    event: ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) => {
    const file = event?.target?.files?.[0];

    if (!file) return;

    if (!allowedCoverTypes.includes(file.type)) {
      toast('Only JPEG, PNG or GIF images are allowed', {
        type: 'error',
        theme: 'colored',
      });
      return;
    }

    if (file.size > maxCoverSize) {
      toast(
        `The file is too large (max. ${Math.round(maxCoverSize / 1024)} KB)`,
        {
          type: 'error',
          theme: 'colored',
        },
      );
      return;
    }

    uploadPlaylistCover({
      playlistId,
      file,
    });
  };

  return (
    <>
      <img className={s.cover} src={srcCover} width="240px" alt="cover" />
      <input
        type="file"
        onChange={uploadPlaylistCoverHandler}
        accept="image/jpeg,image/png,image/gif"
      />
      {originalCover && (
        <button onClick={() => deletePlaylistCover(playlistId)}>
          delete cover
        </button>
      )}
    </>
  );
};

export default PlaylistCover;
