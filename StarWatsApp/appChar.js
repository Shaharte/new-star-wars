




(function (){
	var back,next;
	var apiURL = "https://swapi.co/api/people/";
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
				deleteTable();
				axios.get(next).then(function(response) {
					addRows(response.data);
					next=response.data.next;
					back=response.data.previous;
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
   	axios.get(data.homeworld).then(function(response) {
  		newCell = newRow.insertCell(1);
  		newText = document.createTextNode(response.data.name);
  		newCell.appendChild(newText);
	}); 	


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
	var homeworld,species;
	var picName = data.name.split(' ').join('-')+'-star-wars';
	    axios.get(data.homeworld).then(function(response) {
	   		homeworld=response.data.name;
		
		axios.get(data.species[0]).then(function(response) {
	   		species=response.data.name;
	   	if (!charactersModalText[data.name]){

		charactersModalText[data.name] = '<p><div>' + data.name + ' comes from ' +
		homeworld + '.</div><div>' + data.name + ' is ' +
		species +  '.</div></p><p><div>Additional Information:</div>'+
		'<div>mass: ' + data.mass + '</div>' +
		'<div>hair color: ' + data.hair_color + '</div>' +
		'<div>skin color: ' + data.skin_color + '</div>' +
		'<div>eye color: ' + data.eye_color + '</div>' +
		'<div>birth_year: ' + data.birth_year + '</div>' +
		'<div>gender: ' + data.gender + '</div>' +
		'<div><a href=http://images.google.com/search?tbm=isch&q=' + picName + '>' + data.name +' pictures</div></p>';	
		}

		});
		});
		


}


})();