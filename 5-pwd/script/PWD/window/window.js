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
        
    },false);
    
    
    var thisWindow = this.window;
    var thisWidth = this.width;
    var thisHeight = this.height;


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

//The Image gallery(inherits from Window)
PWD.ImageGallery = function(width, height, positiontop, positionleft) 
{
    //set width and height from WIndow-class
    PWD.Window.call(this, width, height, positiontop, positionleft);

};
PWD.ImageGallery.prototype = new PWD.Window;


PWD.ImageGallery.prototype.createImageGalleryWindow = function()
{
    //call function in superclass to create a basic window
    var returnWindow = this.createBasicWindow();
    
    this.windowIcon.setAttribute("src","pics/image.png");
    this.windowTitle.appendChild(document.createTextNode("Image Gallery"));
    
    var windowContent = this.windowContent;
    
    //gets images and  uses anonymous function to get the returned data when everything has loaded
    this.getImagesFromServer(function(data){
        
        var images =JSON.parse(data);

        //every image object
        for(var i = 0;i < images.length ;i++)
        {
            //create elements for the pcitures
            var thumbnailDiv = document.createElement("div");
            thumbnailDiv.setAttribute("class","ThumbnailDiv");
            
            var thumbnail = document.createElement("img");
            thumbnail.setAttribute("src",images[i].thumbURL);
            thumbnail.setAttribute("height",images[i].thumbHeight)
            thumbnail.setAttribute("width",images[i].thumbWidth)
            
            thumbnailDiv.appendChild(thumbnail);
            windowContent.appendChild(thumbnailDiv);
        }
        
    });
    
    
    
    return returnWindow;
}

//function that gets images from a remote server with ajax
PWD.ImageGallery.prototype.getImagesFromServer = function(callback)
{
    var request = new XMLHttpRequest();

    request.onreadystatechange = function()
    {
        //when completely loaded
        if(request.readyState === 4)
        {
            //checking for errors
            if(request.status >= 200 && request.status < 300 || request.status === 304)
            {
                callback(request.responseText);
            }
            else
            {
                console.log("nåt gick fel vid inläsningen av bilderna");
            }
            
        }
    };
    request.open("GET", "http://homepage.lnu.se/staff/tstjo/labbyServer/imgviewer/", true);
    request.send(null);
    
}

