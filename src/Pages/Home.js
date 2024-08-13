import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Container,
  IconButton,
  TextField,
  Paper,
  Grid,
  Modal,
  Button,
  Menu,
  MenuItem,
  Divider
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import { FaFacebookF, FaInstagram, FaTwitter, FaPinterestP, FaUser, FaSearch } from 'react-icons/fa';
import axios from 'axios';
import MyRecipes from './MyRecipes';
import { useNavigate } from 'react-router-dom';

// Style for the container
const MainContainer = styled(Container)(({ theme }) => ({
  backgroundColor: '#F5F5DC', // Beige color
  padding: '2rem',
  [theme.breakpoints.down('md')]: {
    padding: '1rem',
  },
}));

const ResultModal = styled(Paper)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  padding: theme.spacing(2),
  width: '60%', // Reduced the width to make it smaller
  maxHeight: '80%',
  overflowY: 'auto',
}));

function HomePage() {
  const theme = useTheme(); // Access the theme
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const navigate = useNavigate(); // Hook for navigation

  const handleSearch = async () => {
    try {
      const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`);
      setResults(response.data.meals || []);
      setOpen(true);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleClose = () => setOpen(false);

  const handleShowDetails = (recipe) => {
    setSelectedRecipe(recipe);
    setOpen(true);
  };

  const handleClickAccountMenu = (event) => {
    setAnchorEl(event.currentTarget);
    setAccountMenuOpen(true);
  };

  const handleCloseAccountMenu = () => {
    setAccountMenuOpen(false);
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    // Add your sign-out logic here
    navigate('/');
    handleCloseAccountMenu();
  };

  const handleMyRecipes = () => {
    handleCloseAccountMenu();
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar
        position="fixed"
        sx={{
          top: 0,
          backgroundColor: 'transparent',
          boxShadow: 'none',
          width: '100%',
          [theme.breakpoints.down('md')]: { position: 'fixed' },
        }}
      >
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between', // Space between logo and profile icon
          }}
        >
          {/* Logo Section */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography
              variant="h6"
              className="appName"
              sx={{
                fontWeight: 'bold',
                letterSpacing: 1.5,
                color: '#F4A300',
                fontSize: 'xx-large',
                transition: 'color 0.3s', // Smooth transition for color change
                [theme.breakpoints.down('md')]: { fontSize: 'large' },
              }}
            >
              Cook.
            </Typography>
          </Box>

          {/* Centered Search Input */}
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
            <TextField
              variant="outlined"
              placeholder="Search recipes..."
              size="small"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSearch();
                }
              }}
              sx={{
                backgroundColor: 'white',
                borderRadius: '4px',
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: '#F4A300' },
                  '&:hover fieldset': { borderColor: 'red' },
                  '&.Mui-focused fieldset': { borderColor: '#F4A300' },
                },
              }}
              InputProps={{
                endAdornment: (
                  <IconButton
                    sx={{ color: '#F4A300', '&:hover': { color: 'red' } }}
                    onClick={handleSearch}
                  >
                    <FaSearch />
                  </IconButton>
                ),
              }}
            />
          </Box>

          {/* Profile Icon Button with Menu */}
          <IconButton
            onClick={handleClickAccountMenu}
            sx={{ color: '#F4A300', '&:hover': { color: 'red' } }}
          >
            <FaUser size={24} />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={accountMenuOpen}
            onClose={handleCloseAccountMenu}
            PaperProps={{ style: { width: 200 } }}
          >
            <MenuItem onClick={handleMyRecipes}>My Recipes</MenuItem>
            <Divider />
            <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <MainContainer
        maxWidth="false"
        disableGutters
        sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Box sx={{ textAlign: 'center', padding: '2rem' }}>
          <Typography
            variant="h6"
            sx={{ color: 'gray', marginTop: '1rem', [theme.breakpoints.down('md')]: { fontSize: '0.875rem' } }}
          >
            Discover a world of delicious recipes and cooking tips to inspire your culinary adventures.
          </Typography>
          <MyRecipes />
        </Box>
      </MainContainer>

      <Box sx={{ backgroundColor: '#333', color: '#fff', padding: '1rem 0', textAlign: 'center' }}>
        {/* Modal for search results */}
        <Modal open={open} onClose={handleClose} aria-labelledby="search-results-title">
          <ResultModal>
            <Typography id="search-results-title" variant="h6" component="h2">
              Search Results
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Grid container spacing={2}>
                {results.map((meal) => (
                  <Grid item xs={12} sm={6} md={4} key={meal.idMeal}>
                    <Paper sx={{ padding: 1, textAlign: 'left' }}>
                      <Typography variant="h6">{meal.strMeal}</Typography>
                      <Typography variant="body2">{meal.strCategory}</Typography>
                      <Typography variant="body2">{meal.strArea}</Typography>
                      <img
                        src={meal.strMealThumb}
                        alt={meal.strMeal}
                        style={{ width: '100%', borderRadius: '4px', marginTop: '8px' }}
                      />
                      <Typography variant="body2" sx={{ mt: 1 }}>
                        <strong>Ingredients:</strong>
                      </Typography>
                      <ul>
                        {Array.from({ length: 20 }, (_, i) => i + 1).map((i) => {
                          const ingredient = meal[`strIngredient${i}`];
                          const measure = meal[`strMeasure${i}`];
                          return ingredient ? (
                            <li key={i}>
                              {measure} {ingredient}
                            </li>
                          ) : null;
                        })}
                      </ul>
                      <Button
                        variant="outlined"
                        sx={{ marginTop: '8px' }}
                        onClick={() => handleShowDetails(meal)}
                      >
                        Show Full Details
                      </Button>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </ResultModal>
        </Modal>

        {/* Modal for showing full details of a selected recipe */}
        <Modal open={Boolean(selectedRecipe)} onClose={() => setSelectedRecipe(null)} aria-labelledby="recipe-details-title">
          <ResultModal>
            {selectedRecipe && (
              <Box>
                <Typography id="recipe-details-title" variant="h6" component="h2">
                  {selectedRecipe.strMeal}
                </Typography>
                <Typography id="recipe-details-description" sx={{ mt: 2 }}>
                  <img src={selectedRecipe.strMealThumb} alt={selectedRecipe.strMeal} style={{ width: '100%', borderRadius: '4px' }} />
                  <Typography variant="body1" sx={{ mt: 2 }}>
                    <strong>Category:</strong> {selectedRecipe.strCategory}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Area:</strong> {selectedRecipe.strArea}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Instructions:</strong> {selectedRecipe.strInstructions}
                  </Typography>
                </Typography>
              </Box>
            )}
          </ResultModal>
        </Modal>

        <Typography variant="body2">© 2024 Cook. All rights reserved mlap southern africa.</Typography>
        <Box sx={{ marginTop: '0.5rem', display: 'flex', justifyContent: 'center', gap: '1rem' }}>
          <IconButton component="a" href="https://www.facebook.com" target="_blank" sx={{ color: 'white', '&:hover': { color: '#4267B2' } }}>
            <FaFacebookF size={24} />
          </IconButton>
          <IconButton component="a" href="https://www.instagram.com" target="_blank" sx={{ color: 'white', '&:hover': { color: '#C13584' } }}>
            <FaInstagram size={24} />
          </IconButton>
          <IconButton component="a" href="https://twitter.com" target="_blank" sx={{ color: 'white', '&:hover': { color: '#1DA1F2' } }}>
            <FaTwitter size={24} />
          </IconButton>
          <IconButton component="a" href="https://www.pinterest.com" target="_blank" sx={{ color: 'white', '&:hover': { color: '#E60023' } }}>
            <FaPinterestP size={24} />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}

export default HomePage;
