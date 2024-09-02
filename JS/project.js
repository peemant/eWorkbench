

class Project {

    projectName = "";
    projectNumber = "";
    projectCreationYear;
    projectIncrementalNumber;
    sop;
    platform;
    model;
    modelYear;

    /**
     * @description Creates a new project with the following values.
     * 
     * Platform : 0 : Default, 1 : Snowmobile, 2 : Watercraft
     * Model : 0 : Default, 1 : Nomad,  2 : Atlas, 3 : ORCA, 4 : Beluga. 
     * 
     * @param {number} project_CreationYear
     * @param {number} project_IncrementalNumber
     * @param {string} project_Name 
     * @param {string} project_SOP 
     * @param {number} project_Platform 
     * @param {number} project_Model 
     * @param {number} project_MY 
     */
    constructor (project_CreationYear, project_IncrementalNumber, project_Name, project_SOP, project_Platform, project_Model, project_MY){
        
        this.projectCreationYear = project_CreationYear;
        this.projectIncrementalNumber = project_IncrementalNumber;
        this.projectName = project_Name;
        this.sop = project_SOP;
        this.platform = project_Platform;
        this.model = project_Model;
        this.modelYear = project_MY;
        
    }

    /**
     * @author Philippe Kahr
     * @readonly
     * @description This is a platform selection enumerator. Sets the object platform.
     * @summary 0 : Snowmobile, 1 : Watercraft.
     * @param {(0|1)} pf 
     */
    setPlatform(pf){

        this.platform = pf;
    }

    getPlatform(){

        return this.platform;
    }

    setProjectName(pname){

        this.projectName = pname;
    }

    getProjectName(){
        
        return this.projectName;
    }

    setProjectNumber(pn){

       this.projectNumber = pn;
    }

    getProjectNumber(){
        return this.projectNumber;
    }

    setProjectCreationYear(pCreationYear){
        this.projectCreationYear = pCreationYear;
    }

    getProjectCreationYear(){
        return this.projectCreationYear;
    }

    setProjectIncrementalNumber(pIncrement){
        this.project_IncrementalNumber = pIncrement;
    }

    getProjectIncrementalNumber(){
        return this.projectIncrementalNumber;
    }
}
