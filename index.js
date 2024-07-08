import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const URL_API = "https://v2.jokeapi.dev";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res)=>{
    try {
        const response = await axios.get(URL_API+"/categories");
        res.render("index.ejs", {content: response.data});
    } catch (error) {
        res.render("index.ejs", {content: error.message});
    }
});

app.post("/joke", async (req, res)=>{
    console.log(req.body["id"]);
    try {
        const response = await axios.get(URL_API+"/joke/Any");
        res.render("joke.ejs", {content: response.data});
    } catch (error) {
        res.render("joke.ejs", {content: error.message});
    }
});

app.listen(port, ()=>{
    console.log(`Server listening on Port ${port}`);
});