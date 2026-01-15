//ToDo: TEMPORAL BORRAR Y REEMPLAZAR POR BASE DE DATOS
import { useQuery } from '@tanstack/react-query'; // Asumiendo usas react-query como en useOneProductQuery

export const fetchCustomDesignPrice = async () =>
  // TODO: API call a /api/configs/custom_design_price
  5000; // Simulado; reemplaza con fetch real

export const useCustomDesignPrice = () =>
  useQuery({ queryKey: ['custom_design_price'], queryFn: fetchCustomDesignPrice });
