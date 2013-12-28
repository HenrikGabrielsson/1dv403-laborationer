"use strict";

var PWD = PWD || {};

//The Image Viewer(inherits from Window) shows a single large picture
PWD.ImageViewer = function(width, height, index, URL) 
{
    //set width and height from WIndow-class
    PWD.Window.call(this, width*1.10, height*1.20, index);
    this.URL = URL;
};
PWD.ImageViewer.prototype = new PWD.Window;

PWD.ImageViewer.prototype.createImageViewerWindow = function()
{
    
    var newWindow = this.createBasicWindow();

    //icon and title
    this.windowIcon.setAttribute("src","pics/image.png");
    this.windowTitle.appendChild(document.createTextNode("Image Viewer"));
    
    
    var image = document.createElement("img");
    image.setAttribute("src", this.URL);
    
    this.windowContent.appendChild(image);
    main.desktop.appendChild(newWindow);
    
    return newWindow;
}