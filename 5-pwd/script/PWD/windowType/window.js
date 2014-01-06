"use strict";

var PWD = PWD || {};
PWD.windowType = PWD.windowType || {};


//constructor
PWD.windowType.BasicWindow = function(width, height, index) 
{
    
    this.width = width;
    this.height = height;
    this.index = index;

};

//static int for the window's z-index
PWD.windowType.BasicWindow.layer = 0;

PWD.windowType.BasicWindow.horizontalPosition = 0;
PWD.windowType.BasicWindow.verticalPosition = 0;

//Method that creates a HTML-div with the properties and functions of a window
PWD.windowType.BasicWindow.prototype.createBasicWindow = function()
    {
    this.window = document.createElement("div");

    //decides where to position the window. if the window will be position outside of the browser the position will go back to the top
    if(this.height + PWD.windowType.BasicWindow.verticalPosition + 20 >= window.innerHeight - 40)
    {
        PWD.windowType.BasicWindow.verticalPosition = 0;        
    }
    else
    {
        PWD.windowType.BasicWindow.verticalPosition += 20;
    }

    //same thing as above, but horizontal
    if(this.width + PWD.windowType.horizontalPosition + 20 >= window.innerWidth - 40)
    {
        PWD.windowType.BasicWindow.horizontalPosition = 0;        
    }
    else
    {
        PWD.windowType.BasicWindow.horizontalPosition += 20;
    }


    //some style for window
    this.window.setAttribute("class", "window");
    this.window.style.width = this.width+"px";
    this.window.style.height = this.height+"px";
    this.window.style.zIndex = PWD.windowType.BasicWindow.layer++;
    this.window.style.top = PWD.windowType.BasicWindow.verticalPosition+"px";
    this.window.style.left = PWD.windowType.BasicWindow.horizontalPosition+"px";
     

    
    //allows user to focus on window
    this.window.addEventListener("click", function()
    {
        thisWindow.style.zIndex = PWD.windowType.BasicWindow.layer++;
        
    },true);
    
    
    var thisWindow = this.window;
    var thisWidth = this.width;
    var thisHeight = this.height;
    var verticalPosition = PWD.windowType.BasicWindow.verticalPosition;
    var horizontalPosition = PWD.windowType.BasicWindow.horizontalPosition;

    //icon and name in upper, left corner
    this.windowIcon = document.createElement("img");
    this.windowIcon.setAttribute("class", "windowIcon");
    this.windowTitle = document.createElement("p");

    //Div for the content
    this.windowContent = document.createElement("div");
    this.windowContent.setAttribute("class", "windowContent");
    this.windowContent.style.height=this.height-50 +"px";
    
    
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
            thisWindow.style.top = verticalPosition+"px";
            thisWindow.style.left = horizontalPosition*20+"px";
            
            thisResizeButtonImage.setAttribute("src", "pics/resize.png");
        }
    }, false);
    this.resizeButtonImage = document.createElement("img");
    this.resizeButtonImage.setAttribute("src", "pics/resize.png");
    this.resizeButtonImage.setAttribute("alt", "Resize window");
    this.resizeButtonImage.setAttribute("class","windowButton");
    this.resizeButton.appendChild(this.resizeButtonImage);
    var thisResizeButtonImage = this.resizeButtonImage;
    
    
    //Statusfield at bottom of window
    this.statusField = document.createElement("div");
    this.statusField.setAttribute("class","statusField");
    this.statusMessage = document.createElement("p");
    this.statusField.appendChild(this.statusMessage);
    
    //add all elements to window
    this.window.appendChild(this.windowIcon);
    this.window.appendChild(this.windowTitle);
    this.window.appendChild(this.closeButton);
    this.window.appendChild(this.resizeButton);
    this.window.appendChild(this.windowContent);
    this.window.appendChild(this.statusField);

    return this.window;
};


