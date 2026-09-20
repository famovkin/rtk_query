import { useGetMeQuery } from '../../api/authApi';

const ProfilePage = () => {
  const { data } = useGetMeQuery();

  return <h1>{data?.login} page</h1>;
};

export default ProfilePage;
