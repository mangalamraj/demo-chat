import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectToDatabase } from "./db";
import { createDoctorTable } from "./schema/doctor.model";
import doctorRoutes from "./routes/doctors.route";
import chatRoutes from "./routes/chat.route";

dotenv.config();

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/doctors", doctorRoutes);
app.use("/api/chat", chatRoutes);

const PORT = process.env.PORT || 8000;
connectToDatabase()
  .then(() => {
    createDoctorTable();
  })
  .catch((err) => {
    console.log("Error while making the user table", err);
  });

app.listen(PORT, () => {
  console.log("Server is running on port:", PORT);
});
