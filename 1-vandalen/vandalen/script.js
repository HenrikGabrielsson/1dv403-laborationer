"use strict";

var makePerson = function(persArr){

    //objektet som ska returneras.
	var personData = new Object();
	
	//Egenskaper
	personData.names = "";
	personData.maxAge = 0;
	personData.minAge = 0;
	personData.averageAge = 0;

	var sortedArrName = [];
	var sortedArrAge = [];
	
	//Loopar igenom argumentsarrayen
	for(var i = 0; i < persArr.length; i++)
	{
	    personData.averageAge += (persArr[i].age);
	    sortedArrName[i] = persArr[i].name;
	    sortedArrAge[i] = persArr[i].age;


	//sorterar arrayer med namn respektive åldrar
	sortedArrName = sortedArrName.sort(function(a,b){return a.toString().localeCompare(b.toString())});
	sortedArrAge = sortedArrAge.sort(function(a,b){return a-b});
	
	
	//Skapar strängen med namnen
	personData.names = sortedArrName.join(", ");
	
	//tilldelar egenskaperna för åldrar sina 
	personData.minAge = sortedArrAge[0];
	personData.maxAge = sortedArrAge[(sortedArrAge.length-1)];
	personData.averageAge = Math.round(personData.averageAge /= persArr.length);

    return personData;
};
