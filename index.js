import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const data = new pg.Client({
    user: "postgres",
    host:"localhost",
    database:"eWorkbench",
    password:"Tr0yw1nter!",
    port: "4567",
});

var projectData;
const port = 80;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
    res.render("index.ejs");
});

app.get("/projectManager", async (req, res) => {
    res.render("projectManager.ejs", {leftBar_menu: "leftBar_searchProject.ejs"});
});

app.get("/newProject", async (req, res) => {
    res.render("projectManager.ejs", {toLoad: "card_newProject.ejs", leftBar_menu: "leftBar_newProject.ejs"});
});

app.get("/openProject", async (req, res) => {
    res.render("projectManager.ejs", {toLoad: "card_searchProject.ejs", leftBar_menu: "leftBar_searchProject.ejs"});
});

app.post("/saveProject", async (req, res) => {

});

app.listen(port, () => {
    console.log(`Listenning on port : ${port}`);
});