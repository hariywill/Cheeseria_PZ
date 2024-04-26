import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import cheesesRouter from "./routes/cheese.js";

const PORT = process.env.PORT || 5050;

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req,res) => {
    res.json("This is running");
});

app.use('/api/cheeses', cheesesRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});