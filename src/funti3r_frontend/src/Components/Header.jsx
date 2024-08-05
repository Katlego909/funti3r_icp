
import React from 'react';
import { AppBar, Toolbar, IconButton, InputBase, Box } from '@mui/material';
import { Search, Notifications, AccountCircle } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const SearchBar = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.common.white,
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const Header = () => {
  return (
    <AppBar position="static" color="default">
      <Box display="flex" justifyContent="center">
        <Box width="70%" maxWidth="1100px">
          <Toolbar>
            <Box flexGrow={1} display="flex" alignItems="center">
             
              <SearchBar>
                <SearchIconWrapper>
                  <Search />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ 'aria-label': 'search' }}
                />
              </SearchBar>
            </Box>
            <Box>
              <IconButton color="inherit">
                <Notifications />
              </IconButton>
              <IconButton edge="end" color="inherit">
                <AccountCircle />
              </IconButton>
            </Box>
          </Toolbar>
        </Box>
      </Box>
    </AppBar>
  );
};

export default Header;
