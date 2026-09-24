import type { FC, RefObject } from 'react';

type LoadingTriggerProps = {
  observerRef: RefObject<HTMLDivElement | null>;
  isFetchingNextPage: boolean;
};

const LoadingTrigger: FC<LoadingTriggerProps> = ({
  observerRef,
  isFetchingNextPage,
}) => {
  return (
    <div ref={observerRef}>
      {isFetchingNextPage ? (
        <div>Loading more tracks...</div>
      ) : (
        <div style={{ height: 20, border: '1px solid red' }} />
      )}
    </div>
  );
};

export default LoadingTrigger;
