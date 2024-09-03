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

app.get("/tools", async (req, res) => {
    res.render("tools.ejs", {leftBar_menu: "leftBar_tools.ejs"});
});

app.get("/newProject", async (req, res) => {
    res.render("projectManager.ejs", {toLoad: "card_newProject.ejs", leftBar_menu: "leftBar_newProject.ejs"});
});

app.get("/openProject", async (req, res) => {
    res.render("projectManager.ejs", {toLoad: "card_searchProject.ejs", leftBar_menu: "leftBar_searchProject.ejs"});
});

app.post("/searchProject", async (req, res) => {
    var sqlQueryString = "";
    var sqlStringArray = [];
    var sqlRequiredColumns = [];
    var sqlWHERE_projectName = "";
    var sqlWHERE_sop = "";
    var sqlWHERE_platform = "";
    var sqlWHERE_model = "";
    var sqlWHERE_my = "";

    // Get the fields that have data inputed as a search filter
    if (req.body["project-name-input"] !== "") {
        sqlStringArray.push(req.body["project-name-input"]);
        sqlRequiredColumns.push("projectname");
        sqlWHERE_projectName = "projectname = " + "'" + req.body["project-name-input"] + "'";

        if (sqlQueryString === "") {
            sqlQueryString = " WHERE " + sqlWHERE_projectName;
        } else {
            sqlQueryString = sqlQueryString + " AND " + sqlWHERE_projectName;
        }
    }
    if (req.body["sop-input"] !== "") {
        sqlStringArray.push(req.body["sop-input"]);
        sqlRequiredColumns.push("startofproduction");
        sqlWHERE_sop = "startofproduction >= " + "'" + req.body["sop-input"] + "'";

        if (sqlQueryString === "") {
            sqlQueryString = " WHERE " + sqlWHERE_sop;
        } else {
            sqlQueryString = sqlQueryString + " AND " + sqlWHERE_sop;
        }
    }
    if (req.body["platform-selection"] !== "default" ) {
        sqlStringArray.push(req.body["platform-selection"]);
        sqlRequiredColumns.push("projectplatform");
        sqlWHERE_platform = "projectplatform = " + "'" + req.body["platform-selection"] + "'";

        if (sqlQueryString === "") {
            sqlQueryString = " WHERE " + sqlWHERE_platform;
        } else {
            sqlQueryString = sqlQueryString + " AND " + sqlWHERE_platform;
        }

    }
    if (req.body["model-selection"] !== "default" ) {
        sqlStringArray.push(req.body["model-selection"]);
        sqlRequiredColumns.push("projectmodel");
        sqlWHERE_model = "projectmodel = " + "'" + req.body["model-selection"] + "'";

        if (sqlQueryString === "") {
            sqlQueryString = " WHERE " + sqlWHERE_model;
        } else {
            sqlQueryString = sqlQueryString + " AND " + sqlWHERE_model;
        }
    }
    if (req.body["my-selection"] !== "default" ) {
        sqlStringArray.push(req.body["my-selection"]);
        sqlRequiredColumns.push("projectmodelyear");
        sqlWHERE_my = "projectmodelyear >= " + "'" + req.body["my-selection"] + "'";

        if (sqlQueryString === "") {
            sqlQueryString = " WHERE " + sqlWHERE_my;
        } else {
            sqlQueryString = sqlQueryString + " AND " + sqlWHERE_my;
        }
    }

    // Assemble the search query 
    var finalSQLString = "SELECT * FROM public.projects" + sqlQueryString;
    var searchData = await data.query(finalSQLString);

    console.log(searchData.rows);

    // Output the Data
    sqlQueryString = "";
    res.render("projectManager.ejs", {toLoad: "card_searchProject.ejs", leftBar_menu: "leftBar_searchProject.ejs", loadedProject: "projectList.ejs"});
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