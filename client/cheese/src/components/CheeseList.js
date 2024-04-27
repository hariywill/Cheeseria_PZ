import React from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';


function CheeseList(props) {
    const { cheeses, selectedCheese, setSelectedCheese, handleDelete } = props;

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
                    <Grid key={cheese.id} item data-testid='cheese-item'>
                      <Card 
                        sx={{ 
                          maxWidth: 345,
                          width: 250,
                          backgroundColor: `${cheese.id === selectedCheese?.id ? "azure" : "white"}`,
                          opacity: `${cheese.id === selectedCheese?.id ? "100%" : "60%"}`,
                          }}                
                      >
                        <CardHeader
                          title= {cheese.name}
                        />
                        <CardMedia
                          component="img"
                          style={{ height: "150px" }}
                          image={require(`../images/${cheese.image}`)}
                          alt={cheese.name}
                        />
                        <CardContent >
                          <Typography variant="body2" >
                            {cheese.pricePerKilo} per kilo
                          </Typography>
                          <Typography variant="body2">
                            {cheese.color}
                          </Typography>
                        </CardContent>
                        <CardActions disableSpacing>
                          <Button size="small" onClick={() => handleSelect(cheese)} data-testid={`select-${cheese.id}`}>Select</Button>
                          <Button size="small" color='error' onClick={() => handleDelete(cheese.id)} data-testid={`delete-${cheese.id}`}>delete</Button>
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