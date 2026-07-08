// ============================================
// EngineerOS Storage
// ============================================

const STORAGE_KEY = "EngineerOS";


// ============================================
// Helpers
// ============================================

function getTodayKey() {

    return new Date().toISOString().split("T")[0];

}


// ============================================
// Load Entire Database
// ============================================

function getDatabase() {

    const data = localStorage.getItem(STORAGE_KEY);

    if (data) {

        return JSON.parse(data);

    }

    return {

        days: {}

    };

}



// ============================================
// Save Entire Database
// ============================================

function saveDatabase(database) {

    localStorage.setItem(

        STORAGE_KEY,

        JSON.stringify(database)

    );

}



// ============================================
// Save Today's Data
// ============================================

function saveToday() {

    const db = getDatabase();

    const today = getTodayKey();

    db.days[today] = {

        noticeTask:

            document.getElementById("noticeTask").value,

        noticeComplete:

            document.getElementById("noticeComplete").checked,



        dsaTask:

            document.getElementById("dsaTask").value,

        dsaComplete:

            document.getElementById("dsaComplete").checked,



        learnTask:

            document.getElementById("learnTask").value,

        learnComplete:

            document.getElementById("learnComplete").checked,



        speakTask:

            document.getElementById("speakTask").value,

        speakComplete:

            document.getElementById("speakComplete").checked,



        reflection: {

            win:

                document.getElementById("win").value,

            blocker:

                document.getElementById("blocker").value,

            tomorrow:

                document.getElementById("tomorrow").value

        }

    };

    saveDatabase(db);

}



// ============================================
// Load Today's Data
// ============================================

function loadToday() {

    const db = getDatabase();

    const today = getTodayKey();

    if (!(today in db.days)) {

        return;

    }

    const data = db.days[today];



    document.getElementById("noticeTask").value =

        data.noticeTask || "";

    document.getElementById("noticeComplete").checked =

        data.noticeComplete || false;



    document.getElementById("dsaTask").value =

        data.dsaTask || "";

    document.getElementById("dsaComplete").checked =

        data.dsaComplete || false;



    document.getElementById("learnTask").value =

        data.learnTask || "";

    document.getElementById("learnComplete").checked =

        data.learnComplete || false;



    document.getElementById("speakTask").value =

        data.speakTask || "";

    document.getElementById("speakComplete").checked =

        data.speakComplete || false;



    if (data.reflection) {

        document.getElementById("win").value =

            data.reflection.win || "";



        document.getElementById("blocker").value =

            data.reflection.blocker || "";



        document.getElementById("tomorrow").value =

            data.reflection.tomorrow || "";

    }

}



// ============================================
// Reset Today's Page
// ============================================

function resetToday() {

    document

        .querySelectorAll("textarea")

        .forEach(box => box.value = "");



    document

        .querySelectorAll("input[type='checkbox']")

        .forEach(box => box.checked = false);

}



// ============================================
// Current Streak
// ============================================

function getCurrentStreak() {

    const db = getDatabase();

    const days = db.days;

    let streak = 0;

    let date = new Date();



    while (true) {

        const key = date.toISOString().split("T")[0];



        if (!(key in days)) {

            break;

        }



        const d = days[key];



        if (

            d.noticeComplete &&

            d.dsaComplete &&

            d.learnComplete &&

            d.speakComplete

        ) {

            streak++;

        }

        else {

            break;

        }



        date.setDate(

            date.getDate() - 1

        );

    }



    return streak;

}



// ============================================
// Completion Percentage
// ============================================

function getCompletion(data) {

    let completed = 0;

    let total = 4;



    if (data.noticeComplete) completed++;

    if (data.dsaComplete) completed++;

    if (data.learnComplete) completed++;

    if (data.speakComplete) completed++;



    return Math.round(

        (completed / total) * 100

    );

}



// ============================================
// History
// ============================================

function getHistory() {

    return getDatabase().days;

}