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
    selectedPrice: document.getElementsByName("price")[0],

    
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
            if(Validator.testFirstName && Validator.testLastName && Validator.testPostNumber && Validator.testEMail)//(Validator.testFirstName && Validator.testLastName && Validator.testPostNumber && Validator.testEMail)
            {
                //Anropar en funktion som kollar så att användaren verkligen vill fortsätta
                return Validator.confirmSubmit();   
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
    },
    
    //funktion som skapar ett "fönster" för att kolla ifall användaren verkligen känner för att submitta informationen
    confirmSubmit: function ()
    {
        
        //ruta som täcker formuläret tills användaren har klickat på en knapp i det nya fönstret.
        var blackScreen = document.createElement("div");
        blackScreen.setAttribute("class","faded");
        
        //Confirm-fönstret med child-element
        var confirmWindow = document.createElement("div");
        confirmWindow.setAttribute("class","confirmWindow");  
        
        
        
        //lista med uppgifterna skapas
        var list = document.createElement("ul");
        
        var liFirstName = document.createElement("li");
        var liLastName = document.createElement("li");
        var liPostNumber = document.createElement("li");
        var liEMail = document.createElement("li");
        var liPrice = document.createElement("li");
        

        liFirstName.appendChild(document.createTextNode("Förnamn: "+ Validator.firstName.value));
        liLastName.appendChild(document.createTextNode("Efternamn: "+ Validator.lastName.value));
        liPostNumber.appendChild(document.createTextNode("Postnummer "+ Validator.postNumber.value));        
        liEMail.appendChild(document.createTextNode("E-mail: " +Validator.eMail.value));
        liPrice.appendChild(document.createTextNode("Prismodell: " + Validator.selectedPrice.options[Validator.selectedPrice.selectedIndex].text));
    
        list.appendChild(liFirstName);
        list.appendChild(liLastName);
        list.appendChild(liPostNumber);
        list.appendChild(liEMail);
        list.appendChild(liPrice);
        
        
     
        
        var cancelButton = document.createElement("button");
        cancelButton.setAttribute("class","cancelButton");
        cancelButton.appendChild(document.createTextNode("Avbryt"));
        cancelButton.addEventListener("click",function()
        {
            document.body.removeChild(blackScreen);
            document.body.removeChild(confirmWindow);
        },false);
        
        var confirmButton = document.createElement("button");
        confirmButton.setAttribute("class","confirmButton");
        confirmButton.appendChild(document.createTextNode("Slutför köpet"));
        confirmButton.addEventListener("click", function()
            {
                Validator.form.submit();
            }
        ,false)
        
        var question = document.createElement("p");
        question.appendChild(document.createTextNode("Vill du slutföra köpet?"));        
       
        confirmWindow.appendChild(list);
        confirmWindow.appendChild(question);
        confirmWindow.appendChild(cancelButton);
        confirmWindow.appendChild(confirmButton)
        
        document.body.appendChild(blackScreen)
        document.body.appendChild(confirmWindow);
        return false;
    }
};

window.onload = Validator.init();

