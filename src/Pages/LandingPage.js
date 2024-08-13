import React, { useEffect, useState, useRef } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  Card,
  CardContent,
  CardMedia,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
import pastryChef from "../assets/pastry-cheff.png";
import { GoArrowRight } from "react-icons/go";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaPinterestP,
} from "react-icons/fa"; // Import social media icons
import axios from "axios";
import { useNavigate } from 'react-router-dom';

// Style for the image container
const ImageContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  [theme.breakpoints.down("md")]: {
    display: "none", // Hide on small screens
  },
}));

// Style for the card container
const CardContainer = styled(Box)(({ theme }) => ({
  display: "grid",
  gap: "1rem",
  gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
  padding: "1rem",
  justifyContent: "center",
  alignContent: "center",
  paddingLeft: "20px",
  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "1fr", // Stack cards on small screens
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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({}); // Error state
  const navigate = useNavigate(); // Hook for navigation
  const [isAuthenticated, setIsAuthenticated] = useState(false); // New state for authentication status
  

  useEffect(() => {
    const fetchRecipes = async () => {
      const recipeIds = [52771, 52773, 52777, 52775]; // recipe IDs on display
      try {
        const responses = await Promise.all(
          recipeIds.map((id) =>
            fetch(
              `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
            ).then((response) => response.json())
          )
        );
        setRecipes(responses.map((data) => data.meals[0])); // Assuming each response contains an array of meals
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchRecipes();
  }, []);

  const scrollToRecipes = () => {
    if (recipesRef.current) {
      recipesRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
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
  const handleAuth = async () => {
    if (!validateForm()) return;

    try {
      if (isRegisterForm) {
        const response = await axios.post("http://localhost:3001/users", {
          email,
          username,
          password,
          confirmpassword,
        });

        if (response.status === 201) {
          alert("User registered successfully!");
          setIsAuthenticated(true); // Set the user as authenticated
          handleCloseRegister();
        }
      } else {
        const response = await axios.get("http://localhost:3001/users", {
          email,
          password,
        });

        if (response.status === 200) {
          alert("Login successful!");
          setIsAuthenticated(true); // Set the user as authenticated
          handleCloseRegister();
          navigate('/home');
        }
      }
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;
        if (status === 400) {
          setErrors(data.errors);
        } else {
          alert(`Error: ${data.message || "An error occurred"}`);
        }
      } else {
        console.error("Error:", error);
        alert("An error occurred.");
      }
    }
  };
  

  const validateForm = () => {
    const newErrors = {};
  
    if (!email) newErrors.email = "Email is required";
    if (isRegisterForm) {
      if (!username) newErrors.username = "Username is required";
      if (!password) newErrors.password = "Password is required";
      if (password !== confirmpassword)
        newErrors.confirmpassword = "Passwords do not match";
    }
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  

  return (
    <>
      <Container
        maxWidth="false"
        disableGutters
        sx={{
          position: "relative",
          height: "100vh",
          backgroundColor: "#F5F5DC",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 2rem",
          [theme.breakpoints.down("md")]: {
            padding: "0 1rem",
          },
        }}
      >
        <Box
          sx={{
            textAlign: "left",
            zIndex: 1,
            width: "50%",
            paddingRight: "2rem",
            [theme.breakpoints.down("md")]: {
              width: "100%",
              paddingRight: "1rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "baseline",
              justifyContent: "baseline",
              textAlign: "baseline",
            },
          }}
        >
          <AppBar
            position="absolute"
            sx={{
              top: 0,
              backgroundColor: "transparent",
              boxShadow: "none",
              padding: "0",
              width: "100%",
              position: "fixed",
              [theme.breakpoints.down("md")]: {
                position: "fixed",
              },
            }}
          >
            <Toolbar>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  "&:hover .appName": {
                    color: "red",
                  },
                  [theme.breakpoints.down("md")]: {
                    flexDirection: "column",
                    alignItems: "flex-start",
                  },
                }}
              >
                <Typography
                  variant="h6"
                  className="appName"
                  sx={{
                    fontWeight: "bold",
                    letterSpacing: 1.5,
                    color: "#F4A300",
                    fontSize: "xx-large",
                    transition: "color 0.3s", // Smooth transition for color change
                    [theme.breakpoints.down("md")]: {
                      fontSize: "large",
                    },
                  }}
                >
                  Cook.
                </Typography>
              </Box>
              <Box
                sx={{ marginLeft: "auto", display: "flex", flexWrap: "wrap" }}
              >
                 {!isAuthenticated ? (
                  <Button
                    onClick={handleOpenRegister}
                    variant="outlined"
                    sx={{
                      color: "#F4A300",
                      borderColor: "#F4A300",
                      fontWeight: "bold",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      "&:hover": { borderColor: "red", color: "red" },
                      [theme.breakpoints.down("md")]: {
                        fontSize: "0.875rem",
                        padding: "0.5rem 1rem",
                      },
                    }}
                  >
                    Sign Up
                  </Button>
                ) : (
                  <Button
                    onClick={() => navigate('/home')}
                    variant="outlined"
                    sx={{
                      color: "#F4A300",
                      borderColor: "#F4A300",
                      fontWeight: "bold",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      "&:hover": { borderColor: "red", color: "red" },
                      [theme.breakpoints.down("md")]: {
                        fontSize: "0.875rem",
                        padding: "0.5rem 1rem",
                      },
                    }}
                  >
                    Login
                  </Button>
                )}
              </Box>
            </Toolbar>
          </AppBar>

          <Box
            sx={{
              position: "relative",
              top: "50%",
              right: "40%",
              transform: "translateY(-50%)",
              width: "100%",
              [theme.breakpoints.down("md")]: {
                top: "40%",
                right: "0%",
                textAlign: "center",
                transform: "translateY(-30%)",
              },
            }}
          >
            <Typography
              variant="h3"
              sx={{
                fontWeight: "bold",
                color: "black",
                [theme.breakpoints.down("md")]: {
                  fontSize: "2rem",
                },
              }}
            >
              Cook Like a Pro with <br />
              Our <span style={{ color: "#F4A300" }}>Easy</span> and{" "}
              <span style={{ color: "red" }}>Tasty</span> Recipes
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: "gray",
                marginTop: "1rem",
                [theme.breakpoints.down("md")]: { fontSize: "0.875rem" },
              }}
            >
              From quick and easy meals to gourmet delights, we have <br />
              something for every taste and occasion.
            </Typography>
            <Box
              sx={{
                marginTop: "2rem",
                display: "flex",
                gap: "1rem",
                justifyContent: { xs: "center", md: "flex-start" },
              }}
            >
              <Button
                variant="contained"
                onClick={scrollToRecipes} // Scroll to recipes on click
                sx={{
                  backgroundColor: "#F4A300",
                  color: "white",
                  fontWeight: "bold",
                  "&:hover": { backgroundColor: "red" },
                  [theme.breakpoints.down("md")]: {
                    fontSize: "0.875rem",
                    padding: "0.5rem 1rem",
                  },
                }}
              >
                Explore our Recipes
              </Button>
              <Button
                variant="outlined"
                sx={{
                  color: "#F4A300",
                  borderColor: "#F4A300",
                  fontWeight: "bold",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem", // Space between text and icon
                  "&:hover": { borderColor: "red", color: "red" },
                  [theme.breakpoints.down("md")]: {
                    fontSize: "0.875rem",
                    padding: "0.5rem 1rem",
                  },
                }}
                onClick={handleOpenRegister} // Open registration dialog on click
              >
                Get Started
                <GoArrowRight size={30} />
              </Button>
            </Box>
          </Box>
        </Box>

        <ImageContainer
          sx={{
            width: "50%",
            height: "100%",
            position: "absolute",
            right: 0,
            top: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            [theme.breakpoints.down("md")]: {
              display: "none", // Hide on small screens
            },
          }}
        >
          <CardMedia
            component="img"
            image={pastryChef} // Replace with your image URL
            alt="Delicious recipes"
            sx={{
              width: "100%",
              height: "auto",
            }}
          />
        </ImageContainer>
      </Container>

      {/* Popular Recipes Section */}
      <Container
        maxWidth="false"
        disableGutters
        sx={{
          backgroundColor: "#F5F5DC", // Beige color
          padding: "2rem 0", // Adjust padding as needed
          [theme.breakpoints.down("md")]: {
            padding: "1rem 0",
          },
        }}
        ref={recipesRef} // Attach the ref here
      >
        <Box
          sx={{
            textAlign: "center",
            padding: "2rem",
            justifyContent:"center",
            [theme.breakpoints.down("md")]: {
              padding: "1rem",
            },
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              color: "black",
              [theme.breakpoints.down("md")]: { fontSize: "1.5rem" },
            }}
          >
            Popular Recipes You Can't Miss
          </Typography>

          <IconButton
            sx={{
              backgroundColor: "#F4A300",
              color: "white",
              borderRadius: "25px",
              width: "70px",
              height: "50px",
              "&:hover": {
                backgroundColor: "red",
              },
            }}
            onClick={handleOpenRegister}
          >
            <GoArrowRight />
          </IconButton>

          <Typography
            variant="h6"
            sx={{
              color: "gray",
              marginTop: "1rem",
              [theme.breakpoints.down("md")]: { fontSize: "0.875rem" },
            }}
          >
            From comfort food classics to exotic flavors, our featured recipes
            are sure to impress.
          </Typography>
        </Box>

        <CardContainer
        sx={{
          display:"flex",
          alignContent:"center",
          "&:hover": {
            transform: "scale(1.05)",
            // boxShadow: theme.shadows[6],
          },
        }}>
          {recipes.map((recipe) => (
            <Card
              key={recipe.idMeal}
              sx={{
                backgroundColor: "#f7f7f7",
                boxShadow: theme.shadows[3],
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: theme.shadows[6],
                },
              }}
            >
              <CardMedia
                component="img"
                height="140"
                image={recipe.strMealThumb}
                alt={recipe.strMeal}
              />
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  sx={{ fontWeight: "bold", color: "#333" }}
                >
                  {recipe.strMeal}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {recipe.strArea} Cuisine
                </Typography>
                <Button
                  onClick={() => handleOpenRecipe(recipe)}
                  sx={{
                    marginTop: "1rem",
                    color: "#F4A300",
                    fontWeight: "bold",
                    "&:hover": { color: "red" },
                  }}
                >
                  See Full Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </CardContainer>
      </Container>

      {/* Recipe Details Modal */}
      <Dialog
        open={openRecipeDialog}
        onClose={handleCloseRecipe}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>{selectedRecipe?.strMeal}</DialogTitle>
        <DialogContent>
          <img
            src={selectedRecipe?.strMealThumb}
            alt={selectedRecipe?.strMeal}
            style={{
              width: "100%",
              maxWidth: 400,
              height: "auto",
              marginBottom: "1rem",
            }}
          />
          <Typography variant="h6">Ingredients:</Typography>
          <ul>
            {Object.keys(selectedRecipe || {}).map((key) =>
              key.includes("strIngredient") && selectedRecipe[key] ? (
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
      <Dialog
        open={openTermsDialog}
        onClose={handleCloseTerms}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Terms and Conditions</DialogTitle>
        <DialogContent>
          <Typography variant="h6" gutterBottom>
            Privacy Policy
          </Typography>
          <Typography paragraph>
            This privacy policy describes how we handle your personal
            information. We collect and use personal information to provide you
            with a better experience. Your information is kept confidential and
            is used only for the purposes stated.
          </Typography>
          <Typography variant="h6" gutterBottom>
            User Data
          </Typography>
          <Typography paragraph>
            We do not sell, trade, or otherwise transfer your personal data to
            outside parties. We may share your information with trusted third
            parties who assist us in operating our website and providing
            services to you, as long as those parties agree to keep this
            information confidential.
          </Typography>
          <Typography paragraph>
            By using our website, you consent to our privacy policy and terms of
            service. If you have any questions or concerns, please contact us.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseTerms}>Close</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openRegisterDialog} onClose={handleCloseRegister}>
        <DialogTitle>{isRegisterForm ? "Sign Up" : "Log In"}</DialogTitle>
        <DialogContent>
        {isRegisterForm ? (
  <>
    <TextField
      margin="dense"
      label="Email Address"
      type="email"
      fullWidth
      variant="standard"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      error={!!errors.email}
      helperText={errors.email}
    />
    <TextField
      margin="dense"
      label="Username"
      type="text"
      fullWidth
      variant="standard"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
      error={!!errors.username}
      helperText={errors.username}
    />
    <TextField
      margin="dense"
      label="Password"
      type="password"
      fullWidth
      variant="standard"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      error={!!errors.password}
      helperText={errors.password}
    />
    <TextField
      margin="dense"
      label="Confirm Password"
      type="password"
      fullWidth
      variant="standard"
      value={confirmpassword}
      onChange={(e) => setConfirmPassword(e.target.value)}
      error={!!errors.confirmpassword}
      helperText={errors.confirmpassword}
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
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      error={!!errors.email}
      helperText={errors.email}
    />
    <TextField
      margin="dense"
      label="Password"
      type="password"
      fullWidth
      variant="standard"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      error={!!errors.password}
      helperText={errors.password}
    />
  </>
)}

          <Box sx={{ marginTop: "1rem", textAlign: "center" }}>
            {isRegisterForm ? (
              <Typography
                variant="body2"
                onClick={toggleForm}
                sx={{ cursor: "pointer", color: "#F4A300" }}
              >
                Already have an account? Log in
              </Typography>
            ) : (
              <Typography
                variant="body2"
                onClick={toggleForm}
                sx={{ cursor: "pointer", color: "#F4A300" }}
              >
                Don't have an account? Sign up
              </Typography>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseRegister} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleAuth}
            color="primary"
          >
            {isRegisterForm ? "Sign Up" : "Log In"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Footer */}
      <Box
        sx={{
          backgroundColor: "#333",
          color: "#fff",
          padding: "1rem 0",
          textAlign: "center",
          marginTop: "auto",
          [theme.breakpoints.down("md")]: {
            padding: "0.5rem 0",
          },
        }}
      >
        <Typography variant="body2">
          © 2024 Cook. All rights reserved mlap southern africa.
        </Typography>
        <Box
          sx={{
            marginTop: "0.5rem",
            display: "flex",
            justifyContent: "center",
            gap: "1rem",
          }}
        >
          <IconButton
            component="a"
            href="https://www.facebook.com"
            target="_blank"
            sx={{ color: "white", "&:hover": { color: "#4267B2" } }}
          >
            <FaFacebookF size={24} />
          </IconButton>
          <IconButton
            component="a"
            href="https://www.instagram.com"
            target="_blank"
            sx={{ color: "white", "&:hover": { color: "#C13584" } }}
          >
            <FaInstagram size={24} />
          </IconButton>
          <IconButton
            component="a"
            href="https://twitter.com"
            target="_blank"
            sx={{ color: "white", "&:hover": { color: "#1DA1F2" } }}
          >
            <FaTwitter size={24} />
          </IconButton>
          <IconButton
            component="a"
            href="https://www.pinterest.com"
            target="_blank"
            sx={{ color: "white", "&:hover": { color: "#E60023" } }}
          >
            <FaPinterestP size={24} />
          </IconButton>
        </Box>
      </Box>
    </>
  );
}

export default LandingPage;
