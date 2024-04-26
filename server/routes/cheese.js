import express from "express"

const router = express.Router();

// Mock cheese data
let cheeses = [
  { id: 1, name: 'Cheddar', pricePerKilo: '$50', color: 'Yellow', image: 'cheddar.jpg' },
  { id: 2, name: 'Brie', pricePerKilo: '$79', color: 'White', image: 'brie.jpg' },
  { id: 3, name: 'Mascarpone', pricePerKilo: '$57', color: 'White', image: 'Mascarpone.jpg' },
  { id: 4, name: 'Parmesan', pricePerKilo: '$88', color: 'Yellow', image: 'Parmesan.jpg' },
  { id: 5, name: 'Gorgonzola', pricePerKilo: '$109', color: 'Yellow', image: 'Gorgonzola.jpg' },
  // Add more cheeses here...
];

// GET all cheeses
router.get('/', (req, res) => {
  res.json(cheeses);
});

// GET single cheese by ID
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const cheese = cheeses.find(cheese => cheese.id === id);
  if (cheese) {
    res.json(cheese);
  } else {
    res.status(404).send('Cheese not found');
  }
});

// POST create a new cheese
router.post('/', (req, res) => {
  const { name, pricePerKilo, color, image } = req.body;
  const isDuplicateName = cheeses.some((cheese) => cheese.name === name);
  if (isDuplicateName) {
    return res.status(400).json({ error: 'Cheese with the same name already exists.' });
  }
  const id = cheeses.length + 1;
  const newCheese = { id, name, pricePerKilo, color, image };
  cheeses.push(newCheese);
  res.status(201).json(newCheese);
});

// PUT update an existing cheese
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = cheeses.findIndex(cheese => cheese.id === id);
  if (index !== -1) {
    const { name, pricePerKilo, color, image } = req.body;
    cheeses[index] = { id, name, pricePerKilo, color, image };
    res.json(cheeses[index]);
  } else {
    res.status(404).send('Cheese not found');
  }
});

// DELETE a cheese
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = cheeses.findIndex(cheese => cheese.id === id);
  if (index !== -1) {
    cheeses.splice(index, 1);
    res.sendStatus(204);
  } else {
    res.status(404).send('Cheese not found');
  }
});

export default router;