import { Header } from '@/common/components';
import { Routing } from '@/common/routing';

import s from './App.module.css';

const App = () => {
  return (
    <>
      <Header />
      <div className={s.layout}>
        <Routing />
      </div>
    </>
  );
};

export default App;
