$(document).ready(function() {
var url='https://lancetrainschedule.firebaseio.com/';
var myBase = new Firebase(url);
console.log("page was loaded");


//On click for when the user clicks submit
$('#addTrain').on('click', function(event) {
  event.preventDefault();
  //Grab the input values
  var trainName = $('#trainName').val().trim();
  var trainDestination = $('#destination').val().trim();
  var firstTime =$('#startInput').val().trim();
  console.log($('#frequency').val());
  var frequency =$('#frequency').val().trim();

  //Create a new object called "train"
  var train = {
    name: trainName,
    destination: trainDestination,
    often: frequency,
    first: firstTime,
  };

  //Push the train object to firebase
  myBase.push(train);

  //Clear the input values
  trainName = $('#trainName').val("");
  trainDestination = $('#destination').val("");
  firstTime =$('#startInput').val("");
  frequency =$('#frequency').val("");

});


//Function that builds the table
function buildTable(){
myBase.off("child_added");

//When a child is added to the firebase
myBase.on("child_added", function(childSnapshot, prevChildKey){
	var tName = childSnapshot.val().name;
	var tDestination = childSnapshot.val().destination;
	var tFrequency = childSnapshot.val().often;
	var tFirst = childSnapshot.val().first;
  var firstTimeConverted = moment(tFirst,"hh:mm").subtract(1, "years");
  var currentTime = moment();
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  var tRemainder = diffTime % tFrequency;
  var tMinutesTillTrain = tFrequency - tRemainder;
  var nextTrain = moment().add(tMinutesTillTrain, "minutes");
  var nextTime = moment(nextTrain).format("hh:mm");
	// Add each train's data into the table
	$("tbody").append("<tr><td>" + tName + "</td><td>" + tDestination + "</td><td>" + tFrequency + "</td><td>" + nextTime + "</td><td>" + tMinutesTillTrain + "</td></tr>");
});
}

buildTable();

//Updates the table every 60 seconds
setInterval(function(){
    $('tbody').empty();
    buildTable();
},1000*60);

});
