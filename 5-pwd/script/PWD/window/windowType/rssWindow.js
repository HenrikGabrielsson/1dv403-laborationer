"use strict";

var PWD = PWD || {};


//The RSS-feed window(inherits from Window)
PWD.RssWindow = function(width, height, index) 
{
    //set width and height from WIndow-class
    PWD.Window.call(this, width, height, index);

};
PWD.RssWindow.prototype = new PWD.Window;

PWD.RssWindow.prototype.createRssWindow = function()
{
    var newWindow = this.createBasicWindow();
    
    //icon and title
    this.windowIcon.setAttribute("src","pics/rss.png");
    this.windowTitle.appendChild(document.createTextNode("RSS Feed"));
        
    
    return newWindow;
}