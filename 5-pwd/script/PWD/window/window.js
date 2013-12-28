"use strict";

var PWD = PWD || {};

 

//constructor
PWD.Window = function(width, height, index) 
{
    
    this.width = width;
    this.height = height;
    this.index = index;

};

PWD.Window.staticIndex = 0;

//Method that creates a HTML-div with the properties and functions of a window
PWD.Window.prototype.createBasicWindow = function()
    {
    this.window = document.createElement("div");

    //some style for window
    this.window.setAttribute("class", "window");
    this.window.style.width = this.width+"px";
    this.window.style.height = this.height+"px";
    this.window.style.top = this.index*40+"px";
    this.window.style.left = this.index*20+"px";
    this.window.style.zIndex = PWD.Window.staticIndex++; 
    
    //allows user to focus on window
    this.window.addEventListener("click", function()
    {
        thisWindow.style.zIndex = PWD.Window.staticIndex++;
        
    },true);
    
    
    var thisWindow = this.window;
    var thisWidth = this.width;
    var thisHeight = this.height;
    var thisIndex = this.index;

    //icon and name in upper, left corner
    this.windowIcon = document.createElement("img");
    this.windowIcon.setAttribute("class", "windowIcon");
    this.windowTitle = document.createElement("p");

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
    this.closeButtonImage.setAttribute("class","windowButton");
    this.closeButton.appendChild(this.closeButtonImage);
    
    
    
    this.resizeButton = document.createElement("a");
    this.resizeButton.setAttribute("class", "resizeButton");
    this.resizeButton.addEventListener("click", function() {
    
    
        //if window isn't fullsize already
        if(thisWindow.style.width == thisWidth+"px" && thisWindow.style.height == thisHeight+"px")
        {
            thisWindow.style.height ="95%";
            thisWindow.style.width = "100%";
            thisWindow.style.top = 0;
            thisWindow.style.left = 0;

            thisResizeButtonImage.setAttribute("src", "pics/resize2.png");
        }
    
        //else it goes back to original size
        else
        {   
            thisWindow.style.width = thisWidth+"px";
            thisWindow.style.height = thisHeight+"px";
            thisWindow.style.top = thisIndex*40+"px";
            thisWindow.style.left = thisIndex*20+"px";
            
            thisResizeButtonImage.setAttribute("src", "pics/resize.png");
        }
    }, false);
    this.resizeButtonImage = document.createElement("img");
    this.resizeButtonImage.setAttribute("src", "pics/resize.png");
    this.resizeButtonImage.setAttribute("alt", "Resize window");
    this.resizeButtonImage.setAttribute("class","windowButton");
    this.resizeButton.appendChild(this.resizeButtonImage);
    var thisResizeButtonImage = this.resizeButtonImage;
    
    
    //add all elements to window
    this.window.appendChild(this.windowIcon);
    this.window.appendChild(this.windowTitle);
    this.window.appendChild(this.closeButton);
    this.window.appendChild(this.resizeButton);
    this.window.appendChild(this.windowContent);

    return this.window;
};


