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

const port = 80;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// Load Database
data.connect(() => {
    console.log("Connection Successful, connected to database");
});

// Variables

var projectData;
var newPRIMARYKEY;


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

app.post("/searchProject", async (req, res) => {
    var sqlQuerySting = "";
    var sqlStringArray = [];
    var sqlRequiredColumns = [];

    // Get the fields that have data inputed as a search filter
    if (req.body["project-name-input"] !== "") {
        sqlStringArray.push(req.body["project-name-input"]);
        sqlRequiredColumns.push("projectname");
        // sqlQuerySting = sqlQuerySting + req.body["project-name-input"];
    }
    if (req.body["sop-input"] !== "") {
        sqlStringArray.push(req.body["sop-input"]);
        sqlRequiredColumns.push("startofproduction");
        // sqlQuerySting = sqlQuerySting + req.body["sop-input"];
    }
    if (req.body["platform-selection"] !== "default" ) {
        sqlStringArray.push(req.body["platform-selection"]);
        sqlRequiredColumns.push("projectplatform");
        // sqlQuerySting = sqlQuerySting + req.body["platform-selection"];
    }
    if (req.body["model-selection"] !== "default" ) {
        sqlStringArray.push(req.body["model-selection"]);
        sqlRequiredColumns.push("projectmodel");
        // sqlQuerySting = sqlQuerySting + req.body["model-selection"];
    }
    if (req.body["my-selection"] !== "default" ) {
        sqlStringArray.push(req.body["my-selection"]);
        sqlRequiredColumns.push("projectmodelyear");
        // sqlQuerySting = sqlQuerySting + req.body["my-selection"];
    }

    if (sqlStringArray.length === 0) {
        sqlQuerySting = "*";
    }
    for (let index = 0; index < sqlStringArray.length; index++) {

        if (sqlStringArray.length === index + 1) {
            console.log(`String array length ${sqlStringArray.length}is equal to the index ${index} and the array length is ${sqlStringArray.length}`);
            sqlQuerySting = sqlQuerySting + sqlStringArray[index];
        } else {
            console.log(`Simply Adding ${index} and the array length is ${sqlStringArray.length}`);
            sqlQuerySting = sqlQuerySting + sqlStringArray[index] + ", ";
        }
        
    }

    // Assemble the search query 
    var finalSQLString = "SELECT " + sqlQuerySting + " FROM public.projects";
    console.log(finalSQLString);
    // await data.query()
    // Output the Data
    sqlQuerySting = "";
    res.render("projectManager.ejs", {toLoad: "card_searchProject.ejs", leftBar_menu: "leftBar_searchProject.ejs"});
});

app.get("/saveProject", async (req, res) => {
    res.render("projectManager.ejs", {leftBar_menu: "leftBar_searchProject.ejs"});
});
app.post("/saveProject", async (req, res) => {

    // Grab the data from the form
    var pName = req.body["project-name-input"];
    var sop = req.body["sop-input"];
    var platform = req.body["platform-selection"];
    var model = req.body["model-selection"];
    var my = req.body["my-selection"];

    projectData = await data.query(`SELECT * FROM public.projects`);
    newPRIMARYKEY = projectData.rowCount + 1;

    await data.query(`INSERT INTO projects 
        (id, projectname, startofproduction, projectplatform, projectmodel, projectmodelyear, projectnumber)
        VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [newPRIMARYKEY, pName, sop, platform, model, my, "12345678"]);

    
    res.render("projectManager.ejs", {leftBar_menu: "leftBar_searchProject.ejs", pn: pName});

});

app.listen(port, () => {
    console.log(`Listenning on port : ${port}`);
});