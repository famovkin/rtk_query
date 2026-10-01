import { useFetchPlaylistsQuery } from '@/features/Playlists/api/playlistApi';
import { useGetMeQuery } from '../../api/authApi';
import PlaylistList from '@/features/Playlists/ui/PlaylistsPage/PlaylistList/PlaylistList';
import { CreatePlaylistForm } from '@/features/Playlists/ui/PlaylistsPage/CreatePlaylistForm/CreatePlaylistForm';
import { Path } from '@/common/routing';
import { Navigate } from 'react-router';

import s from './ProfilePage.module.css';

const ProfilePage = () => {
  const { data: meData, isLoading: isMeLoading } = useGetMeQuery();

  const { data: playlistData, isLoading: isPlaylistLoading } = useFetchPlaylistsQuery(
    {
      userId: meData?.userId,
    },
    { skip: !meData?.userId },
  );

  if (!isMeLoading && !meData) return <Navigate to={Path.Playlists} />

  if (isMeLoading || isPlaylistLoading) return <p>Skeleton loader</p>;


  return (
    <>
      <h1>{meData?.login} page</h1>
      <div className={s.container}>
        <CreatePlaylistForm />
        <PlaylistList
          playlists={playlistData?.data || []}
          isPlaylistLoading={isMeLoading || isPlaylistLoading}
        />
      </div>
    </>
  );
};

export default ProfilePage;
