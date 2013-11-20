"use strict";

window.onload = function(){

	
	var birthday = function(date){

		//Födelsedagen
        var birthday = new Date(date);
        
        //Nuvarande tid
        var now = new Date();
        
        //Dagar kvar till nästa födelsedag
        var daysleft = Math.ceil((birthday.getTime() - now.getTime())  / (1000 * 60 * 60 * 24));
        
        //Skottår
        var leapyears = 0;
        for(var i = birthday.getFullYear(); i <=now.getFullYear(); i++)
        {
            if(i % 4 == 0)
            {
                leapyears++;
            }
        }
        
        daysleft = (daysleft  + leapyears) % 365;
        //Ifall födelsedagen redan har varit detta året..
        if(daysleft < 0 )
        {
            daysleft += 365;
        }
        
        //Om det inte fungerar...
        if(isNaN(daysleft))
        {
            throw new Error ("Du skrev in datumet på fel sätt.");
        }
        
        
        return daysleft;


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
			var answer = birthday(input.value); // Läser in texten från textrutan och skickar till funktionen "convertString"
			var message;
			switch (answer){
				case 0: message = "Grattis på födelsedagen!";
					break;
				case 1: message = "Du fyller år imorgon!";
					break;
				default: message = "Du fyller år om " + answer + " dagar";
					break;
			}

			p.innerHTML = message;
		} catch (error){
			p.classList.add( "error"); // Växla CSS-klass, IE10+
			p.innerHTML = error.message;
		}
	
	});



};