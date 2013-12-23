"use strict";

var PWD = PWD || {};

PWD.Window = function(width, height) 
{
    this.window = document.createElement("div");
    this.width = width;
    this.height = height;

    this.window.setAttribute("class", "window");
    this.window.style.width = width+"px";
    this.window.style.height = height+"px";
    var thisWindow = this.window;

    //buttons for the window-object
    this.closeButton = document.createElement("button");
    this.closeButton.addEventListener("click", function(){
    
        document.getElementById("desktop").removeChild(thisWindow);  
    }, false);
    
    this.resizeButton = document.createElement("button");
    this.resizeButton.addEventListener("click", function() {
    
        //if window isn't fullsize already
        if(thisWindow.style.width == width+"px" && thisWindow.style.height == height+"px")
        {
            thisWindow.style.height ="100%";
            thisWindow.style.width = "100%";
        }
    
        //else it goes back to original size
        else
        {   
            thisWindow.style.width = width+"px";
            thisWindow.style.height = height+"px";
        }
        

    }, false)
    
    this.window.appendChild(this.closeButton);
    this.window.appendChild(this.resizeButton);
    
    this.display = function()
    {
        var desktop = document.getElementById("desktop");
        desktop.appendChild(thisWindow);
    }
      
};

//The Image gallery(inherits from Window)
PWD.ImageGallery = function(width, height) 
{
    PWD.ImageGallery.prototype = new PWD.Window(width, height);
    PWD.ImageGallery.prototype.constructor = PWD.ImageGallery;   
    
    
}

