var projects = [];
var projectManager_btn;
var dvp_btn;
var torque_btn;
var dfmea_btn;
var users_btn;
var help_btn;
var newProject_btn;
var openProject_btn;
var closeProject_btn;

var projectNumber_label;
var newPlatformSelect_dropdown;

function initializeJS(){

    // Variables that are loaded when DOM is loaded

    var projects = load("projectList");

    // This section gets all the elements, i.e. connects to the HTML
    
    var projectManager_btn = document.getElementById("project-manager-NAV");
    var newProject_btn = document.getElementById("left-item-1");
    var saveClose_btn = document.getElementById("left-item-2");
    var closeProject_btn = document.getElementById("left-item-3");

    var projectNumber_label;
    var newPlatformSelect_dropdown = document.getElementById("platform-select");

    newProject_btn.addEventListener("click", () => {

        newProject(projects);    
    })
}

function newProject(projects){

    var pNumber = 0;
    var pIncremental = 1;
    var pIncrementalArray = [];
    var currentYear = new Date().getFullYear();
    
    projects.forEach(element => {
        if (element.projectCreationYear == currentYear) {
            pIncrementalArray.push(element.projectIncrementalNumber);
        }
    });

    save("pIncrementArray", pIncrementalArray);


    for (let index = 0; index < pIncrementalArray.length; index++) {

        if (pIncremental == pIncrementalArray[index]) {
            pIncremental += 1;
        }        
    }

    var np = new Project(currentYear, pIncremental, "", "", 0, 0, 0);
    np.setProjectNumber(formatProjectNumber(np.getProjectCreationYear(), np.getProjectIncrementalNumber()));
    projects.push(np);
    save("projectList", projects);
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