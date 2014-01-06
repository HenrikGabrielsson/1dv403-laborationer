"use strict";

var PWD = PWD || {};
PWD.windowType = PWD.windowType || {};

//The RSS-feed window(inherits from Window)
PWD.windowType.RssWindow = function(width, height) 
{
    //set width and height from WIndow-class
    PWD.windowType.BasicWindow.call(this, width, height);
};
PWD.windowType.RssWindow.prototype = new PWD.windowType.BasicWindow;


PWD.windowType.RssWindow.prototype.createRssWindow = function()
{
    var newWindow = this.createBasicWindow();
    
    //icon and title
    this.windowIcon.setAttribute("src","pics/rss.png");
    this.windowTitle.appendChild(document.createTextNode("RSS Feed"));
    
    var thisGetRssFeed = this.getRssFeed;
    var windowContent = this.windowContent;
    var message = this.statusMessage; 

    //adds data from rss to the window
    var addFeedToWindow = function()
    {
        thisGetRssFeed(function(isLoading,data)
        {
        if(isLoading)
        {
            message.setAttribute("class","isLoading");
            message.innerHTML = "Uppdaterar...";               
        }
 
        else
        {
            windowContent.style.background = "white";

            //get last update time
            var fullDate = new Date();
            var time = fullDate.getHours() + ":" + (fullDate.getMinutes()<10?0:"") + fullDate.getMinutes() + ":" + (fullDate.getSeconds()<10?0:"") + fullDate.getSeconds()

            message.removeAttribute("class");
            message.innerHTML = "Senast uppdaterad: " + time ;
        }
        
        //add the data only if it contains something
        if(data !== undefined)
        {
            windowContent.innerHTML = data;
        }
        });
   };
    
    //get news every 30 seconds
    addFeedToWindow();
    var updateFeed = setInterval(function()
    {
                
        addFeedToWindow();
       
    }, 30000)
    
    //stop updating when window is closed
    this.closeButton.onclick = function(){clearInterval(updateFeed)};
    return newWindow;
}

//Function that gets the rss feed
PWD.windowType.RssWindow.prototype.getRssFeed = function(callback)
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

