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
        
        displayFiles(files);
        displayGraph(undergradscores);


        display_profile_main(data);
        display_values_box_one(data);
        display_values_box_two(data);


        // window.alert(name + email +date +notes +uni_values);
    })
    .catch(error => {
        console.error("Fetch error:", error);
    });
});


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

function displayFiles(files) {
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
const contentDisplay = document.getElementById("content-display");

contentDisplay.addEventListener("scroll", function () {
    // Get the scroll height and client height of the content
    const scrollHeight = contentDisplay.scrollHeight;
    const clientHeight = contentDisplay.clientHeight;

    if (scrollHeight > clientHeight) {
        rightBodyBottom.style.height = scrollHeight + "px"; // Expand the div
    } else {
        rightBodyBottom.style.height = "auto"; // Return to the original state
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





const options = {
    series: [
      {
        name: 'Algorithms',
        data: [], // Initialize with empty data
      },
      {
        name: 'Computer Science',
        data: [],
      },
      {
        name: 'Operating Systems',
        data: [],
      },
      {
        name: 'Overall GPA',
        data: [],
      },
    ],
    chart: {
      height: 350,
      type: 'line',
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: true,
      },
      dropShadow: {
        enabled: true,
        top: 3,
        left: 2,
        blur: 4,
        opacity: 0.1,
      },
    },
    colors: ['#008FFB', '#00E396', '#FEB019', '#FF4560'],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
      width: 3,
    },
    title: {
      text: 'Undergrad Scores',
      align: 'left',
    },
    markers: {
      size: 4,
    },
    grid: {
      row: {
        colors: ['#f8f8f8', 'transparent'],
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: ['Freshman', 'Sophomore', 'Junior', 'Senior'],
    },
  };
  
//   const chart = new ApexCharts(document.querySelector('#chart'), options);
//   chart.render();
  
  function displayGraph(undergradscores) {
    // Update the series data with the provided scores
    chart.updateSeries([
      {
        name: 'Algorithms',
        data: undergradscores.Algorithms, // Update with Algorithms scores
      },
      {
        name: 'Computer Science',
        data: undergradscores.Computer_Science, // Update with Computer Science scores
      },
      {
        name: 'Operating Systems',
        data: undergradscores.Operating_Systems, // Update with Operating Systems scores
      },
      {
        name: 'Overall GPA',
        data: undergradscores.GPA_Overall, // Update with Overall GPA scores
      },
    ]);
  }
  
  displayGraph(undergradscores);
  



// function displayGraph(undergradscores){
//     console.log(undergradscores.Algorithms);

// }
