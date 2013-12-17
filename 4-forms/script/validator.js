"use strict";

var Validator =
{
    //formuläret
    form: document.getElementById("formElement"),
    
    //Input-fälten
    firstName: document.getElementsByName("firstName")[0],
    lastName: document.getElementsByName("lastName")[0],
    postNumber: document.getElementsByName("postNumber")[0],
    eMail: document.getElementsByName("eMail")[0],
    selectedPrice: document.getElementsByName("price")[0].selectedIndex,
    price: document.getElementsByName("price")[0].options,
    //price[selectedPrice] ger valet från dropdown-menyn
    
    //testresultat. true = valid input, false = felaktig input.
    testFirstName: false,
    testLastName: false,
    testPostNumber: false,
    testEMail: false,
    
    
    init: function()
    {
        //Datan valideras när användaren ej längre har fokus på ett fält. 
        Validator.firstName.addEventListener("blur", function()
        {
            Validator.testFirstName = Validator.validate(Validator.firstName, /^[a-zåäö]{1,}(\-[a-zåäö]{1,})?$/i,
            "Du får inte lämna fältet tomt. Du får bara använda korrekta tecken.");
        
        }, false);
        Validator.lastName.addEventListener("blur", function()
        {
            Validator.testLastName = Validator.validate(Validator.lastName, /^[a-zåäö]{1,}((\-|\s)[a-zåäö]{1,})?$/i,
            "Du får inte lämna fältet tomt. Du får bara använda korrekta tecken.");
        
        }, false);     
        Validator.postNumber.addEventListener("blur", function()
        {
            Validator.testPostNumber = Validator.validate(Validator.postNumber, /^(SE(\s?))?[0-9]{3}(\s|\-)?[0-9]{2}$/i
            , "Du får inte lämna fältet tomt. Du får inte ge fel format på postnumret.");
        
        }, false);
        Validator.eMail.addEventListener("blur", function()
        {
            Validator.testEMail = Validator.validate(Validator.eMail, /^[0-9a-zåäö\-\_\.]{1,64}@[0-9a-zåäö\-\_\.]{1,250}\.[a-zåäö]{1,4}$/i,
            "Du får inte lämna fältet tomt.Du får inte använda ett icke-godkänt format på mailadressen.");
        
        }, false);
        
        //Submit        
        Validator.form.onsubmit = submitForm;
        
        //Kollar så alla fält är korrekt ifyllda innan formuläret skickas iväg
        function submitForm ()
        {
            window.open("http://www.w3schools.com");
            if(Validator.testFirstName && Validator.testLastName && Validator.testPostNumber && Validator.testEMail)
            {
                return true;   
            }
            else
            {
                return false;
            }
        }
        
    },
    
    //funktion som validerar indata från formuläret. Parametrar: (aktuellt inputfält, reguljärt uttryck, felmeddelande)  
    validate: function(input, regex, error)
    {
        
        //Om ett fält redan ar ett felmeddelande så tas det bort
        if(input.nextSibling.getAttribute("class") == "errorMessage " + input.name)
        {
            var removeThis = input.nextSibling;
            Validator.form.removeChild(removeThis);
        }
        
        //Om valid data skickas med
        if(input.value.match(regex))
        {
            
            input.setAttribute("class", "correct");
            
            //Om det är postnummer som har godkänt men ej önskat format
            if(input.name == "postNumber" && null === input.value.match(/^[0-9]{5}$/))
            {
                //allt som inte är siffror ersätts med  tomrum
                input.value = input.value.replace(/[^0-9]/g,"");
            }
            
            return true;
        }
        
        //annars...
        else
        {
            input.setAttribute("class", "incorrect");
            
            //skapar och lägger in ett felmeddelande
            var errorMessage = document.createElement("p");
            errorMessage.setAttribute("class","errorMessage " + input.name );
            
            var messageText = document.createTextNode(error);
            errorMessage.appendChild(messageText);
            
            Validator.form.insertBefore(errorMessage, input.nextSibling);
            
            return false;
        }
    }
};

window.onload = Validator.init();

