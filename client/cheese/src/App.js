import './App.css';
import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import axios from "axios";
import CheeseList from './components/CheeseList';
import CheeseDetail from './components/CheeseDetail';

import Snackbar from '@mui/material/Snackbar';

const baseUrl = "http://localhost:5050/api/cheeses/"

function App() {
  const [cheeses, setCheeses] = useState([]);
  const [selectedCheese, setSelectedCheese] = useState(null);
  const [isCheesesSelected, setIsCheesesSelected] = useState(false);
  const [open, setOpen] = useState(false);

  const refreshData = async () => {
      try {
        const response = await axios.get(baseUrl);
        setCheeses(response.data);
        console.log('Cheese refreshed successfully:', response.data);
      } catch (error) {
        console.error('Error fetching cheeses:', error);
      }
    };

  const handleAdd = async () => {
    try {
      const newCheeseData = {
        name: 'Mozzarella',
        pricePerKilo: '$79',
        color: 'White',
        image: 'mozzarella.jpg'
      };
      const response = await axios.post(baseUrl, newCheeseData);
      console.log('Cheese added successfully:', response.data);
    } catch (error) {
      setOpen(true);
      console.error('Error adding cheese:', error);
    }
  };

  const handleUpdate = async (cheese) => {
    try {
      const updatedCheeseData = {
        name: `Updated ${cheese.name}`,
        pricePerKilo: '$1000',
        color: 'Black',
        image: cheese.image
      };
      const response = await axios.put(baseUrl + cheese.id, updatedCheeseData);
      console.log('Cheese updated successfully:', response.data);
      refreshData();
      setIsCheesesSelected(false);
    } catch (error) {
      console.error('Error deleting cheese:', error);
    }
  };

  const handleDelete = async (cheeseId) => {
    try {
      
      await axios.delete(baseUrl + cheeseId);
      console.log('Cheese deleted successfully');
      refreshData();
    } catch (error) {
      console.error('Error deleting cheese:', error);
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(baseUrl);
        setCheeses(response.data);
      } catch (error) {
        console.error('Error fetching cheeses:', error);
      }
    };

    fetchData();

    if (cheeses.length > 0 && !isCheesesSelected)
    {
      var index = selectedCheese == null ? 0 : selectedCheese.id - 1;
      setSelectedCheese(cheeses[index]);
      setIsCheesesSelected(true);
      console.log(selectedCheese);
    }
  }, [cheeses, selectedCheese]);

  return (
    <Container className="App"
      sx={{
          height: '100vh',
        }}  
    >
      <Box
        sx={{
          p: 2,
          borderRadius: 2,
          bgcolor: 'white',
          opacity: '70%',
          display: 'grid',
          gap: 2,
          flexGrow: 1,
          margin: 2
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <CheeseList cheeses={cheeses} setSelectedCheese={setSelectedCheese} handleDelete={handleDelete}/>
          </Grid>
        </Grid>
      </Box>
      
      {isCheesesSelected && 
        <Box
          sx={{
            p: 2,
            borderRadius: 2,
            bgcolor: 'white',
            opacity: '70%',
            display: 'grid',
            gap: 2,
            flexGrow: 1,
            margin: 2
          }}
        >
          <CheeseDetail selectedCheese={selectedCheese} />
        </Box>
      }

      <Box
        sx={{
          p: 2,
          borderRadius: 2,
          bgcolor: 'white',
          opacity: '70%',
          display: 'grid',
          gap: 2,
          flexGrow: 1,
          margin: 2
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={6} md={6}>
             <Button size="small" onClick={() => handleUpdate(selectedCheese)}>Update price</Button>
          </Grid>
          <Grid item xs={6} md={6}>
             <Button size="small" onClick={() => handleAdd(selectedCheese)}>Add Cheese</Button>
             <Snackbar
              open={open}
              autoHideDuration={2000}
              onClose={handleSnackbarClose}
              message="Cheese added failed"
            />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default App;
