// ======================================
// EngineerOS
// Main Script
// ======================================

// ---------- DOM ----------

const greeting = document.getElementById("greeting");

const currentDate = document.getElementById("currentDate");

const progressFill = document.getElementById("progressFill");

const progressPercentage = document.getElementById("progressPercentage");

const saveButton = document.getElementById("saveButton");

const resetButton = document.getElementById("resetButton");

const streak = document.getElementById("streak");

// Core Checkboxes

const coreCheckboxes = [

    document.getElementById("noticeComplete"),

    document.getElementById("dsaComplete"),

    document.getElementById("learnComplete"),

    document.getElementById("speakComplete")

];



// ======================================
// Greeting
// ======================================

function updateGreeting(){

    if(!greeting) return;

    const hour = new Date().getHours();

    let message="";

    if(hour>=5 && hour<12){

        message="🌅 Good Morning, Advait";

    }

    else if(hour<17){

        message="☀️ Good Afternoon, Advait";

    }

    else if(hour<21){

        message="🌇 Good Evening, Advait";

    }

    else{

        message="🌙 Good Night, Advait";

    }

    greeting.textContent=message;

}



// ======================================
// Date
// ======================================

function updateDate(){

    const today=new Date();

    currentDate.textContent=today.toLocaleDateString(

        "en-IN",

        {

            weekday:"long",

            day:"numeric",

            month:"long",

            year:"numeric"

        }

    );

}



// ======================================
// Progress Bar
// ======================================

function updateProgress(){

    const total=coreCheckboxes.length;

    let completed=0;

    coreCheckboxes.forEach(box=>{

        if(box.checked){

            completed++;

        }

    });

    const percentage=Math.round(

        (completed/total)*100

    );

    progressFill.style.width=percentage+"%";

    progressPercentage.textContent=

        percentage+"%";

}



// ======================================
// Attach Checkbox Events
// ======================================

coreCheckboxes.forEach(box=>{

    box.addEventListener(

        "change",

        updateProgress

    );

});



// ======================================
// Save
// ======================================

saveButton.addEventListener(

    "click",

    ()=>{

        saveToday();

        alert("✅ Day Saved Successfully!");

    }

);



// ======================================
// Reset
// ======================================

resetButton.addEventListener(

    "click",

    ()=>{

        if(

            confirm(

                "Reset today's tracker?"

            )

        ){

            resetToday();

            updateProgress();

        }

    }

);



// ======================================
// Load
// ======================================

window.addEventListener(

    "DOMContentLoaded",

    ()=>{

        updateGreeting();

        updateDate();

        loadToday();

        updateProgress();

        streak.textContent=

            getCurrentStreak()+" Days";

    }

);