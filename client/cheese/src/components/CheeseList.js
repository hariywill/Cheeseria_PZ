import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';

import axios from "axios";

function CheeseList(props) {
    const { cheeses, setSelectedCheese, deleteCheese } = props;

    const handleSelect = (cheese) => {
      setSelectedCheese(cheese);
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
                <Typography variant="h3">All cheeses in stock</Typography>
            </Grid>
            <Grid item xs={12} md={12}>
                <Grid container justifyContent="center" spacing={2}>
                  {cheeses.map((cheese) => (
                    <Grid key={cheese.id} item>
                      <Card 
                        sx={{ 
                          maxWidth: 345,
                          width: 250,
                          backgroundColor: "azure",
                          }}                
                      >
                        <CardHeader
                          title= {cheese.name}
                        />
                        <CardMedia
                          component="img"
                          height="150"
                          src="../../public/images/brie.jpg"
                          alt={cheese.name}
                        />
                        <CardContent >
                          <Typography variant="body2" >
                            {cheese.pricePerKilo}
                          </Typography>
                          <Typography variant="body2">
                            {cheese.color}
                          </Typography>
                        </CardContent>
                        <CardActions disableSpacing>
                          <Button size="small" onClick={() => handleSelect(cheese)}>Select</Button>
                          <Button size="small" color='error' onClick={() => deleteCheese(cheese.id)}>delete</Button>
                        </CardActions>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
            </Grid>
        </Grid>
    );
}

export default CheeseList;