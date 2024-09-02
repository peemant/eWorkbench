import express from "express";
import bodyParser from "body-parser";


var projects = [];

function initializeJS(){

    

    // This line removes (resets) data from localstorage. Comment out if you wish to keep the data
    // one session to the next. Add more lines to remove new data added in the future.

    // localStorage.removeItem("projectList");

    // This section populates the site with 5 random projects

    if(load("projectList") === null){
        
        projectOne = new Project(2024, 1, "Front Cargo Re-Design", "2025-01-01", 2, 3, 2025);
        projectOne.setProjectNumber(formatProjectNumber(projectOne.getProjectCreationYear(), projectOne.getProjectIncrementalNumber()));
        projectTwo = new Project(2023, 23456, "Nomad - Atlas Conversion", "2025-06-20", 1, 1, 2026);
        projectTwo.setProjectNumber(formatProjectNumber(projectTwo.getProjectCreationYear(), projectTwo.getProjectIncrementalNumber()));
        projectThree = new Project(2023, 3729, "Trim Design", "2026-01-01", 2, 3, 2026);
        projectThree.setProjectNumber(formatProjectNumber(projectThree.getProjectCreationYear(), projectThree.getProjectIncrementalNumber()));
        projectFour = new Project(2024, 42, "Orca 3UP seat", "2026-01-01", 2, 3, 2026);
        projectFour.setProjectNumber(formatProjectNumber(projectFour.getProjectCreationYear(), projectFour.getProjectIncrementalNumber()));
        projectFive = new Project(2024, 538, "Nomad Belt Idler Update", "2025-06-20", 2, 3, 2026);
        projectFive.setProjectNumber(formatProjectNumber(projectFive.getProjectCreationYear(), projectFive.getProjectIncrementalNumber()));
    
        projects.push(projectOne);
        projects.push(projectTwo);
        projects.push(projectThree);
        projects.push(projectFour);
        projects.push(projectFive);
    
        save("projectList", projects);
    }

}

/**
 * @description Function saves an object using an ID string.
 * 
 * @param {string} dataID 
 * @param {object} data 
 */
function save(dataID, data){
    localStorage.setItem(dataID, JSON.stringify(data));
}

/**
 * @description Function returns the data attached to an ID string.
 * 
 * @param {string} dataID 
 * @returns data object
 */
function load (dataID){
    return JSON.parse(localStorage.getItem(dataID));
}

function formatProjectNumber(pCreationYear, pIncrementalNumber) {
    pinLength = pIncrementalNumber.toString().length;
   
    switch (pinLength) {
        case 1:
            return pCreationYear + "-00000" + pIncrementalNumber;
            break;
        case 2:
            return pCreationYear + "-0000" + pIncrementalNumber;
            break;
        case 3:
            return pCreationYear + "-000" + pIncrementalNumber;
            break;
        case 4:
            return pCreationYear + "-00" + pIncrementalNumber;
            break;
        case 5:
            return pCreationYear + "-0" + pIncrementalNumber;
            break;
        case 6:
            return pCreationYear + "-" + pIncrementalNumber;
            break;
        default:
            break;
    }   
}