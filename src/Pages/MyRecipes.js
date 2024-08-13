import React, { useState } from 'react';
import {
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Grid,
  Container
} from '@mui/material';
import { styled } from '@mui/material/styles';

const MyRecipesContainer = styled(Container)(({ theme }) => ({
  marginTop: '2rem',
  padding: '2rem',
  backgroundColor: '#F5F5DC', // Beige color for the container
  borderRadius: '8px',
  [theme.breakpoints.down('md')]: {
    padding: '1rem',
  },
}));

const RecipeCard = styled(Card)(({ theme }) => ({
  padding: '2rem',
  backgroundColor: '#F5F5DC', // Beige color for the card to match the theme
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
}));

function MyRecipes() {
  const [recipeData, setRecipeData] = useState({
    picture: '',
    name: '',
    cuisine: '',
    ingredients: '',
    instructions: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipeData({
      ...recipeData,
      [name]: value
    });
  };

  const handleSubmit = () => {
    console.log('Recipe Submitted:', recipeData);
    // You can add logic here to save the recipe data
  };

  return (
    <MyRecipesContainer maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Create a Recipe
      </Typography>
      <RecipeCard>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Recipe Name"
                name="name"
                value={recipeData.name}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Cuisine Type"
                name="cuisine"
                value={recipeData.cuisine}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Ingredients"
                name="ingredients"
                value={recipeData.ingredients}
                onChange={handleChange}
                multiline
                rows={4}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Instructions"
                name="instructions"
                value={recipeData.instructions}
                onChange={handleChange}
                multiline
                rows={4}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="outlined"
                component="label"
                sx={{ marginRight: '1rem' }}
              >
                Upload Picture
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) =>
                    setRecipeData({ ...recipeData, picture: e.target.files[0] })
                  }
                />
              </Button>
              <Button
                variant="outlined"
                color="primary"
                onClick={handleSubmit}
              >
                Save Recipe
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </RecipeCard>
    </MyRecipesContainer>
  );
}

export default MyRecipes;
