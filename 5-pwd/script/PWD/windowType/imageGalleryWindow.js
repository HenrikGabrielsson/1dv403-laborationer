"use strict";

var PWD = PWD || {};
PWD.windowType = PWD.windowType || {};

//The Image gallery(inherits from Window)
PWD.windowType.ImageGallery = function(width, height) 
{
    //set width and height from WIndow-class
    PWD.windowType.BasicWindow.call(this, width, height);

};
PWD.windowType.ImageGallery.prototype = new PWD.windowType.BasicWindow;


PWD.windowType.ImageGallery.prototype.createImageGalleryWindow = function()
{
    //call function in superclass to create a basic window
    var returnWindow = this.createBasicWindow();
    
    //icon and title
    this.windowIcon.setAttribute("src","pics/image.png");
    this.windowTitle.appendChild(document.createTextNode("Image Gallery"));
    
    var windowContent = this.windowContent;
    var message = this.statusMessage;
    
    //gets images and  uses anonymous function to get the returned data when everything has loaded
    this.getImagesFromServer(function(isLoading,data){
        
        //if loading is not finished
        if (isLoading)
        {
            windowContent.style.backgroundImage ="url('pics/loading.gif')";
            windowContent.style.backgroundRepeat ="no-repeat";
            windowContent.style.backgroundPosition ="center center";
            message.setAttribute("class","isLoading");
            message.innerHTML = "laddar...";

        }


        //saving pictures
        var images =JSON.parse(data);
        
        //when it's no longer loading
        if(!isLoading)
        {
            windowContent.style.background = "white";
            message.removeAttribute("class");
            message.innerHTML = images.length + " bilder har laddats in.";
        }

        //function that displays clicked image in it's own window
        function displayImage (i)
        {
            var imageViewer = new PWD.windowType.ImageViewer(i.width, i.height, i.URL);
            return imageViewer;
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
                    var viewerWindow = displayImage(images[i])
                    PWD.main.desktop.appendChild(viewerWindow.createImageViewerWindow());
                }
                
            }(i),false);
            
            var thumbnailDiv = document.createElement("div");
            thumbnailDiv.setAttribute("class","thumbnailDiv");
            
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
PWD.windowType.ImageGallery.prototype.getImagesFromServer = function(callback)
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

