// public/assets/js/registration.js
document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector('form[name="registration__form"]');

  if (!form) {
    console.error("Registration form not found");
    return;
  }

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    // Get all form elements
    const conditionCheckbox = document.querySelector(
      'input[name="accept__condition"]'
    );
    const firstName = document.getElementById("firstName");
    const lastName = document.getElementById("lastName");
    const email = document.getElementById("registrationMail");
    const typeSelect = document.getElementById("typeSelect");

    // Validate form elements exist
    if (
      !conditionCheckbox ||
      !firstName ||
      !lastName ||
      !email ||
      !typeSelect
    ) {
      alert(
        "Some form fields are missing. Please refresh the page and try again."
      );
      return;
    }

    // Check if terms are accepted
    if (!conditionCheckbox.checked) {
      alert("Please accept the Privacy Policy to continue");
      return;
    }

    // Get form data
    const formData = {
      firstName: firstName.value.trim(),
      lastName: lastName.value.trim(),
      email: email.value.trim(),
      userType: typeSelect.value,
    };

    // Validate required fields
    if (!formData.firstName || !formData.lastName || !formData.email) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        // Remove alert and redirect to success page instead
        window.location.href = "/success.html";
      } else {
        alert(data.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert("An error occurred during registration. Please try again.");
    }
  });
});
