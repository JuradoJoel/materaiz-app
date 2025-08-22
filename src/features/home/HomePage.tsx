import { Helmet } from 'react-helmet-async';
import { APP_NAME } from 'src/config';
import Header from './Header';
import Body from './Body';
import Footer from './Footer';

function HomePage() {
  return (
    <>
      <Helmet>
        <title> Home | {APP_NAME}</title>
      </Helmet>

      <Header />
      <Body />
      <Footer />
    </>
  );
}

export default HomePage;
