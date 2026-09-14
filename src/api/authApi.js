// Auth API placeholder
import {ValidateLoginField , ValidateAccountFields} from "../utils/formatters"


// Submit handlers 

function handleUserSubmit (e, formData) {
    e.preventDefault();

    // validate fiels 
    const isValid = ValidateAccountFields(formData);

    if (!isValid) {
        return;
    }

    if (formData.password != formData.confirmPassword) {
        alert("Passwords do not match");
    } 
        console.log("Password is correct");
        console.log(formData);
    }; 


function handleLoginSubmit( e , formData )  { 
    e.preventDefault( ) ; 

    // field validation 
    const isvalid =  ValidateLoginField( formData )

    console.log( isvalid ) ; 
    if (!isvalid) { 
        return ; 
    }

    console.log( formData )  

}


// api callling functions  

function createUser( formData ) { 
     // create user 
}

function loginUser( formData) { 
    // login User 
}

function changePassword( formData ) { 
    // chagne password 
}


export { handleUserSubmit , handleLoginSubmit }   ; 

