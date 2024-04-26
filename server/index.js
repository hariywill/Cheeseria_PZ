import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import bodyParser from "body-parser";
import cors from "cors";
import cheesesRouter from "./routes/cheese.js";

const PORT = process.env.PORT || 5050;

const app = express();

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'PZ Cheeseria API',
      description: 'API documentation for PZ Cheeseria',
      version: '1.0.0',
    },
  },
  apis: ['./routes/*.js'],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req,res) => {
    res.json("This is running");
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/api/cheeses', cheesesRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});