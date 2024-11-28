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
// HOMEPAGE 
app.get("/", (req, res) => {
    res.send("WELCOME TO THE BACKEND");
});

// GET METHOD
app.get("/pricescheme", async (req, res) => {
    try {
        // get the all the rows from the database
        const { data, error } = await supabase
            .from("pricescheme")
            .select("*");

        // check if there is an error on getting rows
        if (error) {
            console.error("Error getting all database rows");
            return res.status(400).json({ error: error.message }); // Stop processing on first error
        }

        // if success in getting 
        res.status(200).json(data);
        console.log('Succesfully fetched Table rows');
    }
    catch (error) {
        // log the errors
        console.error(error.message);
        res.status(500).json({ error: error.message });
    }

})

// POST METHOD
app.post("/pricescheme", async (req, res) => {
    try {
        const { schemeList } = req.body;  // deconstruct the schemeList from the request body

        // Create an array to hold all the scheme objects to be inserted
        const schemesToInsert = schemeList.map(scheme => ({
            id: scheme.id,
            type: scheme.type,
            amount: scheme.amount,
        }));

        // insert into database
        const { data, error } = await supabase
            .from("pricescheme")
            .insert(schemesToInsert); // Insert data as a scheme as supabase can handle it

        // check if there is an error on getting rows
        if (error) {
            console.error("Error creating rows");
            return res.status(400).json({ error: error.message }); // Stop processing on first error
        }

        // if success in creating, send back data 
        res.status(200).json(data);
        console.log('Succesfully created Table rows');
    }
    catch (error) {
        // log the errors
        console.error(error.message);
        res.status(500).json({ error: error.message });
    }
})

app.listen(port, async () => {
    console.log(`server has stated on port: ${port}`);
})
