document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("registrationForm").addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent the default form submission

        // Get form data
        var itemName = document.getElementById("itemName").value;
        var itemImage = document.getElementById("itemImage").files[0]; // File input
        var itemTono = document.getElementById("itemTono").value;

        // Create FormData object to send files
        var formData = new FormData();
        formData.append("itemName", itemName);
        formData.append("itemImage", itemImage);
        formData.append("itemTono", itemTono);

        // Use fetch to send data to the server
        fetch("register.php", {
            method: "POST",
            body: formData
        })
        .then(response => response.text()) // Convert response to text
        .then(data => {
            console.log(data);  // Log the raw response text

            try {
                // Try to parse the response as JSON
                var jsonData = JSON.parse(data);
                console.log(jsonData);  // Log the parsed JSON data

                // Handle the response from the server
            } catch (error) {
                console.error('Error parsing JSON:', error);
            }
        })
        .catch(error => console.error('Error:', error));
    });
});

//TODO: Make a feedback of the registering process
//TODO: Make a way to add more than 1 image
//TODO: Make to delete a song from the list?