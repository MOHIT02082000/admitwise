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
        // keystats.workexp
        // keystats.university
        // keystats.GPA
        // keystats.GRE
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

        display_profile_main(data);
        display_values_box_one(data);
        display_values_box_two(data);


        // window.alert(name + email +date +notes +uni_values);
    })
    .catch(error => {
        console.error("Fetch error:", error);
    });
});

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



function display_profile_main(data){

    var profileCard = document.querySelector('.profile-main-card');

    // Set the name
    profileCard.querySelector('.right-column-profile-main-card h2').textContent = data.name;

    // Since the 'email' field remains the same, update it directly
    profileCard.querySelector('.right-column-profile-main-card .email').textContent = data.email;

    // Set the 'application date' text
    profileCard.querySelector('.right-column-profile-main-card .applicationdate').textContent = 'Application Received - ' + data.date;

    // Set the notes content if there are notes available in the data
    if(data.notes) {
        profileCard.querySelector('.bottom-column-profile-main-card .notes p').textContent = data.notes;
    }

    var seekingInfo = 'Seeking - ' + data.keyStats.workexp ;
    profileCard.querySelector('.right-column-profile-main-card .seeking').textContent = seekingInfo;


}

function display_values_box_one(data)
{
    const uniValues = data.uniValues;
  
  // Assign values to sliders
  const sliders = document.querySelectorAll('.university-values .slider');
  sliders[0].value = uniValues.val1; // Corresponds to "Inclusion"
  sliders[1].value = uniValues.val2; // Corresponds to "Learning"
  sliders[2].value = uniValues.val3; // Corresponds to "Safety"
  sliders[3].value = uniValues.val4; // Corresponds to "Integrity"
  
  // Update slider backgrounds
  sliders.forEach(slider => updateSlider(slider));

  // Calculate and update average university value if there are more than one value
  const averageValue = (Object.values(uniValues).reduce((acc, val) => acc + val, 0) / Object.values(uniValues).length).toFixed(1);
  document.querySelector('.university-values .average').textContent = averageValue;
}

function display_values_box_two(data)
{
    const schoolValues = data.departmentValues;
  
  // Assign values to sliders
  const sliders = document.querySelectorAll('.school-values .slider');
  sliders[0].value = schoolValues.val1; // Corresponds to "Inclusion"
  sliders[1].value = schoolValues.val2; // Corresponds to "Learning"
  sliders[2].value = schoolValues.val3; // Corresponds to "Safety"
  sliders[3].value = schoolValues.val4; // Corresponds to "Integrity"
  
  // Update slider backgrounds
  sliders.forEach(slider => updateSlider(slider));

  // Calculate and update average university value if there are more than one value
  const averageValue = (Object.values(schoolValues).reduce((acc, val) => acc + val, 0) / Object.values(schoolValues).length).toFixed(1);
  document.querySelector('.school-values .average').textContent = averageValue;
}