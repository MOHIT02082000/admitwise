document.addEventListener("DOMContentLoaded", function () {
    // URL of the API endpoint
    const id = localStorage.getItem("admit_wise_id");   
    // window.alert(id);
    const apiUrl = "http://127.0.0.1:3010/student/data/"+id; // Replace with your actual API endpoint URL

    // Send a GET request to the API
    fetch(apiUrl, {
        method: 'GET'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json();
    })
    .then(object => {
        data = JSON.parse(object);
        console.log(object);
        const name = data.name;
        const email = data.email;
        const date = data.date;
        const notes = data.notes;
        const uni_values =  data.uniValues;
        const department_values = data.departmentValues; // array of json objects
        const key_stats = data.keyStats;
        update_key_stats(key_stats);
        // keystats.education -> array of 4 items
        // keystats.research -> array of 2 strings
        // keystats.workex -> array of 4 items
        // keystats.scores -> array of 3 items
        // keystats.IELTS
        // keystats.achievement1
        // keystats.achievement2
        // keystats.achievement3
        const undergradscores = data.undergradscores;
        // undergradscores.Algorithms
        // undergradscores.Computer_Science
        // undergradscores.Operating_Systems
        // undergradscores.GPA_Overall
        const files = data.files;
        // files.resume -> url
        // files.transcript -> url
        // files.sop -> html text :::innerHTML
        // files.lor1
        // files.lor2
        // files.lor3
        
        filesDisplay(files);


        // window.alert(name + email +date +notes +uni_values);
    })
    .catch(error => {
        console.error("Fetch error:", error);
    });
});

function update_key_stats(key_stats){
    // update education
    document.getElementById("degree").textContent = key_stats.education.degree;
    document.getElementById("univeristy").textContent = key_stats.education.univeristy;
    document.getElementById("GPA").textContent = key_stats.education.GPA;
    document.getElementById("tier").textContent = key_stats.education.tier;


    // update research
    document.getElementById("research1").textContent = key_stats.research.research1;
    document.getElementById("research2").textContent = key_stats.research.research2;

    // update workex
    document.getElementById("workex1").textContent = key_stats.workexp.workex1;
    document.getElementById("duration1").textContent = key_stats.workexp.duration1;
    document.getElementById("workex2").textContent = key_stats.workexp.workex2;
    document.getElementById("duration2").textContent = key_stats.workexp.duration2;
    
    // update scores
    document.getElementById("score1").textContent = key_stats.scores.score1;
    document.getElementById("score2").textContent = key_stats.scores.score2;
    document.getElementById("score3").textContent = key_stats.scores.score3;
}

// let sopData;
// let pdfUrls;

// Define the displayContent function outside of the filesDisplay function
function displayContent(buttonId, sopData, pdfUrls) {
    console.log("entered function");
    const contentDisplay = document.getElementById("content-display");
    const contentHeader = document.getElementById("content-header");
    
    if (buttonId === "sop") {
        contentHeader.innerHTML = "Statement of Purpose";
        contentDisplay.innerHTML = "";
        contentDisplay.innerHTML = sopData; // Display SOP HTML

    } else if (pdfUrls.hasOwnProperty(buttonId)) {
        contentHeader.innerHTML = buttonId.toUpperCase();
        contentDisplay.innerHTML = `<iframe src="${pdfUrls[buttonId]}" width="100%" height="600"></iframe>`; // Display PDF
    }
}

function filesDisplay(files) {
    let sopData = files.sop;
    let pdfUrls = {
        gre: files.gre,
        resume: files.resume,
        ielts: files.ielts,
        transcript: files.transcript,
        lor1: files.lor1,
        lor2: files.lor2,
        lor3: files.lor3
    };

    console.log(sopData);
    console.log(pdfUrls);
    
    // Add event listeners to buttons
    const buttons = document.querySelectorAll(".file-btn");
    buttons.forEach(button => {
        button.addEventListener("click", function () {
            // Remove "active" class from all buttons
            buttons.forEach(btn => btn.classList.remove("active"));
            
            // Add "active" class to the clicked button
            button.classList.add("active");
            
            // Call the displayContent function with the button's id
            displayContent(button.id, sopData, pdfUrls);
        });
    });

    // Initially display SOP data
    displayContent("sop", sopData, pdfUrls);
}


const rightBodyBottom = document.getElementById("right-body-bottom");
const content = document.querySelector(".content");

content.addEventListener("scroll", function () {
    const scrollHeight = content.scrollHeight;
    const clientHeight = content.clientHeight;

    if (scrollHeight > clientHeight) {
        rightBodyBottom.style.height = scrollHeight + "px";
    } else {
        rightBodyBottom.style.height = "auto";
    }
});

