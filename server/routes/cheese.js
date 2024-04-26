import express from "express"

const router = express.Router();

// Mock cheese data
// Actual sql database should be implemented for real project
// And CURD operations will be excuted with sql commands
let cheeses = [
  // Globally unique id instead of just ints
  { id: 1, name: 'Cheddar', pricePerKilo: '$50', color: 'Yellow', image: 'cheddar.jpg' },
  { id: 2, name: 'Brie', pricePerKilo: '$79', color: 'White', image: 'brie.jpg' },
  { id: 3, name: 'Mascarpone', pricePerKilo: '$57', color: 'White', image: 'mascarpone.jpg' },
  { id: 4, name: 'Parmesan', pricePerKilo: '$88', color: 'Yellow', image: 'parmesan.jpg' },
  { id: 5, name: 'Gorgonzola', pricePerKilo: '$109', color: 'Yellow', image: 'gorgonzola.jpg' },
  // Add more cheeses here...
];

/**
 * @swagger
 * /cheeses:
 *   get:
 *     summary: Get all cheeses
 *     description: Retrieve a list of all cheeses.
 *     responses:
 *       200:
 *         description: A list of cheeses.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Cheese'
 */
router.get('/', (req, res) => {
  res.json(cheeses);
});

/**
 * @swagger
 * /cheeses/{id}:
 *   get:
 *     summary: Get a cheese by ID
 *     description: Retrieve a single cheese by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the cheese to retrieve
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The requested cheese.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cheese'
 *       404:
 *         description: Cheese not found.
 */
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const cheese = cheeses.find(cheese => cheese.id === id);
  if (cheese) {
    res.json(cheese);
  } else {
    res.status(404).send('Cheese not found');
  }
});

/**
 * @swagger
 * /cheeses:
 *   post:
 *     summary: Add a new cheese
 *     description: Add a new cheese to the collection.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewCheese'
 *     responses:
 *       201:
 *         description: The newly created cheese.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cheese'
 *       400:
 *         description: Cheese with the same name already exists.
 */
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

/**
 * @swagger
 * /cheeses/{id}:
 *   put:
 *     summary: Update an existing cheese
 *     description: Update an existing cheese by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the cheese to update
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateCheese'
 *     responses:
 *       200:
 *         description: The updated cheese.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cheese'
 *       404:
 *         description: Cheese not found.
 */
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

/**
 * @swagger
 * /cheeses/{id}:
 *   delete:
 *     summary: Delete a cheese
 *     description: Delete a cheese by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the cheese to delete
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Cheese successfully deleted.
 *       404:
 *         description: Cheese not found.
 */
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