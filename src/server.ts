import express from "express";
import cors from "cors";
import { MastraServer } from "@mastra/express";
import mastra from "./mastra/index.js";


const app = express();
app.use(cors());
app.use(express.json());

const server = new MastraServer({ app, mastra :mastra });
await server.init();


app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello World' });
});

const PORT =3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});