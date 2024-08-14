import React, { useEffect, useState, useRef } from "react";
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
  CircularProgress,
  Card,
  CardContent,
  CardMedia,
  CardActions,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import { FaFacebookF, FaInstagram, FaTwitter, FaPinterestP, FaUser, FaSearch, FaTimes, FaHamburger, FaEdit, FaTrash } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


// Styles
const MainContainer = styled(Container)(({ theme }) => ({
  backgroundColor: '#F5F5DC',
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
  width: '60%',
  maxHeight: '80%',
  overflowY: 'auto',
}));

const LoaderContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
}));

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

const AddRecipeModal = styled(Paper)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  padding: theme.spacing(2),
  width: '50%',
  maxHeight: '80%',
  overflowY: 'auto',
}));


function HomePage() {
  const theme = useTheme();
  const [openRecipeDialog, setOpenRecipeDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const [loadingResults, setLoadingResults] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [addRecipeModalOpen, setAddRecipeModalOpen] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const recipesRef = useRef(null); // Ref for the popular recipes container
  const [editRecipe, setEditRecipe] = useState(null);
  const [editRecipeModalOpen, setEditRecipeModalOpen] = useState(false);

  
  
  const [newRecipe, setNewRecipe] = useState({
    name: '',
    ingredients: '',
    instructions: '',
    category: '',
    prepTime: '',
    cookTime: '',
    servings: '',
    picture: '', // Added picture field
  });
  const navigate = useNavigate();

 // Fetch recipes from JSON server
 useEffect(() => {
  const fetchRecipes = async () => {
    try {
      const response = await axios.get('http://localhost:3001/recipes');
      setRecipes(response.data);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  fetchRecipes();
}, []);

const handleSearch = async () => {
  setLoadingResults(true);
  try {
    setTimeout(async () => {
      try {
        const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`);
        setResults(response.data.meals || []);
        setOpen(true);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoadingResults(false);
      }
    }, 3000);
  } catch (error) {
    console.error('Error fetching data:', error);
    setLoadingResults(false);
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

const handleOpenRecipe = (recipe) => {
  setSelectedRecipe(recipe);
  setOpenRecipeDialog(true);
};

const handleCloseAccountMenu = () => {
  setAccountMenuOpen(false);
  setAnchorEl(null);
};

const handleSignOut = () => {
  navigate('/');
  handleCloseAccountMenu();
};

const handleMyRecipes = () => {
  handleCloseAccountMenu();
};

const handleToggleSidebar = () => {
  setSidebarOpen(!sidebarOpen);
};

const handleCloseAddRecipeModal = () => {
  setAddRecipeModalOpen(false);
};

const handleCloseEditRecipeModal = () => {
  setEditRecipeModalOpen(false);
  setEditRecipe(null);
};

const handleInputChange = (e) => {
  const { name, value } = e.target;
  setNewRecipe((prevState) => ({
    ...prevState,
    [name]: value,
  }));
};
const handleUpdateRecipe = async () => {
  try {
    await axios.put(`http://localhost:3001/recipes/${editRecipe.id}`, editRecipe);

    // Fetch the updated list of recipes
    const response = await axios.get('http://localhost:3001/recipes');
    setRecipes(response.data);

    handleCloseEditRecipeModal();
  } catch (error) {
    console.error('Error updating recipe:', error);
  }
};

const handleAddRecipe = async () => {
  try {
    // Add the new recipe to the JSON server
    await axios.post('http://localhost:3001/recipes', newRecipe);
    
    // Fetch the updated list of recipes
    const response = await axios.get('http://localhost:3001/recipes');
    setRecipes(response.data);
    
    // Close the modal and reset the form
    setAddRecipeModalOpen(false);
    setNewRecipe({
      name: '',
      ingredients: '',
      instructions: '',
      category: '',
      prepTime: '',
      cookTime: '',
      servings: '',
      picture: '', 
    });
  } catch (error) {
    console.error('Error adding recipe:', error);
  }
};

const handleEditRecipe = async () => {
  if (!editRecipe) {
    console.error('No recipe to edit');
    return;
  }

  try {
    // Prepare updatedRecipe with all required fields
    const updatedRecipe = {
      ...editRecipe
    };

    // Send update request
    const response = await axios.put(`http://localhost:3001/recipes/${updatedRecipe.id}`, updatedRecipe);

    // Check response status
    if (response.status === 200) {
      console.log('Recipe updated successfully');
      // Fetch the updated list of recipes
      const updatedRecipesResponse = await axios.get('http://localhost:3001/recipes');
      setRecipes(updatedRecipesResponse.data);

      // Close the dialog/modal
      setOpenRecipeDialog(false);
    } else {
      console.error('Failed to update recipe, status:', response.status);
    }
  } catch (error) {
    console.error('Error updating recipe:', error.message || error);
  }
};



const handleDeleteRecipe = async (id) => {
  try {
    await axios.delete(`http://localhost:3001/recipes/${id}`);

    // Fetch the updated list of recipes
    const response = await axios.get('http://localhost:3001/recipes');
    setRecipes(response.data);
  } catch (error) {
    console.error('Error deleting recipe:', error);
  }
};

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#F5F5DC'}}>
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
            justifyContent: 'space-between',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton onClick={handleToggleSidebar} sx={{ color: '#F4A300' }}>
              <FaHamburger />
            </IconButton>
            <Typography
              variant="h6"
              className="appName"
              sx={{
                fontWeight: 'bold',
                letterSpacing: 1.5,
                color: '#F4A300',
                fontSize: 'xx-large',
                transition: 'color 0.3s',
                [theme.breakpoints.down('md')]: { fontSize: 'large' },
              }}
            >
              Cook.
            </Typography>
          </Box>

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
          <Button
            onClick={() => setAddRecipeModalOpen(true)}
            variant="outlined"
            color="primary"
            sx={{ margin: '16px 0', color:"#F4A300", borderColor:"#F4A300"}}
            
          >
          Add Recipe
          </Button>
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
          >
            <MenuItem onClick={handleMyRecipes}>My Recipes</MenuItem>
            <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <Box component="main" sx={{ flex: 1, mt: 8 }}>
        <MainContainer>
      
        <Box sx={{ mb: 2 }}>
            <Typography variant="h4" gutterBottom>
              My Recipes
            </Typography>
            <CardContainer>
              {recipes.map((recipe) => (
                <Card key={recipe.id} sx={{ maxWidth: 345 }}>
                  <CardMedia
                    component="img"
                    alt={recipe.name}
                    height="140"
                    image={recipe.picture}
                    sx={{ objectFit: 'cover' }}
                  />
                  <CardContent>
                    <Typography variant="h6" component="div">
                      {recipe.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Prep Time: {recipe.prepTime} | Cook Time: {recipe.cookTime} | Servings: {recipe.servings}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() => handleEditRecipe(recipe)}
                    >
                      <FaEdit />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => handleDeleteRecipe(recipe.id)}
                    >
                      <FaTrash />
                    </IconButton>
                  </CardActions>
                </Card>
              ))}
            </CardContainer>
          </Box>
        </MainContainer>
      </Box>
{/*model for editing recipes*/}
<Modal
  open={editRecipeModalOpen}
  onClose={handleCloseEditRecipeModal}
>
  <AddRecipeModal>
    <Typography variant="h6" gutterBottom>
      Edit Recipe
    </Typography>
    <TextField
      label="Recipe Name"
      name="name"
      value={editRecipe?.name || ''}
      onChange={(e) => setEditRecipe({ ...editRecipe, name: e.target.value })}
      fullWidth
      margin="normal"
    />
    <TextField
      label="Ingredients"
      name="ingredients"
      value={editRecipe?.ingredients || ''}
      onChange={(e) => setEditRecipe({ ...editRecipe, ingredients: e.target.value })}
      fullWidth
      margin="normal"
      multiline
      rows={4}
    />
    <TextField
      label="Instructions"
      name="instructions"
      value={editRecipe?.instructions || ''}
      onChange={(e) => setEditRecipe({ ...editRecipe, instructions: e.target.value })}
      fullWidth
      margin="normal"
      multiline
      rows={4}
    />
    <TextField
      label="Category"
      name="category"
      value={editRecipe?.category || ''}
      onChange={(e) => setEditRecipe({ ...editRecipe, category: e.target.value })}
      fullWidth
      margin="normal"
    />
    <TextField
      label="Preparation Time"
      name="prepTime"
      value={editRecipe?.prepTime || ''}
      onChange={(e) => setEditRecipe({ ...editRecipe, prepTime: e.target.value })}
      fullWidth
      margin="normal"
    />
    <TextField
      label="Cooking Time"
      name="cookTime"
      value={editRecipe?.cookTime || ''}
      onChange={(e) => setEditRecipe({ ...editRecipe, cookTime: e.target.value })}
      fullWidth
      margin="normal"
    />
    <TextField
      label="Servings"
      name="servings"
      value={editRecipe?.servings || ''}
      onChange={(e) => setEditRecipe({ ...editRecipe, servings: e.target.value })}
      fullWidth
      margin="normal"
    />
    <TextField
      label="Picture URL"
      name="picture"
      value={editRecipe?.picture || ''}
      onChange={(e) => setEditRecipe({ ...editRecipe, picture: e.target.value })}
      fullWidth
      margin="normal"
    />
    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
      <Button onClick={handleCloseEditRecipeModal} color="primary">
        Cancel
      </Button>
      <Button onClick={handleUpdateRecipe} color="primary" sx={{ ml: 2 }}>
        Update Recipe
      </Button>
    </Box>
  </AddRecipeModal>
</Modal>

      {/* Recipe Details Modal */}
      <Modal
        open={open}
        onClose={handleClose}
      >
        <ResultModal>
          {selectedRecipe && (
            <>
              <Typography variant="h6" gutterBottom>
                {selectedRecipe.strMeal}
              </Typography>
              <Typography variant="body1">
                {selectedRecipe.strInstructions}
              </Typography>
            </>
          )}
        </ResultModal>
      </Modal>

      {/* Add Recipe Modal */}
      <Modal
        open={addRecipeModalOpen}
        onClose={handleCloseAddRecipeModal}
      >
        <AddRecipeModal>
          <Typography variant="h6" gutterBottom>
            Add New Recipe
          </Typography>
          <TextField
            label="Recipe Name"
            name="name"
            value={newRecipe.name}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Ingredients"
            name="ingredients"
            value={newRecipe.ingredients}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            multiline
            rows={4}
          />
          <TextField
            label="Instructions"
            name="instructions"
            value={newRecipe.instructions}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            multiline
            rows={4}
          />
          <TextField
            label="Category"
            name="category"
            value={newRecipe.category}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Preparation Time"
            name="prepTime"
            value={newRecipe.prepTime}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Cooking Time"
            name="cookTime"
            value={newRecipe.cookTime}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Servings"
            name="servings"
            value={newRecipe.servings}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Picture URL"
            name="picture"
            value={newRecipe.picture}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
            <Button onClick={handleCloseAddRecipeModal} color="primary">
              Cancel
            </Button>
            <Button onClick={handleAddRecipe} color="primary" sx={{ ml: 2 }}>
              Add Recipe
            </Button>
          </Box>
        </AddRecipeModal>
      </Modal>

      {/* Loader */}
      {loadingResults && (
        <LoaderContainer>
          <CircularProgress />
        </LoaderContainer>
      )}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="search-results-title"
        aria-describedby="search-results-description"
      >
        <ResultModal>
          <IconButton
            onClick={handleClose}
            sx={{ position: 'absolute', top: 10, right: 10, color: '#F4A300' }}
          >
            <FaTimes />
          </IconButton>
          {loadingResults ? (
            <LoaderContainer>
              <CircularProgress color="primary" />
            </LoaderContainer>
          ) : (
            <>
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
                          style={{ width: '60%', borderRadius: '4px', marginTop: '8px' }}
                        />
                        <Typography variant="body2" sx={{ mt: 1 }}>
                          <strong>Ingredients:</strong>
                        </Typography>
                        <ul>
                          {Array.from({ length: 20 }).map((_, i) => {
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
            </>
          )}
        </ResultModal>
      </Modal>

      <Modal open={Boolean(selectedRecipe)} onClose={() => setSelectedRecipe(null)} aria-labelledby="recipe-details-title">
        <ResultModal>
          <IconButton
            onClick={() => setSelectedRecipe(null)}
            sx={{ position: 'absolute', top: 10, right: 10, color: '#F4A300' }}
          >
            <FaTimes />
          </IconButton>
          {selectedRecipe && (
            <Box>
              <Typography id="recipe-details-title" variant="h6" component="h2">
                {selectedRecipe.strMeal}
              </Typography>
              <Typography id="recipe-details-description" sx={{ mt: 2 }}>
                <img src={selectedRecipe.strMealThumb} alt={selectedRecipe.strMeal} style={{ display:'flex',justifyContent:'center',alignContent:'center',width: '50%', borderRadius: '4px' }} />
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

      <Box sx={{ backgroundColor: '#333', color: '#fff', padding: '1rem 0', textAlign: 'center' }}>
        <Typography variant="body2">© 2024 Cook. All rights reserved.</Typography>
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
