"use strict";

var main =  
{
    //get the icons from taskbar
    imageIcon: document.getElementById("imageIcon"),
    rssIcon: document.getElementById("rssIcon"),
    memoryIcon: document.getElementById("memoryIcon"),
    windows:[],

    init: function ()
    {
           
        //onclick events for taskbar
        main.imageIcon.onclick = function(){
            
            var myWindow = new PWD.ImageGallery(300, 200);
            main.windows.push(myWindow);
            
            //create html elements that builds the window
            var newWindow = myWindow.createImageGalleryWindow();
            
            //add the new window to the desktop
            var desktop = document.getElementById("desktop");
            desktop.appendChild(newWindow);
            

        }
        
    }
};

window.onload = main.init;