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
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Handle the response from the server
            console.log(data);
            // You can add further logic based on the server response
        })
        .catch(error => console.error('Error:', error));
    });
});