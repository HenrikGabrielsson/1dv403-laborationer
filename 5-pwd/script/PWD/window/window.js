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

//The Image gallery(inherits from Window)
PWD.ImageGallery = function(width, height, index) 
{
    //set width and height from WIndow-class
    PWD.Window.call(this, width, height, index);

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

        //function that displays clicked image in it's own window
        function displayImage (i)
        {
            var imageViewer = new PWD.ImageViewer(i.width, i.height, main.windows.length, i.URL);
            main.windows.push(imageViewer);
            imageViewer.createImageViewerWindow();
        };

        //every image object
        for(var i = 0;i < images.length ;i++)
        {
            //create elements for the pcitures
            var thumbnailLink = document.createElement("a");
            thumbnailLink.setAttribute("href","#");
            thumbnailLink.addEventListener("click", function(i) 
            {
                return function()
                {
                    displayImage(images[i])    
                }
                
            }(i),false);
            
            var thumbnailDiv = document.createElement("div");
            thumbnailDiv.setAttribute("class","ThumbnailDiv");
            
            var thumbnail = document.createElement("img");
            thumbnail.setAttribute("src",images[i].thumbURL);
            thumbnail.setAttribute("height",images[i].thumbHeight)
            thumbnail.setAttribute("width",images[i].thumbWidth)
            
            thumbnailDiv.appendChild(thumbnail);
            thumbnailLink.appendChild(thumbnailDiv);
            windowContent.appendChild(thumbnailLink);
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


//The Image Viewer(inherits from Window) shows a single large picture
PWD.ImageViewer = function(width, height, index, URL) 
{
    //set width and height from WIndow-class
    PWD.Window.call(this, width, height, index);
    this.URL = URL;
};
PWD.ImageViewer.prototype = new PWD.Window;

PWD.ImageViewer.prototype.createImageViewerWindow = function()
{
    var newWindow = this.createBasicWindow();
    
    var image = document.createElement("img");
    image.setAttribute("src", this.URL);
    
    this.windowContent.appendChild(image);
    main.desktop.appendChild(newWindow);
    
    return newWindow;
}