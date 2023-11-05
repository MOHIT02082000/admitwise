// let card = document.createElement('div');
// card.className = "student-card";
// let sid = document.createElement("div");
// sid.classList.add("student", "sid");
// let sname = document.createElement("div");
// sname.classList.add("student", "name");
// let email = document.createElement("div");
// email.classList.add("student", "email");
// let date = document.createElement("div");
// date.classList.add("student", "date");
// let state = document.createElement("div");
// state.classList.add("student");

// card.appendChild(sid);
// card.appendChild(sname);
// card.appendChild(email);
// card.appendChild(date);
// card.appendChild(state);



document.addEventListener("DOMContentLoaded", function () {
    // URL of the API endpoint
    const apiUrl = "http://127.0.0.1:3010/students/list/ms_cse"; // Replace with your actual API endpoint URL

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
    .then(data => {
        console.log(data);
        console.log(data.length)
        const len = data.length;
        let parent = document.getElementById("right-body-card-container");
        parent.innerHTML='';
        data.forEach(function(jsonObject) {
            // console.log("ID: " + jsonObject.id + ", Name: " + jsonObject.name);
            const card = document.createElement('div');
            card.className = "student-card";
            const sid = document.createElement("div");
            sid.classList.add("student", "sid");
            sid.innerText = jsonObject.id;
            const sname = document.createElement("div");
            sname.classList.add("student", "name");
            sname.innerText = jsonObject.name;
            const email = document.createElement("div");
            email.classList.add("student", "email");
            // Create the <img> element
            const emailLogo = document.createElement("img");
            emailLogo.src = "/static/images/email_logo.svg";
            emailLogo.alt = "email logo";
            emailLogo.style.marginRight = "10px";
            emailLogo.style.paddingLeft = "30px";
        
            // Create the inner <div> for the email address
            const emailDiv = document.createElement("div");
            emailDiv.textContent = jsonObject.email;

            // emailDiv.style.textAlign = "left";
            email.appendChild(emailLogo);
            email.appendChild(emailDiv);

            let date = document.createElement("div");
            date.classList.add("student", "date");
            // Create the <img> element
            const calendarLogoImg = document.createElement("img");
            calendarLogoImg.src = "/static/images/calendar_logo.svg";
            calendarLogoImg.alt = "calendar logo";
            calendarLogoImg.style.marginRight = "10px";
            const dateDiv = document.createElement("div");
            dateDiv.textContent = jsonObject.date;
            date.appendChild(calendarLogoImg);
            date.appendChild(dateDiv);

            let state = document.createElement("div");
            if(jsonObject.status="Accepted"){
                state.classList.add("student", "accepted");
                state.textContent = "Accepted";
            }
            else if(jsonObject.status="Rejected"){
                state.classList.add("student", "rejected");
                state.textContent = "Rejected";
            }
            else if(jsonObject.status="Waitlisted"){
                state.classList.add("student", "pending");
                state.textContent = "Waitlisted";
            }
            else{
                state.classList.add("student", "pending");
                state.textContent = "Waitlisted";
            }
            card.appendChild(sid);
            card.appendChild(sname);
            card.appendChild(email);
            card.appendChild(date);
            card.appendChild(state);
            card.addEventListener("click", function () {
                fetchProfile(jsonObject.id);
            });
            parent.appendChild(card);
        });
        // Handle the JSON data received from the API
        console.log(data); // You can do more with the data here
    })
    .catch(error => {
        console.error("Fetch error:", error);
    });
});

function fetchProfile(id){

    localStorage.setItem("admit_wise_id", id);   
    const apiUrl = "http://127.0.0.1:3010/analysis"; 
    window.location.href = apiUrl
}