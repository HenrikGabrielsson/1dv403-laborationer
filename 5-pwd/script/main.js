"use strict";

var main =  
{
    //get the icons from taskbar
    imageIcon: document.getElementById("imageIcon"),
    rssIcon: document.getElementById("rssIcon"),
    memoryIcon: document.getElementById("memoryIcon"),

    init: function ()
    {
           
        //onclick events for taskbar
        main.imageIcon.onclick = function(){
            
            var myWindow = new PWD.ImageGallery(300, 200);
            myWindow.display();
        }
        
        
    }
};

window.onload = main.init;