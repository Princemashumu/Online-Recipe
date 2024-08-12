import React, { useEffect, useState, useRef } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Container, Card, CardContent, CardMedia, Dialog, DialogTitle, DialogContent, DialogActions, TextField, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import pastryChef from "../assets/pastry-cheff.png";
import { GoArrowRight } from "react-icons/go";
import { FaFacebookF, FaInstagram, FaTwitter, FaPinterestP } from 'react-icons/fa'; // Import social media icons

// Style for the image container
const ImageContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  [theme.breakpoints.down('md')]: {
    display: 'none', // Hide on small screens
  },
}));

// Style for the card container
const CardContainer = styled(Box)(({ theme }) => ({
  display: 'grid',
  gap: '1rem',
  gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
  padding: '1rem',
  justifyContent: 'center',
  alignContent: 'center',
  paddingLeft: '20px',
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: '1fr', // Stack cards on small screens
  },
}));

function LandingPage() {
  const [recipes, setRecipes] = useState([]);
  const [openRecipeDialog, setOpenRecipeDialog] = useState(false);
  const [openTermsDialog, setOpenTermsDialog] = useState(false); // State for the Terms and Conditions dialog
  const [openRegisterDialog, setOpenRegisterDialog] = useState(false); // State for the registration dialog
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const recipesRef = useRef(null); // Ref for the popular recipes container
  const theme = useTheme(); // Access the theme
  const [isRegisterForm, setIsRegisterForm] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      const recipeIds = [52771, 52773, 52780, 52775]; // recipe IDs on display
      try {
        const responses = await Promise.all(
          recipeIds.map(id =>
            fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`).then(response => response.json())
          )
        );
        setRecipes(responses.map(data => data.meals[0])); // Assuming each response contains an array of meals
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchRecipes();
  }, []);

  const scrollToRecipes = () => {
    if (recipesRef.current) {
      recipesRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleOpenRecipe = (recipe) => {
    setSelectedRecipe(recipe);
    setOpenRecipeDialog(true);
  };

  const handleCloseRecipe = () => {
    setOpenRecipeDialog(false);
    setSelectedRecipe(null);
  };

  const handleOpenTerms = () => {
    setOpenTermsDialog(true);
  };

  const handleCloseTerms = () => {
    setOpenTermsDialog(false);
  };

  const handleOpenRegister = () => {
    setOpenRegisterDialog(true);
  };

  const handleCloseRegister = () => {
    setOpenRegisterDialog(false);
  };
  

  const toggleForm = () => {
    setIsRegisterForm(!isRegisterForm); // Toggle between registration and login forms
  };

  return (
    <>
      <Container
        maxWidth="false"
        disableGutters
        sx={{
          position: 'relative',
          height: '100vh',
          backgroundColor: '#F5F5DC', // Beige color
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 2rem',
          [theme.breakpoints.down('md')]: {
            padding: '0 1rem',
          },
        }}
      >
        <Box
          sx={{
            textAlign: 'left',
            zIndex: 1,
            width: '50%',
            paddingRight: '2rem',
            [theme.breakpoints.down('md')]: {
              width: '100%',
              paddingRight: '1rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'baseline', // Center content horizontally
              justifyContent: 'baseline', // Center content vertically
              textAlign: 'baseline', // Center text on smaller screens
            },
          }}
        >
          <AppBar 
            position="absolute" 
            sx={{ 
              top: 0, 
              backgroundColor: 'transparent', 
              boxShadow: 'none',
              padding: '0',
              width: '100%',
              position: 'fixed',
              [theme.breakpoints.down('md')]: {
                position: 'fixed',
              },
            }}
          >
            <Toolbar>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  '&:hover .appName': {
                    color: 'red',
                  },
                  [theme.breakpoints.down('md')]: {
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                  },
                }}
              >
                <Typography 
                  variant="h6" 
                  className="appName"
                  sx={{ 
                    fontWeight: 'bold', 
                    letterSpacing: 1.5,
                    color: '#F4A300',
                    fontSize: 'xx-large',
                    transition: 'color 0.3s', // Smooth transition for color change
                    [theme.breakpoints.down('md')]: {
                      fontSize: 'large',
                    },
                  }}
                >
                  Cook.
                </Typography>
              </Box>
              <Box sx={{ marginLeft: 'auto', display: 'flex', flexWrap: 'wrap' }}>
                {['Home', 'Terms & Conditions'].map((text) => (
                  <Button 
                    
                    key={text}
                    onClick={text === 'Terms & Conditions' ? handleOpenTerms : undefined} // Open Terms and Conditions dialog
                    sx={{ 
                      color: 'black',
                      fontWeight: 'bold', 
                      fontSize: '1rem', 
                      textTransform: 'none', 
                      transition: 'color 0.3s', 
                      '&:hover': { color: 'red' }, 
                      '&:active': { color: 'red' },
                      [theme.breakpoints.down('md')]: {
                        fontSize: '0.875rem',
                      },
                    }}
                  >
                    {text}
                  </Button>
                ))}
              </Box>
            </Toolbar>
          </AppBar>

          <Box
            sx={{
              position: 'relative',
              top: '50%',
              right: '40%',
              transform: 'translateY(-50%)',
              width: '100%',
              [theme.breakpoints.down('md')]: {
                top: '40%',
                right: '0%',
                textAlign: 'center',
                transform: 'translateY(-30%)',
              },
            }}
          >
            <Typography 
              variant="h3" 
              sx={{
                fontWeight: 'bold',
                color: 'black',
                [theme.breakpoints.down('md')]: {
                  fontSize: '2rem',
                },
              }}
            >
              Cook Like a Pro with <br /> 
              Our <span style={{ color: '#F4A300' }}>Easy</span> and <span style={{ color: 'red' }}>Tasty</span> Recipes
            </Typography>
            <Typography 
              variant="h6"
              sx={{ color: 'gray', marginTop: '1rem', [theme.breakpoints.down('md')]: { fontSize: '0.875rem' } }}
            >
              From quick and easy meals to gourmet delights, we have <br />
              something for every taste and occasion.
            </Typography>
            <Box 
              sx={{ 
                marginTop: '2rem', 
                display: 'flex', 
                gap: '1rem', 
                justifyContent: { xs: 'center', md: 'flex-start' } 
              }}
            >
              <Button 
                variant="contained" 
                onClick={scrollToRecipes} // Scroll to recipes on click
                sx={{
                  backgroundColor: '#F4A300', 
                  color: 'white', 
                  fontWeight: 'bold', 
                  '&:hover': { backgroundColor: 'red' },
                  [theme.breakpoints.down('md')]: {
                    fontSize: '0.875rem',
                    padding: '0.5rem 1rem',
                  },
                }}
              >
                Explore our Recipes
              </Button>
              <Button 
                variant="outlined" 
                sx={{
                  color: '#F4A300', 
                  borderColor: '#F4A300',
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem', // Space between text and icon
                  '&:hover': { borderColor: 'red', color: 'red' },
                  [theme.breakpoints.down('md')]: {
                    fontSize: '0.875rem',
                    padding: '0.5rem 1rem',
                  },
                }}
                onClick={handleOpenRegister} // Open registration dialog on click
              >
                Get Started
                <GoArrowRight />
              </Button>
            </Box>
          </Box>
        </Box>

        <ImageContainer
          sx={{
            width: '50%',
            height: '100%',
            position: 'absolute',
            right: 0,
            top: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            [theme.breakpoints.down('md')]: {
              display: 'none', // Hide on small screens
            },
          }}
        >
          <CardMedia
            component="img"
            image={pastryChef} // Replace with your image URL
            alt="Delicious recipes"
            sx={{
              width: '100%',
              height: 'auto',
            }}
          />
        </ImageContainer>
      </Container>

      {/* Popular Recipes Section */}
      <Container
        maxWidth="false"
        disableGutters
        sx={{
          backgroundColor: '#F5F5DC', // Beige color
          padding: '2rem 0', // Adjust padding as needed
          [theme.breakpoints.down('md')]: {
            padding: '1rem 0',
          },
        }}
        ref={recipesRef} // Attach the ref here
      >
        <Box
          sx={{
            textAlign: 'center',
            padding: '2rem',
            [theme.breakpoints.down('md')]: {
              padding: '1rem',
            },
          }}
        >
          <Typography
            variant="h4"
            sx={{ fontWeight: 'bold', color: 'black', [theme.breakpoints.down('md')]: { fontSize: '1.5rem' } }}
          >
            Popular Recipes You Can't Miss
          </Typography>

          <IconButton
            sx={{
              backgroundColor: '#F4A300',
              color: 'white',
              borderRadius: '25px',
              width: '70px',
              height: '50px',
              '&:hover': {
                backgroundColor: 'red',
              },
            }}
            onClick={handleOpenRegister}
          >
            <GoArrowRight />
          </IconButton>

          <Typography
            variant="h6"
            sx={{ color: 'gray', marginTop: '1rem', [theme.breakpoints.down('md')]: { fontSize: '0.875rem' } }}
          >
            From comfort food classics to exotic flavors, our featured recipes are sure to impress.
          </Typography>
        </Box>

        <CardContainer>
          {/* Dynamic card rendering */}
          {recipes.map((recipe) => (
            <Card key={recipe.idMeal} sx={{ maxWidth: 345, boxShadow: 3 }}>
              <CardMedia
                component="img"
                height="140"
                image={recipe.strMealThumb} // URL from the API
                alt={recipe.strMeal}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {recipe.strMeal}
                </Typography>
                <Button 
                  variant="outlined" 
                  sx={{
                    color: '#F4A300', 
                    borderColor: '#F4A300',
                    '&:hover': { borderColor: 'red', color: 'red' },
                    [theme.breakpoints.down('md')]: {
                      fontSize: '0.75rem',
                    },
                  }}
                  onClick={() => handleOpenRecipe(recipe)} // Open modal with recipe details
                >
                  See Full Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </CardContainer>
        
      </Container>

      {/* Recipe Details Modal */}
      <Dialog open={openRecipeDialog} onClose={handleCloseRecipe} maxWidth="md" fullWidth>
        <DialogTitle>{selectedRecipe?.strMeal}</DialogTitle>
        <DialogContent>
          <img
            src={selectedRecipe?.strMealThumb}
            alt={selectedRecipe?.strMeal}
            style={{ width: '100%', maxWidth: 400, height: 'auto', marginBottom: '1rem' }}
          />
          <Typography variant="h6">Ingredients:</Typography>
          <ul>
            {Object.keys(selectedRecipe || {}).map((key) =>
              key.includes('strIngredient') && selectedRecipe[key] ? (
                <li key={key}>{selectedRecipe[key]}</li>
              ) : null
            )}
          </ul>
          <Typography variant="h6">Instructions:</Typography>
          <Typography>{selectedRecipe?.strInstructions}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseRecipe}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Terms and Conditions Modal */}
      <Dialog open={openTermsDialog} onClose={handleCloseTerms} maxWidth="md" fullWidth>
        <DialogTitle>Terms and Conditions</DialogTitle>
        <DialogContent>
          <Typography variant="h6" gutterBottom>Privacy Policy</Typography>
          <Typography paragraph>
            This privacy policy describes how we handle your personal information. We collect and use personal information to provide you with a better experience. Your information is kept confidential and is used only for the purposes stated.
          </Typography>
          <Typography variant="h6" gutterBottom>User Data</Typography>
          <Typography paragraph>
            We do not sell, trade, or otherwise transfer your personal data to outside parties. We may share your information with trusted third parties who assist us in operating our website and providing services to you, as long as those parties agree to keep this information confidential.
          </Typography>
          <Typography paragraph>
            By using our website, you consent to our privacy policy and terms of service. If you have any questions or concerns, please contact us.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseTerms}>Close</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openRegisterDialog} onClose={handleCloseRegister}>
        <DialogTitle>{isRegisterForm ? 'Sign Up' : 'Log In'}</DialogTitle>
        <DialogContent>
          {isRegisterForm ? (
            <>
              <TextField
                autoFocus
                margin="dense"
                label="Email Address"
                type="email"
                fullWidth
                variant="standard"
              />
              <TextField
                margin="dense"
                label="Password"
                type="password"
                fullWidth
                variant="standard"
              />
            </>
          ) : (
            <>
              <TextField
                autoFocus
                margin="dense"
                label="Email Address"
                type="email"
                fullWidth
                variant="standard"
              />
              <TextField
                margin="dense"
                label="Password"
                type="password"
                fullWidth
                variant="standard"
              />
            </>
          )}
          <Box sx={{ marginTop: '1rem', textAlign: 'center' }}>
            {isRegisterForm ? (
              <Typography variant="body2" onClick={toggleForm} sx={{ cursor: 'pointer', color: '#F4A300' }}>
                Already have an account? Log in
              </Typography>
            ) : (
              <Typography variant="body2" onClick={toggleForm} sx={{ cursor: 'pointer', color: '#F4A300' }}>
                Don't have an account? Sign up
              </Typography>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseRegister} color="primary">
            Cancel
          </Button>
          <Button onClick={handleCloseRegister} color="primary">
            {isRegisterForm ? 'Sign Up' : 'Log In'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Footer */}
      <Box
        sx={{
          backgroundColor: '#333',
          color: '#fff',
          padding: '1rem 0',
          textAlign: 'center',
          marginTop: 'auto',
          [theme.breakpoints.down('md')]: {
            padding: '0.5rem 0',
          },
        }}
      >
        <Typography variant="body2">
          © 2024 Cook. All rights reserved mlap southern africa.
        </Typography>
        <Box
          sx={{
            marginTop: '0.5rem',
            display: 'flex',
            justifyContent: 'center',
            gap: '1rem',
          }}
        >
          <IconButton 
            component="a" 
            href="https://www.facebook.com" 
            target="_blank" 
            sx={{ color: 'white', '&:hover': { color: '#4267B2' } }}
          >
            <FaFacebookF size={24} />
          </IconButton>
          <IconButton 
            component="a" 
            href="https://www.instagram.com" 
            target="_blank" 
            sx={{ color: 'white', '&:hover': { color: '#C13584' } }}
          >
            <FaInstagram size={24} />
          </IconButton>
          <IconButton 
            component="a" 
            href="https://twitter.com" 
            target="_blank" 
            sx={{ color: 'white', '&:hover': { color: '#1DA1F2' } }}
          >
            <FaTwitter size={24} />
          </IconButton>
          <IconButton 
            component="a" 
            href="https://www.pinterest.com" 
            target="_blank" 
            sx={{ color: 'white', '&:hover': { color: '#E60023' } }}
          >
            <FaPinterestP size={24} />
          </IconButton>
        </Box>
      </Box>
    </>
  );
}

export default LandingPage;
