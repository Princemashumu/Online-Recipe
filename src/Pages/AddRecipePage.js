// src/pages/AddRecipePage.js
import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box } from '@mui/material';

const AddRecipePage = () => {
  const [newRecipe, setNewRecipe] = useState({
    name: '',
    ingredients: '',
    instructions: '',
    category: '',
    prepTime: '',
    cookTime: '',
    servings: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRecipe((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddRecipe = () => {
    // Handle form submission logic here
    console.log('New Recipe:', newRecipe);
    // Clear form fields after submission
    setNewRecipe({
      name: '',
      ingredients: '',
      instructions: '',
      category: '',
      prepTime: '',
      cookTime: '',
      servings: '',
    });
  };

  return (
    <Container maxWidth="md" sx={{ marginTop: '2rem' }}>
      <Typography variant="h4" gutterBottom>
        Add a New Recipe
      </Typography>
      <Box component="form" noValidate autoComplete="off">
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
        />
        <TextField
          label="Instructions"
          name="instructions"
          value={newRecipe.instructions}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
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
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddRecipe}
          sx={{ marginTop: '1rem' }}
        >
          Add Recipe
        </Button>
      </Box>
    </Container>
  );
};

export default AddRecipePage;
