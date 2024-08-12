import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Container, Card, CardContent, CardMedia } from '@mui/material';
import { styled } from '@mui/material/styles';
import pastryChef from "../assets/pastry-cheff.png";

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
        }}
      >
        <Box
          sx={{
            textAlign: 'left',
            zIndex: 1,
            width: '50%',
            paddingRight: '2rem', // Added padding to move text left
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
              position:'fixed',
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
                }}
              >
                <Typography 
                  variant="h6" 
                  className="appName"
                  sx={{ 
                    fontWeight: 'bold', 
                    letterSpacing: 1.5,
                    color: 'black',
                    fontSize: 'xx-large',
                    transition: 'color 0.3s', // Smooth transition for color change
                  }}
                >
                  Cook.
                </Typography>
              </Box>
              <Box sx={{ marginLeft: 'auto' }}>
                <Button 
                  sx={{ 
                    color: 'black',
                    fontWeight: 'bold', 
                    fontSize: '1rem', 
                    textTransform: 'none', 
                    transition: 'color 0.3s', 
                    '&:hover': { color: 'red' }, 
                    '&:active': { color: 'red' } 
                  }}
                >
                  Home
                </Button>
                <Button 
                  sx={{ 
                    color: 'black',
                    fontWeight: 'bold', 
                    fontSize: '1rem', 
                    textTransform: 'none', 
                    transition: 'color 0.3s', 
                    '&:hover': { color: 'red' }, 
                    '&:active': { color: 'red' } 
                  }}
                >
                  About
                </Button>
                <Button 
                  sx={{ 
                    color: 'black',
                    fontWeight: 'bold', 
                    fontSize: '1rem', 
                    textTransform: 'none', 
                    transition: 'color 0.3s', 
                    '&:hover': { color: 'red' }, 
                    '&:active': { color: 'red' } 
                  }}
                >
                  Recipes
                </Button>
                <Button 
                  sx={{ 
                    color: 'black',
                    fontWeight: 'bold', 
                    fontSize: '1rem', 
                    textTransform: 'none', 
                    transition: 'color 0.3s', 
                    '&:hover': { color: 'red' }, 
                    '&:active': { color: 'red' } 
                  }}
                >
                  Blog
                </Button>
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
            }}
          >
            <Typography 
              variant="h3" 
              sx={{
                fontWeight: 'bold',
                color: 'black'
              }}
            >
              Cook Like a Pro with <br /> 
              Our <span style={{ color: '#F4A300' }}>Easy</span> and <span style={{ color: 'red' }}>Tasty</span> Recipes
            </Typography>
            <Typography 
              variant="h6"
              sx={{ color: 'gray', marginTop: '1rem' }}
            >
              From quick and easy meals to gourmet delights, we have <br />
              something for every taste and occasion.
            </Typography>
            <Button 
              variant="contained" 
              sx={{
                marginTop: '2rem',
                backgroundColor: '#F4A300', 
                color: 'white', 
                fontWeight: 'bold', 
                '&:hover': { backgroundColor: 'red' } 
              }}
            >
              Explore all Recipes
            </Button>
          </Box>
        </Box>

        {/* Image container */}
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

      {/* New Container Section with Cards */}
      <Container
        maxWidth="false"
        disableGutters
        sx={{
          backgroundColor: '#F5F5DC', // Beige color
          padding: '2rem 0', // Adjust padding as needed
        }}
      >
        <Box
          sx={{
            textAlign: 'center',
            padding: '2rem',
          }}
        >
          <Typography
            variant="h4"
            sx={{ fontWeight: 'bold', color: 'black' }}
          >
            Popular Recipes You Can't Miss
          </Typography>
          <Typography
            variant="h6"
            sx={{ color: 'gray', marginTop: '1rem' }}
          >
            From comfort food classics to exotic flavors, our featured recipes are sure to impress.
          </Typography>
        </Box>

        <CardContainer>
          {/* Card 1 */}
          <Card sx={{ maxWidth: 345, boxShadow: 3 }}>
            <CardMedia
              component="img"
              height="140"
              image="https://via.placeholder.com/300x140" // Replace with your image URL
              alt="Creamy Tomato Basil Soup"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Creamy Tomato Soup
              </Typography>
              <Button 
                variant="outlined" 
                sx={{
                  color: '#F4A300', 
                  borderColor: '#F4A300',
                  '&:hover': { borderColor: 'red', color: 'red' },
                }}
              >
                See Full Details
              </Button>
            </CardContent>
          </Card>

          {/* Card 2 */}
          <Card sx={{ maxWidth: 345, boxShadow: 3 }}>
            <CardMedia
              component="img"
              height="140"
              image="https://via.placeholder.com/300x140" // Replace with your image URL
              alt="Spicy Shrimp Tacos"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Spicy Shrimp Tacos
              </Typography>
              <Button 
                variant="outlined" 
                sx={{
                  color: '#F4A300', 
                  borderColor: '#F4A300',
                  '&:hover': { borderColor: 'red', color: 'red' },
                }}
              >
                See Full Details
              </Button>
            </CardContent>
          </Card>

          {/* Card 3 */}
          <Card sx={{ maxWidth: 345, boxShadow: 3 }}>
            <CardMedia
              component="img"
              height="140"
              image="https://via.placeholder.com/300x140" // Replace with your image URL
              alt="Chicken Parmesan"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Chicken Parmesan
              </Typography>
              <Button 
                variant="outlined" 
                sx={{
                  color: '#F4A300', 
                  borderColor: '#F4A300',
                  '&:hover': { borderColor: 'red', color: 'red' },
                }}
              >
                See Full Details
              </Button>
            </CardContent>
          </Card>

          {/* Card 4 */}
          <Card sx={{ maxWidth: 345, boxShadow: 3 }}>
            <CardMedia
              component="img"
              height="140"
              image="https://via.placeholder.com/300x140" // Replace with your image URL
              alt="Chocolate Chip Cookies"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Chocolate Chip Cookies
              </Typography>
              <Button 
                variant="outlined" 
                sx={{
                  color: '#F4A300', 
                  borderColor: '#F4A300',
                  '&:hover': { borderColor: 'red', color: 'red' },
                }}
              >
                See Full Details
              </Button>
            </CardContent>
          </Card>
        </CardContainer>
      </Container>

      {/* New Explore by Cuisine Type Section */}
      <Container
        maxWidth="false"
        disableGutters
        sx={{
          backgroundColor: '#F9F9F9', // Different background color
          padding: '2rem 0',
        }}
      >
        <Box
          sx={{
            textAlign: 'center',
            padding: '2rem',
          }}
        >
          <Typography
            variant="h4"
            sx={{ fontWeight: 'bold', color: 'black' }}
          >
            Explore by Cuisine Type
          </Typography>
          <Typography
            variant="h6"
            sx={{ color: 'gray', marginTop: '1rem' }}
          >
            Discover new flavors and cooking techniques with our diverse selection of cuisine types.
          </Typography>
        </Box>
      </Container>
    </>
  );
}

export default LandingPage;