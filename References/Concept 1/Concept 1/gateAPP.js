var platform ="";
var model = "";
var paroductionYear = 1999;
var by = "";
var sop;



var cardG0HTML = '<div class=row><div class="column col-2"><h5>Gate</h5></div><div class="column col-4"><h5>G1</h5></div></div><div class=row><div class="column col-2"><p>SOP - Months</div><div class="column col-4"><p>XXXX</div></div><div class=row><div class="column col-2"><p>Expected Start</div><div class="column col-4"><p>01/01/2024</div></div><div class=row><div class="column col-2"><p>Gate Status</div><div class="column col-4"><p>CLOSED</div></div><div class="container m-1 p-3"><div class=row><div class="column col-1 align-content-center m-0 p-1"id=gate-department><h4 id=Section-Description>Program</h4></div><div class="column col-11"><div class=row><div class="column col-4"><h5>Description</h5></div><div class="column col-1"><h5>Status</h5></div><div class="column col-7"><h5>Notes</h5></div></div><div class=row><div class=column><div class=row><div class="column col-4"><p>GATE KICK-OFF</div><div class="column col-1"id=status-program-input><input class=status></div><div class="column col-7"><input class=status></div></div><div class=row><div class="column col-4"><p>RESOURCE RISK ASSESSMENT</div><div class="column col-1"id=status-program-input><input class=status></div><div class="column col-7"><input class=status></div></div><div class=row><div class="column col-4"><p>GATE PLAN OVERVIEW (Time & Budget)</div><div class="column col-1"id=status-program-input><input class=status></div><div class="column col-7"><input class=status></div></div><div class=row><div class="column col-4"><p>COMPETITION BOARD</div><div class="column col-1"id=status-program-input><input class=status></div><div class="column col-7"><input class=status></div></div><div class=row><div class="column col-4"><p>TARGET BUSINESS CASE (OPEX, CAPEX, margin)</div><div class="column col-1"id=status-program-input><input class=status></div><div class="column col-7"><input class=status></div></div><div class=row><div class="column col-4"><p>TEAM COMPOSITION</div><div class="column col-1"id=status-program-input><input class=status></div><div class="column col-7"><input class=status></div></div><div class=row><textarea></textarea></div></div></div></div></div></div>';
var platformInputFieldHTML = '<input maxlength=8 required style=max-width:190px>';
var platformDropdown = '<div class="align-content-center col-6 column"><div class=dropdown id=platform-number><button aria-expanded=false class="btn btn-secondary btn-sm dropdown-toggle"data-bs-toggle=dropdown style=width:190px type=button>Platform</button><ul class=dropdown-menu><li><a class=dropdown-item href=#>Snowmobile</a><li><a class=dropdown-item href=#>Watercraft</a></ul></div></div>';
var modelDropdown = '<div class="align-content-center col-6 column"><div class=dropdown id=model-number><button aria-expanded=false class="btn btn-secondary btn-sm dropdown-toggle"data-bs-toggle=dropdown style=width:190px type=button>Model</button><ul class=dropdown-menu><li><a class="dropdown-item carbon"href=#>Carbon</a><li><a class="dropdown-item performance"href=#>Performance</a><li><a class="dropdown-item nomad"href=#>Nomad</a><li><a class="dropdown-item atlas"href=#>Atlas</a></ul></div></div>';
var productionYearDropdown = '<div class="align-content-center col-6 column"><div class=dropdown id=production-year-number><button aria-expanded=false class="btn btn-secondary btn-sm dropdown-toggle"data-bs-toggle=dropdown style=width:190px type=button>Year</button><ul class=dropdown-menu><li><a class="dropdown-item 2022"href=#>2022</a><li><a class="dropdown-item 2023"href=#>2023</a><li><a class="dropdown-item 2024"href=#>2024</a><li><a class="dropdown-item 2025"href=#>2025</a><li><a class="dropdown-item 2026"href=#>2026</a><li><a class="dropdown-item 2027"href=#>2027</a><li><a class="dropdown-item 2028"href=#>2028</a></ul></div></div>';


// gateAPP.html button controls

$("#new-btn").on("click", function(event){
    newCard();
})

$("#load-button").on("click", function(event){
    loadCard();
})

$("#gate-save-btn").on("click", function(event){
    saveCard();
})

function newCard(){
    document.getElementById("project-number").innerHTML = platformInputFieldHTML;
    document.getElementById("platform-number").innerHTML = platformDropdown;
    document.getElementById("model-number").innerHTML = modelDropdown;
    document.getElementById("production-year-number").innerHTML = productionYearDropdown;
}

function loadCard(clickedGate){

    switch (clickedGate) {
        case "gate-zero-btn":
            $("#gate-card-section").append(cardG0HTML);
            break;

        case "gate-one-btn":
            break;

        case "gate-two-btn":
            break;

        case "gate-three-btn":
            break;

        case "gate-four-btn":
            break;

        case "gate-five-btn":
            break;

        case "gate-six-btn":
            break;
            
        default:
            break;
    }
}

function saveCard(){
    document.getElementById("gate-card-section").innerHTML = "";
}

// This variable section is related to users.html

var userFirstName = "";
var userLastName = "";
var userEmail = "";
var users = [];
var userHTMLItem = "<div class=tableRow><label id=userFirstNameListItem width=200px></label> <label id=userLastNameListItem width=200px></label> <label id=emailListItem width=200px></label></div>";
var isInEditMode = false;

// user objects


/**
 * @description Function creates a new user. The three (3) input fields need to be filled.
 * 
 * @param {string} firstName 
 * @param {string} lastName 
 * @param {string} email 
 * 
 * 
 */
function User (firstName, lastName, email){

    this.userFirstName = firstName;
    this.userLastName = lastName;
    this.userEmail = email;
}

// user.html button controls

function newUserSave(){

    // Grab information from the 3 input cells
    var fn = document.getElementById("firstNameInputField").value;
    var ln = document.getElementById("lastNameInputField").value;
    var em  = document.getElementById("emailInputField").value;
    
    // Create a new user and we add it to the user array
    var myUser = new User(fn, ln, em);
    users.push(myUser);
    
    // This empties the 3 input cells
    document.getElementById("firstNameInputField").value = "";
    document.getElementById("lastNameInputField").value = "";
    document.getElementById("emailInputField").value = "";
    
    refreshUserList();

}

function loadUserList(){

    refreshUserList();

}

function editUserList(){

    if (isInEditMode === false) {
        for (let index = 0; index < users.length; index++) {
            document.getElementsByClassName("tableRow")[index].innerHTML = "<button id=" + index + " class=userRemove onclick=removeUser(this.id)>Remove</button>" + document.getElementsByClassName("tableRow")[index].innerHTML;
        }
        isInEditMode = true;
    }else{
        isInEditMode = false;
    }
}

function removeUser(clickedID){

    users.splice(clickedID, 1);
    isInEditMode = false;
    refreshUserList();
}

function refreshUserList(){

    
    // This function
    currentHTML = "";
    document.getElementById("itemListTable").innerHTML = currentHTML;

    for (let index = 0; index < users.length; index++) {
        currentHTML = currentHTML + userHTMLItem;
 
     // First I clear the list since the for loop creates the full list
 
        document.getElementById("itemListTable").innerHTML = currentHTML;
     
    }
 
    for (let index = 0; index < users.length; index++) {
     document.getElementsByClassName("tableRow")[index].children[0].innerText = users[index].userFirstName;
     document.getElementsByClassName("tableRow")[index].children[1].innerText = users[index].userLastName;
     document.getElementsByClassName("tableRow")[index].children[2].innerText = users[index].userEmail;
     
    }
}

