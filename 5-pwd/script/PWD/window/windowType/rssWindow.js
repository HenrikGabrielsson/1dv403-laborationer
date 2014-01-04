"use strict";

var PWD = PWD || {};
PWD.window = PWD.window || {};
PWD.window.windowType = PWD.window.windowType || {};

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
    
    var thisGetRssFeed = this.getRssFeed;
    var windowContent = this.windowContent;

    //adds data from rss to the window
    var addFeedToWindow = function()
    {
        thisGetRssFeed(function(isLoading,data)
        {
        if(isLoading)
        {
            windowContent.style.backgroundImage ="url('pics/loading.gif')";
            windowContent.style.backgroundRepeat ="no-repeat";
            windowContent.style.backgroundPosition ="center center";                
        }
 
        else
        {
            windowContent.style.background = "white";
        }
        
        //add the data only if it contains something
        if(data !== undefined)
        {
            windowContent.innerHTML = data;
        }
        });
   }
    
    //get news every 5 seconds
    addFeedToWindow();/*
    var updateFeed = setInterval(function()
    {
                
        addFeedToWindow();
       
    }, 5000)*/
    
    //stop updating when window is closed
    this.closeButton.onclick = function(){clearInterval(updateFeed)};
    return newWindow;
}

//Function that gets the rss feed
PWD.RssWindow.prototype.getRssFeed = function(callback)
{
    
    var request = new XMLHttpRequest();
    
    request.onreadystatechange = function()
    {
        
    
    if(request.readyState === 4)
        {
            //checking for errors
            if(request.status >= 200 && request.status < 300 || request.status === 304)
            {
                callback(false, request.responseText);
            }
            else
            {
                console.log("nåt gick fel vid inläsningen av bilderna");
            }
        }
        
        //if still loading
        else if(request.readyState === 1)
        {
            callback(true);
        }

    };
    request.open("GET", "http://homepage.lnu.se/staff/tstjo/labbyServer/rssproxy/?url=http://www.dn.se/m/rss/senaste-nytt", true);
    request.send(null);
    
    
}

