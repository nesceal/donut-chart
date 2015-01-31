$( document ).ready(function() {
	var svg = d3.select("#donut").append("svg").attr("width",300).attr("height",300);
	svg.append("g").attr("id","theDonut");
	drawDonut();
	for(var i=0, j=1; i<len; i++, j++){
		$('table').append('<tr id="wedge_'+i+'"><td id="no_'+i+'">Wedge #'+j+'</td><td>Label:</td><td><input type="text" id="label_'+i+'" value="'+wedges[i].label+'" placeholder="'+wedges[i].label+'"></td><td>Percentage:</td><td><input type="text" id="percent_'+i+'" value="'+wedges[i].value+'" placeholder="'+wedges[i].value+'"></td><td>Color:</td><td><input type="text" id="color_'+i+'" value="'+wedges[i].color+'" placeholder="'+wedges[i].color+'"></td><td><button id="up_'+i+'" onclick="updateWedge('+i+')">Update</button></td><td><button id="rem_'+i+'" onclick="removeWedge('+i+')">Remove</button></td></tr>');
	}
	addWedge();
});

var wedges=[
	{label:"Basic", value:20, color:"#DA9E90"},
	{label:"Plus", value:20, color:"#86C44F"},
	{label:"Deluxe", value:30, color:"#909ADA"},
	{label:"Elite", value:30, color:"#A066CC"},
];

var len = wedges.length;

function addWedge(){
	$('table').append('<tr id="wedge_'+len+'"><td id="no_'+len+'">Wedge #'+(len+1)+'</td><td>Label:</td><td><input type="text" id="label_'+len+'" value="" placeholder=""></td><td>Percentage:</td><td><input type="text" id="percent_'+len+'" value="" placeholder=""></td><td>Color:</td><td><input type="text" id="color_'+len+'" value="" placeholder=""></td><td id="sub" colspan="2"><button id="sub_button" onclick="submitWedge('+len+')">Add Wedge</button></td></tr>');
		wedges.push({
		label: '',
		value: '',
		color: ''
	});
	len = wedges.length;
}

function submitWedge(x){
	if(noBlankField(x)){
		$('#sub').remove();
		$('#wedge_'+x).append('<td><button id="up_'+x+'" onclick="updateWedge('+x+')">Update</button></td><td><button id="rem_'+x+'" onclick="removeWedge('+x+')">Remove</button></td>');
		$('#label_'+x).attr({
			'value': $('#label_'+x).val(),
			'placeholder': $('#label_'+x).val()
		});
		$('#percent_'+x).attr({
			'value': $('#percent_'+x).val(),
			'placeholder': $('#percent_'+x).val()
		});
		$('#color_'+x).attr({
			'value': $('#color_'+x).val(),
			'placeholder': $('#color_'+x).val()
		});
		wedges[x].label = $('#label_'+x).val();
		wedges[x].value = $('#percent_'+x).val();
		wedges[x].color = $('#color_'+x).val();
		drawDonut();
		$('span').text('You added a new wedge!');
		addWedge();
	}else{
		$('span').text('Make sure all fields are not blank before you add a new wedge!');
	}
}

function updateWedge(x){
	$('#label_'+x).attr({
		'value': $('#label_'+x).val(),
		'placeholder': $('#label_'+x).val()
	});
	$('#percent_'+x).attr({
		'value': $('#percent_'+x).val(),
		'placeholder': $('#percent_'+x).val()
	});
	$('#color_'+x).attr({
		'value': $('#color_'+x).val(),
		'placeholder': $('#color_'+x).val()
	});
	wedges[x].label = $('#label_'+x).val();
	wedges[x].value = $('#percent_'+x).val();
	wedges[x].color = $('#color_'+x).val();
	Donut3D.transition("theDonut", wedges, 130, 100, 20, 0.4);
	$('span').text('You updated wedge #'+(x+1)+'!');
}

function removeWedge(x){
	$('#wedge_'+x).remove();
	$('span').text('You removed a wedge!');
	wedges.splice(x,1);
	len = wedges.length;
	for(var i=x; i<len; i++){
		$('#no_'+(i+1)).text('Wedge #'+(i+1));
		$('#no_'+(i+1)).attr('id','no_'+i);
		$('#wedge_'+(i+1)).attr('id','wedge_'+i);
		$('#rem_'+(i+1)).attr({
			'id': 'rem_'+i,
			'onclick': 'removeWedge('+i+')'
		});
		$('#up_'+(i+1)).attr({
			'id': 'up_'+i,
			'onclick': 'updateWedge('+i+')'
		});
		$('#label_'+(i+1)).attr({
			'id': 'label_'+i,
			'value': wedges[i].label,
			'placeholder': wedges[i].label
		});
		$('#percent_'+(i+1)).attr({
			'id': 'percent_'+i,
			'value': wedges[i].value,
			'placeholder': wedges[i].value
		});
		$('#color_'+(i+1)).attr({
			'id': 'color_'+i,
			'value': wedges[i].color,
			'placeholder': wedges[i].color
		});
	}
	$('#no_'+len).text('Wedge #'+len);
	$('#sub_button').attr('onclick','submitWedge('+(len-1)+')');
	drawDonut();
}

function drawDonut(){
	Donut3D.draw("theDonut", wedges, 150, 150, 130, 100, 20, 0.4);
}

function noBlankField(x){
	if($('#label_'+x).val() === '' || $('#precent_'+x).val() === '' || $('#color_'+x).val() === '') return false;
	else return true;
}