// ============================================
// EngineerOS Report Dashboard
// ============================================

document.addEventListener("DOMContentLoaded", () => {

    loadReport();

});

// ============================================
// Main Report Loader
// ============================================

function loadReport() {

    const history = getHistory();

    const dates = Object.keys(history).sort();

    if (dates.length === 0) {

        return;

    }

    const totalDays = dates.length;

    let noticeDays = 0;
    let dsaDays = 0;
    let learnDays = 0;
    let speakDays = 0;

    let totalCompletion = 0;

    let longestStreak = 0;
    let currentStreak = getCurrentStreak();

    let tempStreak = 0;

    // ==========================
    // Loop Through All Days
    // ==========================

    dates.forEach(date => {

        const day = history[date];

        if(day.noticeComplete) noticeDays++;
        if(day.dsaComplete) dsaDays++;
        if(day.learnComplete) learnDays++;
        if(day.speakComplete) speakDays++;

        totalCompletion += getCompletion(day);

        if(
            day.noticeComplete &&
            day.dsaComplete &&
            day.learnComplete &&
            day.speakComplete
        ){
            tempStreak++;

            if(tempStreak > longestStreak){

                longestStreak = tempStreak;

            }

        }else{

            tempStreak = 0;

        }

    });

    // ==========================
    // Engineer Score
    // ==========================

    const engineerScore = Math.round(

        totalCompletion / totalDays

    );

    // ==========================
    // Populate Numbers
    // ==========================

    setText("engineerScore", engineerScore + "%");

    setText("currentStreak", currentStreak + " Days");

    setText("longestStreak", longestStreak + " Days");

    setText("totalDays", totalDays);

    setText("noticeDays", noticeDays);

    setText("dsaDays", dsaDays);

    setText("speakingDays", speakDays);

    // ==========================
    // Progress Bars
    // ==========================

    updateBar("buildBar", percentage(noticeDays,totalDays));

    updateBar("dsaBar", percentage(dsaDays,totalDays));

    updateBar("learnBar", percentage(learnDays,totalDays));

    updateBar("speakBar", percentage(speakDays,totalDays));

    // ==========================
    // Reflection Timeline
    // ==========================

    loadReflections(history, dates);

    // ==========================
    // Weekly Review
    // ==========================

    loadWeeklyReview(
        noticeDays,
        dsaDays,
        learnDays,
        speakDays,
        totalDays,
        longestStreak
    );

}



// ============================================
// Helpers
// ============================================

function setText(id,text){

    const element=document.getElementById(id);

    if(element){

        element.textContent=text;

    }

}

function percentage(value,total){

    if(total===0) return 0;

    return Math.round((value/total)*100);

}

function updateBar(id,value){

    const bar=document.getElementById(id);

    if(bar){

        bar.style.width=value+"%";

    }

}



// ============================================
// Reflection Cards
// ============================================

function loadReflections(history,dates){

    const container=document.getElementById("reflectionContainer");

    container.innerHTML="";

    const latest=dates.reverse().slice(0,5);

    latest.forEach(date=>{

        const day=history[date];

        const reflection=day.reflection || {};

        const card=document.createElement("div");

        card.className="glass task-card";

        card.style.marginBottom="20px";

        card.innerHTML=`

            <h3>${date}</h3>

            <p><strong>🏆 Win</strong></p>

            <p>${reflection.win || "-"}</p>

            <br>

            <p><strong>🚧 Blocker</strong></p>

            <p>${reflection.blocker || "-"}</p>

            <br>

            <p><strong>➡ Tomorrow</strong></p>

            <p>${reflection.tomorrow || "-"}</p>

        `;

        container.appendChild(card);

    });

}



// ============================================
// Weekly Review
// ============================================

function loadWeeklyReview(

    notice,

    dsa,

    learn,

    speak,

    total,

    streak

){

    const completedDays=Math.min(

        notice,

        dsa,

        learn,

        speak

    );

    setText(

        "weeklyCompleted",

        completedDays+" / "+total

    );

    const habits=[

        {

            name:"🛠 Build",

            value:notice

        },

        {

            name:"🧠 DSA",

            value:dsa

        },

        {

            name:"📚 Learning",

            value:learn

        },

        {

            name:"🎤 Speaking",

            value:speak

        }

    ];

    habits.sort(

        (a,b)=>b.value-a.value

    );

    setText(

        "strongestHabit",

        habits[0].name

    );

    setText(

        "weakestHabit",

        habits[3].name

    );

    setText(

        "weeklyStreak",

        streak+" Days"

    );

    setText(

        "nextFocus",

        habits[3].name

    );

}