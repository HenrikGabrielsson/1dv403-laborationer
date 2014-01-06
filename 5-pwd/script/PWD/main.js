"use strict";

var PWD = PWD || {};

PWD.main =  
{
    //get the icons from taskbar
    imageIcon: document.getElementById("imageIcon"),
    rssIcon: document.getElementById("rssIcon"),
    memoryIcon: document.getElementById("memoryIcon"),
    desktop:document.getElementById("desktop"),

    init: function ()
    {
              
        //onclick events for taskbar
        PWD.main.imageIcon.onclick = function()
        {
            
            
            //create new object
            var myWindow = new PWD.windowType.ImageGallery(500, 400);
            
            //create html elements that builds the window
            myWindow = myWindow.createImageGalleryWindow();
            
            //add the new window to the desktop
            PWD.main.desktop.appendChild(myWindow);
            

        }
        PWD.main.rssIcon.onclick = function()
        {
            
            //create new object
            var myWindow = new PWD.windowType.RssWindow(300,500);
            
            //create html elements that builds the window
            myWindow = myWindow.createRssWindow();

            //add the new window to the desktop
            PWD.main.desktop.appendChild(myWindow);
            
        }
        PWD.main.memoryIcon.onclick = function()
        {
            //create new object
            var myWindow = new PWD.windowType.memoryWindow(200,200);
            
            //create HTML elements that builds the window
            myWindow = myWindow.createMemoryWindow();
            
            //add the new window to the desktop
            PWD.main.desktop.appendChild(myWindow)
            
        }
        
        
    }
};

window.onload = PWD.main.init;