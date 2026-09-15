import {
    ValidateLoginField,
    ValidateAccountFields
} from "../utils/formatters";


// =========================
// Submit handlers
// =========================

async function handleUserSubmit(e, formData) {

    e.preventDefault();

    // Validate fields
    const isValid = ValidateAccountFields(formData);

    if (!isValid) {
        return;
    }

    // Check passwords
    if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match");
        return;
    }

    console.log("Password is correct");


    // Data to send to backend
    const userData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: "admin",
        status: "Active"
    };


    try {

        const result = await createUser(userData);

        console.log("User created successfully");
        console.log(result);

        alert("Account created successfully");

    } catch (error) {

        console.error("Create user error:", error);

        alert(error.message);

    }
}


async function handleLoginSubmit(e, formData) {

    e.preventDefault();

    // Field validation
    const isValid = ValidateLoginField(formData);

    console.log(isValid);

    if (!isValid) {
        return;
    }


    // Only send what backend expects
    const loginData = {
        email: formData.email,
        password: formData.password
    };


    try {

        const result = await loginUser(loginData);

        console.log("Login successful");
        console.log(result);


        // JWT
        localStorage.setItem("token", result.token);

        console.log("JWT stored successfully");

    } catch (error) {

        console.error("Login error:", error);

        alert(error.message);

    }

}


// =========================
// API calling functions
// =========================

async function createUser(formData) {

    const response = await fetch(
        "http://localhost:5038/api/users/register",
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(formData)
        }
    );


    const data = await response.json();


    if (!response.ok) {
        throw new Error(data.message || "Failed to create user");
    }


    return data;
}


async function loginUser(formData) {

    const response = await fetch(
        "http://localhost:5038/api/users/login",
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(formData)
        }
    );


    const data = await response.json();


    if (!response.ok) {
        throw new Error(data.message || "Login failed");
    }


    return data;
}


function changePassword(formData) {
    // change password
}


export {
    handleUserSubmit,
    handleLoginSubmit
};