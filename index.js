import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const port = 1337;
const app = express();
const URL_API = "https://v2.jokeapi.dev";
let URL_CAT = "";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/jokes", async (req, res)=>{
    try {
        const response = await axios.get(URL_API+"/categories");
        res.render("index.ejs", {content: response.data});
    } catch (error) {
        res.render("index.ejs", {content: error.message});
    }
});

app.post("/jokes/joke", async (req, res)=>{
    if(req.body["checkedCat"] !== undefined){
        if(typeof req.body["checkedCat"]==='string'){
            URL_CAT = req.body["checkedCat"];
        }else{
                URL_CAT = req.body["checkedCat"].join(",");
        }
    }else{
        URL_CAT = "Any";
    }
    try {
        const response = await axios.get(URL_API+"/joke/"+URL_CAT);
        res.render("joke.ejs", {content: response.data, cats: URL_CAT});
    } catch (error) {
        res.render("joke.ejs", {content: error.message});
    }
    URL_CAT="";
});

app.listen(port, ()=>{
    console.log(`Server listening on Port ${port}`);
});