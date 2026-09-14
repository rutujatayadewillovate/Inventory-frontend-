// Utility formatters placeholder


// field valdator 
function ValidateAccountFields( data ) { 
    if( !data.name.trim()) { 
        alert ( 'Name is empty') ; 
        return false ; 
    }

    if ( !data.email.trim()  ) { 
         alert ( 'Email is empty') ; 
         return false ; 
    } 

    if ( !data.password.trim()  ) { 
         alert ( 'Password is empty') ;
         return false ;  
    } 

    if ( !data.confirmPassword.trim()  ) { 
         alert ( 'Confirm Password is empty') ; 
         return false ; 
    } 
    return true ; 

}

function ValidateLoginField(data) { 
    if ( !data.email.trim() ) { 
         alert ( 'Email is empty') ;
         return false ;  
    }   ; 

    if ( !data.password.trim()  ) { 
         alert ( 'Password is empty') ; 
         return false ; 
    }  ; 

    return true ; 
}

export { ValidateAccountFields ,  ValidateLoginField } ; 
