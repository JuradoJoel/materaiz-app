import { Product } from 'src/models/Product';

/* Determina si un producto es un mate principal (para ofrecer bombilla como add-on)
 Excluye accesorios como portamates, sets materos, yerberas, etc. */
export const isMateProduct = (product: Product): boolean => {
  const name = product.name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

  // Productos que sean accesorio o complemento: NO ofrece bombilla
  const excludePatterns = [
    'portamate',
    'porta mate',
    'matero',
    'set matero',
    'bolso matero',
    'kit matero',
    'funda mate',
    'matera',
    'yerbera',
    'azucarera',
    'termo',
    'bombilla',
    'limpiador',
    'soporte mate',
    'combo',
    'kit',
  ];

  for (const pattern of excludePatterns) {
    if (name.includes(pattern)) {
      return false;
    }
  }
  return name.includes('mate') || name.includes('maté');
};
