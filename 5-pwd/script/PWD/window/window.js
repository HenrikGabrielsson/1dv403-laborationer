"use strict";

var PWD = PWD || {};


//constructor
PWD.Window = function(width, height) 
{
    this.width = width;
    this.height = height;

}

//Method that creates a HTML-div with the properties and functions of a window
PWD.Window.prototype.createHTML = function()
    {
    this.window = document.createElement("div");


    this.window.setAttribute("class", "window");
    this.window.style.width = this.width+"px";
    this.window.style.height = this.height+"px";
    
    var thisWindow = this.window;
    var thisWidth = this.width;
    var thisHeight = this.height;

    //Div for the content
    this.windowContent = document.createElement("div");
    this.windowContent.setAttribute("class", "windowContent");
    
    //buttons for the window-object
    this.closeButton = document.createElement("a");
    this.closeButton.setAttribute("class", "closeButton");
    this.closeButton.addEventListener("click", function(){
    
        document.getElementById("desktop").removeChild(thisWindow);  
    }, false);
    this.closeButtonImage = document.createElement("img");
    this.closeButtonImage.setAttribute("src", "pics/close.png");
    this.closeButtonImage.setAttribute("alt", "Close window");
    this.closeButton.appendChild(this.closeButtonImage);
    
    
    
    this.resizeButton = document.createElement("a");
    this.resizeButton.setAttribute("class", "resizeButton");
    this.resizeButton.addEventListener("click", function() {
    
    
        //if window isn't fullsize already
        if(thisWindow.style.width == thisWidth+"px" && thisWindow.style.height == thisHeight+"px")
        {
            thisWindow.style.height ="95%";
            thisWindow.style.width = "100%";

            thisResizeButtonImage.setAttribute("src", "pics/resize2.png");
        }
    
        //else it goes back to original size
        else
        {   
            thisWindow.style.width = thisWidth+"px";
            thisWindow.style.height = thisHeight+"px";
                
            thisResizeButtonImage.setAttribute("src", "pics/resize.png");
        }
    }, false);
    this.resizeButtonImage = document.createElement("img");
    this.resizeButtonImage.setAttribute("src", "pics/resize.png");
    this.resizeButtonImage.setAttribute("alt", "Resize window");
    this.resizeButton.appendChild(this.resizeButtonImage);
    var thisResizeButtonImage = this.resizeButtonImage;
    
    
    //add all elements to window
    this.window.appendChild(this.closeButton);
    this.window.appendChild(this.resizeButton);
    this.window.appendChild(this.windowContent);

    return this.window;
};

PWD.Window.prototype.derp = function()
{
    alert();
}

//The Image gallery(inherits from Window)
PWD.ImageGallery = function(width, height) 
{
    PWD.ImageGallery.prototype = new PWD.Window(width, height);
    PWD.ImageGallery.prototype.constructor = PWD.ImageGallery;
    
}
