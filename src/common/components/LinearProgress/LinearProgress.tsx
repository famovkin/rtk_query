import type { FC } from 'react';

import s from './LinearProgress.module.css';

type LinearProgressProps = {
  height?: number;
};

export const LinearProgress: FC<LinearProgressProps> = ({
  height = 4,
}: LinearProgressProps) => {
  return (
    <div className={s.root} style={{ height }}>
      <div className={`${s.bar} ${s.indeterminate1}`} />
      <div className={`${s.bar} ${s.indeterminate2}`} />
    </div>
  );
};

export default LinearProgress;
