import { forwardRef, useEffect, useState } from 'react';
import {
  Avatar,
  Link,
  Box,
  Button,
  Divider,
  InputAdornment,
  lighten,
  List,
  ListItem,
  ListItemAvatar,
  TextField,
  Typography,
  Dialog,
  DialogContent,
  DialogTitle,
  Slide,
  Hidden
} from '@mui/material';
import { styled } from '@mui/material/styles';
import parse from 'html-react-parser';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import ChevronRightTwoToneIcon from '@mui/icons-material/ChevronRightTwoTone';

import { getAllCoursePaging } from '../../../../../Api/Course';
import { Link as RouterLink } from 'react-router-dom';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const DialogWrapper = styled(Dialog)(
  () => `
    .MuiDialog-container {
        height: auto;
    }
    
    .MuiDialog-paperScrollPaper {
        max-height: calc(100vh - 64px)
    }
`
);

const SearchInputWrapper = styled(TextField)(
  ({ theme }) => `

    .MuiInputBase-input {
        font-size: ${theme.typography.pxToRem(17)};
    }
`
);

const DialogTitleWrapper = styled(DialogTitle)(
  ({ theme }) => `
    background: #5A47AB;
    padding: ${theme.spacing(3)}
`
);

function HeaderSearch() {
  const [openSearchResults, setOpenSearchResults] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);

    if (event.target.value) {
      if (!openSearchResults) {
        setOpenSearchResults(true);
      }
    } else {
      setOpenSearchResults(false);
    }
  };

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [course, SetCourse] = useState([]);

  useEffect(() => {
    getAllCoursePaging(searchValue).then(function (result) {
      SetCourse(result.data);
    });
  }, [searchValue]);

  return (
    <>
      <SearchInputWrapper
        autoFocus={true}
        onClick={handleClickOpen}
        onChange={handleClickOpen}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchTwoToneIcon />
            </InputAdornment>
          )
        }}
        placeholder="Search materies here..."
        fullWidth
        label="Search"
      />

      <DialogWrapper
        open={open}
        TransitionComponent={Transition}
        keepMounted
        maxWidth="md"
        fullWidth
        scroll="paper"
        onClose={handleClose}
      >
        <DialogTitleWrapper>
          <SearchInputWrapper
            sx={{ background: '#5A47AB' }}
            value={searchValue}
            autoFocus={true}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchTwoToneIcon />
                </InputAdornment>
              )
            }}
            placeholder="Search Materies here..."
            fullWidth
            label="Search"
          />
        </DialogTitleWrapper>
        <Divider sx={{ background: '#ffffff' }} />

        {openSearchResults && (
          <DialogContent sx={{ background: '#5A47AB' }}>
            <Box
              sx={{ pt: 0, pb: 1 }}
              display="flex"
              justifyContent="space-between"
            >
              <Typography variant="body2" component="span">
                Search results for{' '}
                <Typography
                  sx={{ fontWeight: 'bold' }}
                  variant="body1"
                  component="span"
                >
                  {searchValue}
                </Typography>
              </Typography>
              <Link href="#" variant="body2" underline="hover">
                Advanced search
              </Link>
            </Box>
            <Divider sx={{ my: 1 }} />
            <List disablePadding>
              {course
                ? course.map((datas) => (
                    <ListItem
                      button
                      component={RouterLink}
                      to={'/materi/' + datas.slug}
                    >
                      <Hidden smDown>
                        <ListItemAvatar>
                          <Avatar
                            src={datas.image}
                            sx={{
                              background: (theme) =>
                                theme.palette.secondary.main
                            }}
                          ></Avatar>
                        </ListItemAvatar>
                      </Hidden>
                      <Box flex="1">
                        <Box display="flex" justifyContent="space-between">
                          <Link
                            href="#"
                            underline="hover"
                            sx={{ fontWeight: 'bold' }}
                            variant="body2"
                          >
                            {datas.title}
                          </Link>
                        </Box>
                        <Typography
                          component="span"
                          variant="body2"
                          sx={{
                            color: (theme) =>
                              lighten(theme.palette.secondary.main, 0.5)
                          }}
                        >
                          {parse(
                            new String(
                              datas.description.substring(3, 50)
                            ).toString()
                          )}
                        </Typography>
                      </Box>
                      <ChevronRightTwoToneIcon />
                    </ListItem>
                  ))
                : null}
            </List>
            <Divider sx={{ mt: 1, mb: 2 }} />
            <Box sx={{ textAlign: 'center' }}>
              <Button color="primary">View all search results</Button>
            </Box>
          </DialogContent>
        )}
      </DialogWrapper>
    </>
  );
}

export default HeaderSearch;
