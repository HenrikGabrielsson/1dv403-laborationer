"use strict";

var PWD = PWD || {};

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
    
    //icon and title
    this.windowIcon.setAttribute("src","pics/image.png");
    this.windowTitle.appendChild(document.createTextNode("Image Gallery"));
    
    var windowContent = this.windowContent;
    
    //gets images and  uses anonymous function to get the returned data when everything has loaded
    this.getImagesFromServer(function(isLoading,data){
        
        //if loading is not finished
        if (isLoading)
        {
            windowContent.style.backgroundImage ="url('pics/loading.gif')";
            windowContent.style.backgroundRepeat ="no-repeat";
            windowContent.style.backgroundPosition ="center center";
            
        }
        else
        {
            windowContent.style.background = "white";
        }
        
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
                callback(false,request.responseText);
            }
            else
            {
                console.log("nåt gick fel vid inläsningen av bilderna");
            }
        }
        
        else if(request.readyState === 1)
        {
            callback(true)    
        }

    };
    request.open("GET", "http://homepage.lnu.se/staff/tstjo/labbyServer/imgviewer/", true);
    request.send(null);
    
}

