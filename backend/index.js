import express from 'express';
import cors from "cors";
import 'dotenv/config'
import { createClient } from '@supabase/supabase-js';

const app = express(); // initialise expressJS
const port = process.env.PORT; // access port from .env file
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY, { db: { schema: 'solx' } });

// middleware
app.use(cors({
    origin: "http://localhost:5173", // Replace with your frontend's origin
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"], // Allow all necessary methods
    allowedHeaders: ["Content-Type", "Authorization", "X-CSRF-Token", "X-Requested-With", "Accept", "Accept-Version", "Content-Length", "Content-MD5", "Content-Type", "Date", "X-Api-Version"], // Allow all necessary headers
    credentials: true
}));

//ROUTES
app.get("/", (req, res) => {
    res.send("WELCOME TO THE BACKEND");
});

app.listen(port, async () => {
    console.log(`server has stated on port: ${port}`);
})
