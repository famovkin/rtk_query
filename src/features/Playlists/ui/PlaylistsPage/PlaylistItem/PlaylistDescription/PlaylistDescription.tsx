import type { FC } from 'react';

type PlaylistDescriptionType = {
  title: string;
  name: string;
};

const PlaylistDescription: FC<PlaylistDescriptionType> = ({ title, name }) => {
  return (
    <>
      <div>title: {title}</div>
      <div>userName: {name}</div>
    </>
  );
};

export default PlaylistDescription;
