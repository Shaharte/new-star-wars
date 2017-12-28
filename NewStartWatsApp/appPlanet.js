

init();


function init(){
	var back,next;
	var apiURL = "https://swapi.co/api/planets/";
	var myModal = $('#myModal');
	var charactersModalText = {};
	var nextButton = $('.next-button');
	var backButton = $('.back-button');
	
	getDetails();









function getDetails() {
  	axios.get(apiURL).then(function(response) {
  		next=response.data.next;
  		back=response.data.previous;
  		addRows(response.data);

   		nextButton.click(function(){	

			if(next){
				console.log(next);
				deleteTable();
				axios.get(next).then(function(response) {
					addRows(response.data);
					next=response.data.next;
					back=response.data.previous;
									console.log(next);

				});
			}

		});

		backButton.click(function(){		
			if(back){
				deleteTable();
				axios.get(back).then(function(response) {
					addRows(response.data);
					next=response.data.next;
					back=response.data.previous;
				});
			}

		});
	});

}
// this function call for delete table and call addRow and setListener the number of rows in the table.
function addRows(data) {
  	for (var i = 0; i < data.results.length; i++) {
   		addRow(data.results[i],i);
   		charModalText(data.results[i]);
    	setListener(data.results[i], i);
  	}
}


// this function add a new row with the Planet, Terrain and Population.
function addRow(data,i){
	var tableRef,newRow,newCell,newButtun,newText;
	tableRef = document.querySelector(".table");
	newRow = tableRef.insertRow(-1);
	newCell = newRow.insertCell(0);
	newButtun = document.createElement("a");
	newButtun.setAttribute("id", "name-"+ i);
	newButtun.setAttribute("href","#")
  	newText = document.createTextNode(data.name);
  	newButtun.appendChild(newText);
  	newCell.appendChild(newButtun);
  	newCell = newRow.insertCell(1);
  	newText = document.createTextNode(data.terrain);
  	newCell.appendChild(newText);
  	newCell = newRow.insertCell(2);
  	newText = document.createTextNode(data.population);
  	newCell.appendChild(newText);	


}
function deleteTable(){
	var table = document.querySelector(".table");
	for(var i = table.rows.length - 1; i > 0; i--)
	{
    	table.deleteRow(i);
	}
}

// this function set a listener for every characer that is currently in the table.
// when pushed, the modal pops out.
function setListener(data,i){
	var button = document.querySelector('#name-'+ i);
	button.addEventListener('click',function(){
		myModal.find('.modal-title').text(data.name);
		myModal.find('.modal-body').html(charactersModalText[data.name]);
		myModal.modal('show');	
	});
}



// this function insert all the neceserry information about the character in object. 
// the object key is the name and the value is the string that is going to be printed in the modal.
function charModalText(data){
	var picName = data.name.split(' ').join('-')+'-star-wars';
	if (!charactersModalText[data.name]){
		charactersModalText[data.name] = '<p><div>' + data.name + ' is a ' +
		data.terrain + ' planet.</div><div>' + data.name + ' has a population of ' +
		data.population +  '.</div></p><p><div>Additional Information:</div>'+
		'<div>rotation period: ' + data.rotation_period + '</div>' +
		'<div>orbital period: ' + data.orbital_period + '</div>' +
		'<div>diameter: ' + data.diameter + '</div>' +
		'<div>climate: ' + data.climate + '</div>' +
		'<div>gravity: ' + data.gravity + '</div>' +
		'<div>surface water: ' + data.surface_water + '</div>' +
		'<div><a href=http://images.google.com/search?tbm=isch&q=' + picName + '>' + data.name +' pictures</div></p>';
	}
}


}