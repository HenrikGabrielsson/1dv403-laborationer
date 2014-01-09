"use strict";

var PWD = PWD || {};
PWD.windowType = PWD.windowType || {};

//The Image Viewer(inherits from Window) shows a single large picture
PWD.windowType.ImageViewer = function(width, height, url) 
{
    //set width and height from WIndow-class
    PWD.windowType.BasicWindow.call(this, width*1.10, height*1.20);
    this.url = url;
};
PWD.windowType.ImageViewer.prototype = new PWD.windowType.BasicWindow;

PWD.windowType.ImageViewer.prototype.createImageViewerWindow = function()
{
    
    var newWindow = this.createBasicWindow();

    //icon and title
    this.windowIcon.setAttribute("src","pics/image.png");
    this.windowTitle.appendChild(document.createTextNode("Image Viewer"));
    
    
    var image = document.createElement("img");
    image.setAttribute("src", this.url);
    image.setAttribute("class","fullPicture");
    
    this.windowContent.appendChild(image);
    
    return newWindow;
}