"use strict";

var PWD = PWD || {};

PWD.Window = function() 
{
        this.window = document.createElement("div");
        this.window.setAttribute("class", "window");
        var thisWindow = this.window;
        
        this.closeButton = document.createElement("button");
        this.closeButton.onclick = function(){
        
            document.getElementById("desktop").removeChild(thisWindow);  
        }
        
        this.window.appendChild(this.closeButton);
           
};