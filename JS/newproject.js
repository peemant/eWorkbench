var projects = [];
var projectManager_btn;
var dvp_btn;
var torque_btn;
var dfmea_btn;
var users_btn;
var help_btn;
var newProject_btn;
var saveClose_btn;
var cancelNewProject_btn;

var projectName_label;
var projectNumber_label;
var startOfProduction_label;
var platform_label;
var model_label;
var modelYear_label;

var projectName_input;
var startOfProduction_datePicker;
var platformSelect_dropdown;
var model_dropdown;
var modelYear_dropdown;


function initializeJS(){

    // Variables that are loaded when DOM is loaded

    projects = load("projectList");

    // This section gets all the elements, i.e. connects to the HTML
    
    // Top navigation elements

    projectManager_btn = document.getElementById("project-manager-NAV");

    // Left side button elements

    newProject_btn = document.getElementById("left-item-1");
    saveClose_btn = document.getElementById("left-item-2");
    cancelNewProject_btn = document.getElementById("left-item-3");

    // Input field elements

    projectName_input = document.getElementById("project-name-input");;
    startOfProduction_datePicker = document.getElementById("sop-input");;
    platformSelect_dropdown = document.getElementById("platform-select");;
    model_dropdown = document.getElementById("model-select");;
    modelYear_dropdown = document.getElementById("modelyear-select");;

    // Label field elements

    projectNumber_label = document.getElementById("project-number");
    projectName_label = document.getElementById("-project-name-");
    startOfProduction_label = document.getElementById("sop");
    platform_label = document.getElementById("platform");
    model_label = document.getElementById("model");
    modelYear_label = document.getElementById("modelYear");


    updateSiteInformation(projects);

    newProject_btn.addEventListener("click", () => {
        newProject(projects);
           
    })

    saveClose_btn.addEventListener("click", () => {
        saveAndCloseProject(projects);
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

function updateSiteInformation(projects){
    var projectIndex = projects.length;
    var activeProject = projects[projectIndex - 1];

    projectNumber_label = document.getElementById("project-number-new").innerHTML = activeProject.projectNumber;


    if (activeProject.projectName == undefined) {
        
    }else{
            projectName_label = document.getElementById("project-name").innerHTML = activeProject.projectName;
    }
    
}

function saveAndCloseProject(projects){

    var lastIndex = projects.length - 1;

    // Saving input data to the project. This is the last project created so I simply
    // grab the last item in the projects array.

    projects[lastIndex].projectName = projectName_input.value;
    projects[lastIndex].sop = startOfProduction_datePicker.value;
    projects[lastIndex].platform = platformSelect_dropdown.value;
    projects[lastIndex].model = model_dropdown.value;
    projects[lastIndex].modelYear = modelYear_dropdown.value;
    save("projectList", projects);

    
 
}
