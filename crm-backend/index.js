import "dotenv/config";
import express from "express";
import connectDB from "./config/db.js";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("CRM Backend API");
});

app.use('/api/auth', authRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
