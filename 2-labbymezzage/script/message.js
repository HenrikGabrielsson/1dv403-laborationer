"use strict";

//Konstruktor för Meddelanden
function Message(message, date)  {
    
    //getters
    this.getText = function() {return message};
    this.getDate = function() {return date};
    
    //setters
    this.setText = function(_message) {message = _message};
    this.setDate = function(_date) {date = _date};
    
}

//Returnerar en sträng med all info om meddelandet
Message.prototype.toString = function() {
    
    return this.getText() + " (" + this.getDate() + ")";
};


//Returnerar meddelandetexten
Message.prototype.getHTMLText = function() {
    
    var HTMLstring = this.getText();
    return HTMLstring.replace("\\n", "<br>");    
}; 

