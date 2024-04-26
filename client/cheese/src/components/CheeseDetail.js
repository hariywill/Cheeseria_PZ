import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

function CheeseDetail(props) {
    const { selectedCheese } = props;
    const [selectedCheeseWeight, setSelectedCheeseWeight] = useState("");
    const [helperText, setHelperText] = useState("");
    const [totalPrice, setTotalPrice] = useState(0.5 * parseFloat(selectedCheese.pricePerKilo.substring(1)));

    const handleCalculate = () => {
        setTotalPrice(parseFloat(selectedCheeseWeight) * parseFloat(selectedCheese.pricePerKilo.substring(1)))
    }

    const handleValueChange = (event) => {
        var input = event.target.value;

        if (!isNaN(parseFloat(input)) || input === '') {
          setSelectedCheeseWeight(input);
          setHelperText("");
        } else {
          setHelperText("Input needs to be number only");
        }

        handleCalculate();
    }

    useEffect(() => {
        handleCalculate();
    }, [selectedCheese]);

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <Typography>
                Selected cheese: {selectedCheese == null ? "No cheese selected" : selectedCheese.name}
              </Typography>
            </Grid>
            <Grid item xs={6} md={6}>
              <Typography>
                Cheese price per kilo: {selectedCheese == null ? "No cheese selected" : selectedCheese.pricePerKilo}
              </Typography>
            </Grid>
            <Grid item xs={6} md={6}>
               <TextField
                label="Weight (kg)"
                value={selectedCheeseWeight}
                onChange={handleValueChange}
                helperText={helperText}
              />
            </Grid>
            
            <Grid item xs={6} md={6}>
               <Button size="small" onClick={() => handleCalculate()}>Calculate</Button>
            </Grid>

            <Grid item xs={6} md={6}>
               {selectedCheeseWeight === "" ? "" : `Total price: ${totalPrice}`}
            </Grid>
        </Grid>
    );
}

export default CheeseDetail;