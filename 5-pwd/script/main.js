"use strict";

var main =  
{
    //get the icons from taskbar
    imageIcon: document.getElementById("imageIcon"),
    rssIcon: document.getElementById("rssIcon"),
    memoryIcon: document.getElementById("memoryIcon"),

    init: function ()
    {
        var desktop = document.getElementById("desktop");
        
           
        //onclick events for taskbar
        main.imageIcon.onclick = function(){
            
            var myWindow = new PWD.Window();
            desktop.appendChild(myWindow.window); 
            main.windows.push(myWindow);
        }
        
        
    }
};

window.onload = main.init;