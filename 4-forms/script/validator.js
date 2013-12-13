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
        

        

    }
};

window.onload = Validator.init();

