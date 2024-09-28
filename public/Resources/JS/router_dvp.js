import express from "express";
import bodyParser from "body-parser";
import { newDVP } from "../../../JS/func/newDVP.js";

const route_DVP = express.Router();

route_DVP.get("/", async (req, res) => {
    res.render("index.ejs", {leftBar_menu: "leftBar_dvp", menuTitle: "DVP Menu"})
});

route_DVP.get("/new", async (req, res) => {
    res.render("index.ejs", {leftBar_menu: "leftBar_dvp", menuTitle: "Create New DVP&R"})
    newDVP();
});

export {route_DVP}