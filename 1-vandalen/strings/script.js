"use strict";

window.onload = function(){

	// I denna funktion ska du skriva koden för att hantera "spelet"
	var convertString = function(str){

	    //Strängen som ska skapas initieras
	    var convertedString = "";
	    
	    //Om användaren inte skriver något så kastas ett felmeddelande iväg.
	    if(str.length == 0) 
	    {
	        throw new Error("Du måste skriva något!");
	    }
	    
	    
	    //Loop som går igenom varje tecken i strängen.
	    for(var i = 0; i < str.length; i++)
	    {
	        	        //Gör om a/A till '#'
	        if(str.charAt(i) == "a" || str.charAt(i) == "A")
	        {
	            convertedString = convertedString + "#";
	        }
	        
	        //else if-satser som gör om gemener till versaler och tvärtom.
	        else if(str.charAt(i) == str.charAt(i).toUpperCase())
	        {
	            convertedString = convertedString + str.charAt(i).toLowerCase();
	        }
	        
	        else if(str.charAt(i) == str.charAt(i).toLowerCase())
	        {
	            convertedString = convertedString + str.charAt(i).toUpperCase();
	        }
	    }

	    return convertedString;
	    
	};
	// ------------------------------------------------------------------------------


	// Kod för att hantera utskrift och inmatning. Denna ska du inte behöva förändra
	var p = document.querySelector("#value"); // Referens till DOM-noden med id="#value"
	var input = document.querySelector("#string");
	var submit = document.querySelector("#send");

	// Vi kopplar en eventhanterare till formulärets skickaknapp som kör en anonym funktion.
	submit.addEventListener("click", function(e){
		e.preventDefault(); // Hindra formuläret från att skickas till servern. Vi hanterar allt på klienten.

		p.classList.remove( "error");

		try {
			var answer = convertString(input.value) // Läser in texten från textrutan och skickar till funktionen "convertString"
			p.innerHTML = answer;		// Skriver ut texten från arrayen som skapats i funktionen.	
		} catch (error){
			p.classList.add( "error"); // Växla CSS-klass, IE10+
			p.innerHTML = error.message;
		}
	
	});



};