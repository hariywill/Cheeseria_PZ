import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

function CheeseDetail(props) {
    const { selectedCheese } = props;
    const [selectedCheeseWeight, setSelectedCheeseWeight] = useState(0.5);

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <Typography>
                Selected cheese: {selectedCheese == null ? "No cheese selected" : selectedCheese.name}
              </Typography>
            </Grid>
            <Grid item xs={6} md={6}>
              <Typography>
                Cheese color: {selectedCheese == null ? "No cheese selected" : selectedCheese.color}
              </Typography>
            </Grid>
            <Grid item xs={6} md={6}>
              <Typography>
                Cheese price per kio: {selectedCheese == null ? "No cheese selected" : selectedCheese.pricePerKilo}
              </Typography>
            </Grid>
            <Grid item xs={6} md={6}>
               <TextField
                label="Weight (kg)"
                defaultValue={selectedCheeseWeight}
              />
            </Grid>
            <Grid item xs={6} md={6}>
               Total price: 
            </Grid>
        </Grid>
    );
}

export default CheeseDetail;