import express from "express";
import mongoose from "mongoose";
import { Memory } from "./backend/model/memories.js";
import cors from "cors";
import { configDotenv } from "dotenv";

const app = express();
app.use(cors());

configDotenv();

const PORT = 3000;
const MONGO_URI = process.env.MONGO_URI;

app.use(express.json());

mongoose.connect(MONGO_URI).then(() => {
  console.log(`mongodb conected`);
  app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
  });
});

app.get("/", (req, res) => {
  res.json(`APT Connected`);
});
app.post("/memories", async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      res.status(404).send("Enter All the info");
    } else {
      const newmemory = await new Memory({
        title,
        content,
      });
      newmemory.save();
      res.status(200).json(newmemory);
    }
  } catch (error) {
    console.log(error);
  }
});

app.get("/memories", async (req, res) => {
  try {
    const memory = await Memory.find();
    res.status(201).send(memory);
  } catch (error) {
    console.log(error);
  }
});

app.delete("/memories/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Memory.findByIdAndDelete(id);
    res.status(200).send("Memory Deleted");
  } catch (error) {
    console.log(error);
  }
});

app.put("/memories/:id", async (req, res) => {
  try {
    const { title, content } = req.body;
    const { id } = req.params;
    if (!title || !content) {
      return res.status(400).send("Give All the Information");
    } else {
      const editMem = {
        title,
        content,
      };
      const updatedMemory = await Memory.findByIdAndUpdate(id, editMem);

      if (!updatedMemory) {
        return res.status(404).send("Memory not found.");
      }
      res.status(200).send("Updated Successfully");
    }
  } catch (error) {
    console.log(error);
  }
});
