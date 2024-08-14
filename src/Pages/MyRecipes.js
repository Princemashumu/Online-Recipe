import React, { useState, useEffect } from 'react';
import {
  Typography,
  TextField,
  Button,
  Container,
  Box,
  Grid,
  Card,
  CardContent,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios';

// Styled Components
const MainContainer = styled(Container)(({ theme }) => ({
  marginTop: '2rem',
  padding: '2rem',
  backgroundColor: '#F5F5DC', // Beige color for the container
  borderRadius: '8px',
  [theme.breakpoints.down('md')]: {
    padding: '1rem',
  },
}));

const Sidebar = styled(Box)(({ theme }) => ({
  padding: '30px',
  backgroundColor: '#F5F5DC', // Beige color for the sidebar
  borderRadius: '8px',
  position: 'relative',
  [theme.breakpoints.down('md')]: {
    padding: '15px',
  },
}));

const RecipesGrid = styled(Grid)(({ theme }) => ({
  marginTop: '2rem',
  [theme.breakpoints.down('md')]: {
    marginTop: '1rem',
  },
}));

const RecipeCard = styled(Card)(({ theme }) => ({
  padding: '1rem',
  backgroundColor: '#F5F5DC', // Beige color for the card to match the theme
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
}));

const DividerStyled = styled(Divider)(({ theme }) => ({
  height: '100%', // Full height
  width: '2px', // Thickness of the divider
  backgroundColor: '#FFFFFF', // White color
  margin: '0 1rem',
}));

const RecipeDetails = styled(Box)(({ theme }) => ({
  marginTop: '1rem',
  textAlign: 'left',
}));

function MyRecipes() {
  const [recipeData, setRecipeData] = useState({
    name: '',
    cuisine: '',
    ingredients: '',
    instructions: '',
    prepTime: '',
    cookTime: '',
    servings: ''
  });
  
  const [recipes, setRecipes] = useState([]);
  const [errors, setErrors] = useState({});
  const [expandedRecipe, setExpandedRecipe] = useState(null);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [currentEditIndex, setCurrentEditIndex] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3001/recipes')
      .then(response => setRecipes(response.data))
      .catch(error => console.error('Error fetching recipes:', error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipeData({
      ...recipeData,
      [name]: value
    });
  };

  const validateFields = () => {
    const newErrors = {};
    if (!recipeData.name) newErrors.name = 'Recipe Name is required';
    if (!recipeData.cuisine) newErrors.cuisine = 'Category is required';
    if (!recipeData.ingredients) newErrors.ingredients = 'Ingredients are required';
    if (!recipeData.instructions) newErrors.instructions = 'Instructions are required';
    if (!recipeData.prepTime) newErrors.prepTime = 'Preparation Time is required';
    if (!recipeData.cookTime) newErrors.cookTime = 'Cooking Time is required';
    if (!recipeData.servings) newErrors.servings = 'Servings are required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddRecipe = () => {
    if (!validateFields()) return;

    const formData = new FormData();
    formData.append('name', recipeData.name);
    formData.append('cuisine', recipeData.cuisine);
    formData.append('ingredients', recipeData.ingredients);
    formData.append('instructions', recipeData.instructions);
    formData.append('prepTime', recipeData.prepTime);
    formData.append('cookTime', recipeData.cookTime);
    formData.append('servings', recipeData.servings);

    axios.post('http://localhost:3001/recipes', formData)
      .then(response => {
        setRecipes([...recipes, response.data]);
        setRecipeData({
          name: '',
          cuisine: '',
          ingredients: '',
          instructions: '',
          prepTime: '',
          cookTime: '',
          servings: ''
        });
        setErrors({});
        setAddDialogOpen(false);
      })
      .catch(error => console.error('Error adding recipe:', error));
  };

  const handleEditRecipe = () => {
    if (!validateFields()) return;

    const updatedRecipe = { ...recipeData };
    axios.put(`http://localhost:3001/recipes/${recipes[currentEditIndex].id}`, updatedRecipe)
      .then(response => {
        const updatedRecipes = recipes.map((recipe, index) => 
          index === currentEditIndex ? response.data : recipe
        );
        setRecipes(updatedRecipes);
        setEditDialogOpen(false);
        setCurrentEditIndex(null);
        setRecipeData({
          name: '',
          cuisine: '',
          ingredients: '',
          instructions: '',
          prepTime: '',
          cookTime: '',
          servings: ''
        });
        setErrors({});
      })
      .catch(error => console.error('Error updating recipe:', error));
  };

  const handleDeleteRecipe = (index) => {
    axios.delete(`http://localhost:3001/recipes/${recipes[index].id}`)
      .then(() => {
        const updatedRecipes = recipes.filter((_, i) => i !== index);
        setRecipes(updatedRecipes);
      })
      .catch(error => console.error('Error deleting recipe:', error));
  };

  const handleToggleDetails = (index) => {
    setExpandedRecipe(expandedRecipe === index ? null : index);
  };

  const openAddDialog = () => {
    setAddDialogOpen(true);
  };

  const closeAddDialog = () => {
    setAddDialogOpen(false);
    setRecipeData({
      name: '',
      cuisine: '',
      ingredients: '',
      instructions: '',
      prepTime: '',
      cookTime: '',
      servings: ''
    });
    setErrors({});
  };

  const openEditDialog = (index) => {
    setCurrentEditIndex(index);
    setRecipeData(recipes[index]);
    setEditDialogOpen(true);
  };

  const closeEditDialog = () => {
    setEditDialogOpen(false);
    setCurrentEditIndex(null);
    setRecipeData({
      name: '',
      cuisine: '',
      ingredients: '',
      instructions: '',
      prepTime: '',
      cookTime: '',
      servings: ''
    });
    setErrors({});
  };

  return (
    <MainContainer maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom>
        My Recipes
      </Typography>
      <Grid container spacing={2}>
        {/* Sidebar with Add Recipe Button */}
        <Grid item xs={12} md={4}>
          <Sidebar>
            <Button
              variant="outlined"
              color="primary"
              onClick={openAddDialog}
            >
              Add Recipe
            </Button>
          </Sidebar>
        </Grid>

        {/* Divider */}
        <Grid item xs={12} md={0.5}>
          <DividerStyled orientation="vertical" />
        </Grid>

        {/* Recipe Cards Grid */}
        <Grid item xs={12} md={8}>
          <RecipesGrid container spacing={2}>
            {recipes.map((recipe, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <RecipeCard>
                  <img
                    src={recipe.picture || '/default-image.png'}
                    alt={recipe.name}
                    style={{ width: '100%', borderRadius: '8px' }}
                  />
                  <CardContent>
                    <Typography variant="h6">{recipe.name}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      Prep Time: {recipe.prepTime} | Cooking Time: {recipe.cookTime} | Servings: {recipe.servings}
                    </Typography>
                    <Button
                      variant="outlined"
                      color="primary"
                      sx={{ mt: 2, mr: 1 }}
                      onClick={() => handleToggleDetails(index)}
                    >
                      {expandedRecipe === index ? 'Hide Details' : 'See Full Details'}
                    </Button>
                    <Button
                      variant="outlined"
                      color="secondary"
                      sx={{ mt: 2, mr: 1 }}
                      onClick={() => openEditDialog(index)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      sx={{ mt: 2 }}
                      onClick={() => handleDeleteRecipe(index)}
                    >
                      Delete
                    </Button>
                    {expandedRecipe === index && (
                      <RecipeDetails>
                        <Typography variant="body1"><strong>Ingredients:</strong> {recipe.ingredients}</Typography>
                        <Typography variant="body1"><strong>Instructions:</strong> {recipe.instructions}</Typography>
                      </RecipeDetails>
                    )}
                  </CardContent>
                </RecipeCard>
              </Grid>
            ))}
          </RecipesGrid>
        </Grid>
      </Grid>

      {/* Add Recipe Modal */}
      <Dialog open={addDialogOpen} onClose={closeAddDialog} fullWidth maxWidth="md">
        <DialogTitle>Add New Recipe</DialogTitle>
        <DialogContent>
          {/* Add Recipe Form Fields */}
          <TextField
            label="Recipe Name"
            name="name"
            value={recipeData.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={Boolean(errors.name)}
            helperText={errors.name}
          />
          <TextField
            label="Cuisine Type"
            name="cuisine"
            value={recipeData.cuisine}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={Boolean(errors.cuisine)}
            helperText={errors.cuisine}
          />
          <TextField
            label="Ingredients"
            name="ingredients"
            value={recipeData.ingredients}
            onChange={handleChange}
            fullWidth
            margin="normal"
            multiline
            error={Boolean(errors.ingredients)}
            helperText={errors.ingredients}
          />
          <TextField
            label="Instructions"
            name="instructions"
            value={recipeData.instructions}
            onChange={handleChange}
            fullWidth
            margin="normal"
            multiline
            error={Boolean(errors.instructions)}
            helperText={errors.instructions}
          />
          <TextField
            label="Preparation Time"
            name="prepTime"
            value={recipeData.prepTime}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={Boolean(errors.prepTime)}
            helperText={errors.prepTime}
          />
          <TextField
            label="Cooking Time"
            name="cookTime"
            value={recipeData.cookTime}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={Boolean(errors.cookTime)}
            helperText={errors.cookTime}
          />
          <TextField
            label="Servings"
            name="servings"
            value={recipeData.servings}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={Boolean(errors.servings)}
            helperText={errors.servings}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeAddDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddRecipe} color="primary">
            Add Recipe
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Recipe Modal */}
      <Dialog open={editDialogOpen} onClose={closeEditDialog} fullWidth maxWidth="md">
        <DialogTitle>Edit Recipe</DialogTitle>
        <DialogContent>
          {/* Edit Recipe Form Fields */}
          <TextField
            label="Recipe Name"
            name="name"
            value={recipeData.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={Boolean(errors.name)}
            helperText={errors.name}
          />
          <TextField
            label="Cuisine Type"
            name="cuisine"
            value={recipeData.cuisine}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={Boolean(errors.cuisine)}
            helperText={errors.cuisine}
          />
          <TextField
            label="Ingredients"
            name="ingredients"
            value={recipeData.ingredients}
            onChange={handleChange}
            fullWidth
            margin="normal"
            multiline
            error={Boolean(errors.ingredients)}
            helperText={errors.ingredients}
          />
          <TextField
            label="Instructions"
            name="instructions"
            value={recipeData.instructions}
            onChange={handleChange}
            fullWidth
            margin="normal"
            multiline
            error={Boolean(errors.instructions)}
            helperText={errors.instructions}
          />
          <TextField
            label="Preparation Time"
            name="prepTime"
            value={recipeData.prepTime}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={Boolean(errors.prepTime)}
            helperText={errors.prepTime}
          />
          <TextField
            label="Cooking Time"
            name="cookTime"
            value={recipeData.cookTime}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={Boolean(errors.cookTime)}
            helperText={errors.cookTime}
          />
          <TextField
            label="Servings"
            name="servings"
            value={recipeData.servings}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={Boolean(errors.servings)}
            helperText={errors.servings}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeEditDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleEditRecipe} color="primary">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </MainContainer>
  );
}

export default MyRecipes;
