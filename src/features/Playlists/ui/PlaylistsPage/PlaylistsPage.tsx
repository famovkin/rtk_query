import { Pagination } from '@/common/components';
import { useDebounceValue } from '@/common/hooks';
import { useState, type ChangeEvent } from 'react';
import { useFetchPlaylistsQuery } from '../../api/playlistApi';
import { CreatePlaylistForm } from './CreatePlaylistForm/CreatePlaylistForm';
import PlaylistList from './PlaylistList/PlaylistList';

import s from './PlaylistsPage.module.css';

const PlaylistsPage = () => {
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(2);

  const deboucedSearch = useDebounceValue(search);
  const { data, isLoading } = useFetchPlaylistsQuery(
    {
      search: deboucedSearch,
      pageNumber: currentPage,
      pageSize,
    },
    // {
    // refetchOnFocus: true,
    // refetchOnReconnect: true,
    // pollingInterval: 3000,
    // skipPollingIfUnfocused: true,
    // }
  );

  const changePageSizeHandler = (size: number) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  const searchPlaylistHandler = (
    e: ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) => {
    setCurrentPage(1);
    setSearch(e.target.value);
  };

  if (isLoading) return <p>Skeleton loader</p>;

  return (
    <div className={s.container}>
      <h1>Playlists page</h1>
      <CreatePlaylistForm />
      <input
        value={search}
        onChange={(e) => searchPlaylistHandler(e)}
        type="search"
        placeholder={'Search playlist by title'}
      />
      <PlaylistList
        playlists={data?.data || []}
        isPlaylistLoading={isLoading}
      />
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        pagesCount={data?.meta.pagesCount || 1}
        pageSize={pageSize}
        changePageSize={changePageSizeHandler}
      />
    </div>
  );
};

export default PlaylistsPage;
