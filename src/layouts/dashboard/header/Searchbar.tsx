import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import { memo, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// @mui
import {
  Box,
  ClickAwayListener,
  InputAdornment,
  InputBase,
  Popper,
  PopperProps,
  Slide,
} from '@mui/material';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { alpha, styled } from '@mui/material/styles';
// utils
import { bgBlur } from '../../../utils/cssStyles';
import flattenArray from '../../../utils/flattenArray';
// components
import { IconButtonAnimate } from '../../../components/animate';
import Iconify from '../../../components/iconify';
import { NavListProps } from '../../../components/nav-section';
import SearchNotFound from '../../../components/search-not-found';
//
import useNavConfig from '../nav/config';
import { useHomeProducts  } from 'src/api/productRepository';
import { formatText } from 'src/utils/formatText';

// ----------------------------------------------------------------------

const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 92;

const StyledSearchbar = styled('div')(({ theme }) => ({
  ...bgBlur({ color: theme.palette.background.default }),
  top: 0,
  left: 0,
  zIndex: 99,
  width: '100%',
  display: 'flex',
  position: 'absolute',
  alignItems: 'center',
  height: APPBAR_MOBILE,
  padding: theme.spacing(0, 3),
  boxShadow: theme.customShadows.z8,
  [theme.breakpoints.up('md')]: {
    height: APPBAR_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

const StyledPopper = styled((props: PopperProps) => <Popper {...props} />)(({ theme }) => ({
  left: `8px !important`,
  top: `${APPBAR_MOBILE + 8}px !important`,
  width: 'calc(100% - 16px) !important',
  transform: 'none !important',
  [theme.breakpoints.up('md')]: {
    top: `${APPBAR_DESKTOP + 8}px !important`,
  },
  '& .MuiAutocomplete-paper': {
    padding: theme.spacing(1, 0),
  },
  '& .MuiListSubheader-root': {
    '&.MuiAutocomplete-groupLabel': {
      ...bgBlur({ color: theme.palette.background.neutral }),
      ...theme.typography.overline,
      top: 0,
      margin: 0,
      lineHeight: '48px',
      borderRadius: theme.shape.borderRadius,
    },
  },
  '& .MuiAutocomplete-listbox': {
    '& .MuiAutocomplete-option': {
      padding: theme.spacing(0.5, 2),
      margin: 0,
      display: 'block',
      border: `dashed 1px transparent`,
      borderBottomColor: theme.palette.divider,
      '&:last-of-type': {
        borderBottomColor: 'transparent',
      },
      '&:hover': {
        borderColor: theme.palette.primary.main,
        backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.hoverOpacity),
      },
    },
  },
}));

// ----------------------------------------------------------------------

interface Option extends NavListProps {
  subheader: string;
}

function Searchbar() {
  const navigate = useNavigate();

  const { pathname } = useLocation();

  const [open, setOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');

  const navConfig = useNavConfig();

  const reduceItems = navConfig
    .map((list) => handleLoop(list.items, (list as any).subheader))
    .flat();

  const allItems = flattenArray(reduceItems).map((option) => {
    const group = splitPath(reduceItems, option.path);

    return {
      group: group && group.length > 1 ? group[0] : (option as Option).subheader,
      title: option.title,
      path: option.path,
    };
  });

  useEffect(() => {
    if (open) {
      handleClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = (path: string) => {
    if (path.includes('http')) {
      window.open(path);
    } else {
      navigate(path);
    }
    handleClose();
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleClick(searchQuery);
    }
  };
  const { data: products = [] } = useHomeProducts();

  const truncateText = (html: string | undefined, maxLength: number = 130) => {
    if (!html) return '';
    const plainText = html
      .replace(/<[^>]*>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    if (plainText.length <= maxLength) {
      return plainText;
    }
    return plainText.slice(0, maxLength).trim() + '...';
  };

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <div>
        {!open && (
          <IconButtonAnimate onClick={handleOpen}>
            <Iconify icon="eva:search-fill" color="white" />
          </IconButtonAnimate>
        )}

        <Slide direction="down" in={open} mountOnEnter unmountOnExit>
          <StyledSearchbar>
            <Autocomplete
              sx={{ width: 1, height: 1 }}
              autoHighlight
              disablePortal
              disableClearable
              popupIcon={null}
              PopperComponent={StyledPopper}
              options={products}
              getOptionLabel={(option) => option.name}
              filterOptions={createFilterOptions({
                matchFrom: 'any',
                stringify: (option) => option.name,
              })}
              noOptionsText={<SearchNotFound query={searchQuery} sx={{ py: 10 }} />}
              onInputChange={(event, value) => setSearchQuery(value)}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              renderInput={(params) => (
                <InputBase
                  {...params.InputProps}
                  inputProps={params.inputProps}
                  fullWidth
                  autoFocus
                  placeholder="Buscar productos..."
                  onKeyUp={(e) => {
                    if (e.key === 'Enter') {
                      const found = products.find((p) =>
                        p.name.toLowerCase().includes(searchQuery.toLowerCase())
                      );
                      if (found) navigate(`/explore-products/product/${found.id}`);
                    }
                  }}
                  startAdornment={
                    <InputAdornment position="start">
                      <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                    </InputAdornment>
                  }
                  sx={{ height: 1, typography: 'h6' }}
                />
              )}
              renderOption={(props, option) => (
                <Box
                  component="li"
                  {...props}
                  onClick={() => navigate(`/explore-products/product/${option.id}`)}
                  sx={{ display: 'flex', flexDirection: 'column' }}
                >
                  <Box sx={{ fontWeight: 'bold' }}>{formatText(option.name)}</Box>

                  {option.description && (
                    <Box
                      sx={{
                        fontSize: '0.85rem',
                        opacity: 0.8,
                        color: 'text.secondary',
                        mt: 0.5,
                        lineHeight: 1.4,
                      }}
                    >
                      {truncateText(option.description, 100)}
                    </Box>
                  )}
                </Box>
              )}
            />
          </StyledSearchbar>
        </Slide>
      </div>
    </ClickAwayListener>
  );
}

export default memo(Searchbar);

// ----------------------------------------------------------------------

type ItemProps = {
  path: string[];
  currItem: NavListProps;
};

function splitPath(array: NavListProps[], key: string) {
  let stack = array.map((item) => ({
    path: [item.title],
    currItem: item,
  }));

  while (stack.length) {
    const { path, currItem } = stack.pop() as ItemProps;

    if (currItem.path === key) {
      return path;
    }

    if (currItem.children?.length) {
      stack = stack.concat(
        currItem.children.map((item: NavListProps) => ({
          path: path.concat(item.title),
          currItem: item,
        }))
      );
    }
  }
  return null;
}

// ----------------------------------------------------------------------

function handleLoop(array: any, subheader?: string) {
  return array?.map((list: any) => ({
    subheader,
    ...list,
    ...(list.children && {
      children: handleLoop(list.children, subheader),
    }),
  }));
}
