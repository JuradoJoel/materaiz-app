import {
  Box,
  Collapse,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { PATHS } from 'src/routes/paths';
import Iconify from 'src/components/iconify';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { Category } from 'src/models/Category';

interface CategoriesNavButtonProps {
  categories: Category[] | undefined;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

export const CategoriesNavButton = ({
  categories,
  isOpen,
  onToggle,
  onClose,
}: CategoriesNavButtonProps) => {
  const navigate = useNavigate();
  if (!categories) return null;

  const categoriesData = categories || [];
  const hasCategories = categoriesData.length > 0;

  return (
    <>
      <ListItemButton onClick={onToggle}>
        <Box display="flex" justifyContent="space-between" alignItems="center" width={'100%'}>
          <Box display="flex" alignItems="center">
            <ListItemIcon>
              <Iconify icon="solar:clipboard-list-outline" />
            </ListItemIcon>
            <ListItemText sx={{ fontSize: 14 }} primary={'Categorías'} />
          </Box>
          {isOpen ? <ExpandMore /> : <Iconify icon="material-symbols:chevron-right" />}
        </Box>
      </ListItemButton>
      <Collapse in={isOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {hasCategories ? (
            categoriesData.map((category, index) => (
              <Box key={category.id}>
                <Box sx={{ display: 'flex' }}>
                  <ListItemButton
                    sx={{ py: 2 }}
                    onClick={() => {
                      onClose();
                      navigate(PATHS.home.root);
                    }}
                  >
                    <ListItemText
                      sx={{
                        fontSize: 14,
                        mr: 1,
                        '& .MuiListItemText-primary': {
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        },
                      }}
                      primary={category.name}
                    />
                    <Iconify
                      icon="material-symbols-light:arrow-forward-rounded"
                      sx={{
                        width: 18,
                        height: 18,
                        flexShrink: 0,
                      }}
                    />
                  </ListItemButton>
                </Box>
                {index !== categoriesData.length - 1 && <Divider variant="middle" />}
              </Box>
            ))
          ) : (
            <Box sx={{ display: 'flex' }} py={1}>
              <ListItemButton>
                <ListItemText
                  sx={{ fontSize: 14, color: 'text.secondary', textAlign: 'center' }}
                  primary={'No hay categorías'}
                />
              </ListItemButton>
            </Box>
          )}
        </List>
      </Collapse>
    </>
  );
};
