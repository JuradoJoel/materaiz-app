import { Helmet } from 'react-helmet-async';
import { APP_NAME } from 'src/config';
import Header from './Header';

function HomePage() {
  return (
    <>
      <Helmet>
        <title> Home | {APP_NAME}</title>
      </Helmet>
      
      <Header />
    </>
  );
}

export default HomePage;
