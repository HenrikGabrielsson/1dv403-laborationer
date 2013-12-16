"use strict";

var Validator =
{
    init: function()
    {
        var form = document.getElementById("formElement");
        form.onsubmit = Validator.validate;
    },
    
    validate: function()
    {
        //hämtar de olika fälten som ska testas
        var firstName = document.getElementsByName("firstName")[0].value;
        var lastName = document.getElementsByName("lastName")[0].value;
        var postNumber = document.getElementsByName("postNumber")[0].value;
        var eMail = document.getElementsByName("eMail")[0].value;
        var selectedPrice = document.getElementsByName("price")[0].selectedIndex;
        var price = document.getElementsByName("price")[0].options;
        //price[selectedPrice] ger valet från dropdown-menyn
        
        //här testas de olika textfälten.
        var testFirstName = (firstName.match(/^[a-zåäö]{1,}(\-[a-zåäö]{1,})?$/i));
        var testLastName = (lastName.match(/^[a-zåäö]{1,}((\-|\s)[a-zåäö]{1,})?$/i));
        var testPostNumber = (postNumber.match(/^[0-9]{5}$/));
        var testEMail = (eMail.match(/^[a-zåäö\-\_\.]{1,64}@[a-zåäö\-\_\.]{1,250}\.[a-zåäö]{2,4}$/i));
        
        //så länge inget "test" tilldelas true:
        if(testFirstName && testLastName && testPostNumber && testEMail)
        {
            return true;
        }
        
        else
        {
            return false;
        }
        

    }
};

window.onload = Validator.init();

