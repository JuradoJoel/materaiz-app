import { Helmet } from 'react-helmet-async';
import { Container, Typography } from '@mui/material';
import { APP_NAME } from 'src/config';
import Header from './Header';
import ProductList from './ProductList';
import Footer from './Footer';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

function FilteredProducts() {
  const { category } = useParams<{ category: string }>();
  const { t } = useTranslation();
  const categoryTranslations: { [key: string]: string } = {
    kit: 'homePage.categoryKit',
    combo: 'homePage.categoryCombo',
    termo: 'homePage.categoryTermo',
    mate: 'homePage.categoryMate',
  };

  return (
    <>
      <Helmet>
        <title> Categorías | {APP_NAME}</title>
      </Helmet>

      <Header />
      <Container>
        <Typography variant="h4" sx={{ textTransform: 'uppercase', margin: 2 }}>
          {t(categoryTranslations[category || ''] || category || t('homePage.promo'))}
        </Typography>
        <ProductList category={category} />
      </Container>
      <Footer />
    </>
  );
}

export default FilteredProducts;
