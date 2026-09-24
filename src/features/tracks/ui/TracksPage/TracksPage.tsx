import { useFetchTracksInfiniteQuery } from '../../api/tracksApi';
import { useInfiniteScroll } from '@/common/hooks';
import TracksList from '../TracksList/TracksList';
import LoadingTrigger from '../LoadingTrigger/LoadingTrigger';

const TracksPage = () => {
  const {
    data,
    // isLoading,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useFetchTracksInfiniteQuery();

  const tracks = data?.pages.map((page) => page.data).flat() || [];
  // const pages = data?.pages.flatMap(page => page.data)

  const { observerRef } = useInfiniteScroll({
    hasNextPage,
    isFetching,
    fetchNextPage,
  });

  return (
    <div>
      <h1>Tracks page</h1>
      <TracksList tracks={tracks} />

      {/* {!isLoading && (
        <>
          {hasNextPage ? (
            <button onClick={loadMoreHandler} disabled={isFetching}>
              {isFetchingNextPage ? 'Loading...' : 'Load More'}
            </button>
          ) : (
            <p>Nothing more to load</p>
          )}
        </>
      )} */}

      {hasNextPage && (
        <LoadingTrigger
          isFetchingNextPage={isFetchingNextPage}
          observerRef={observerRef}
        />
      )}

      {!hasNextPage && tracks.length > 0 && <p>Nothing more to load</p>}
    </div>
  );
};

export default TracksPage;
