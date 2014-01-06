"use strict";

var main =  
{
    //get the icons from taskbar
    imageIcon: document.getElementById("imageIcon"),
    rssIcon: document.getElementById("rssIcon"),
    memoryIcon: document.getElementById("memoryIcon"),
    desktop:document.getElementById("desktop"),

    init: function ()
    {
           
        //onclick events for taskbar
        main.imageIcon.onclick = function()
        {
            
            
            //create new object
            var myWindow = new PWD.ImageGallery(500, 400);
            
            //create html elements that builds the window
            myWindow = myWindow.createImageGalleryWindow();
            
            //add the new window to the desktop
            main.desktop.appendChild(myWindow);
            

        }
        main.rssIcon.onclick = function()
        {
            
            //create new object
            var myWindow = new PWD.RssWindow(300,500);
            
            //create html elements that builds the window
            myWindow = myWindow.createRssWindow();

            //add the new window to the desktop
            main.desktop.appendChild(myWindow);
            
        }
        main.memoryIcon.onclick = function()
        {
            //create new object
            var myWindow = new PWD.memoryWindow(200,200);
            
            //create HTML elements that builds the window
            myWindow = myWindow.createMemoryWindow();
            
            //add the new window to the desktop
            main.desktop.appendChild(myWindow)
            
        }
        
        
    }
};

window.onload = main.init;