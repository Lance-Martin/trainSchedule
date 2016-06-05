$(document).ready(function() {
var url='https://lancetrainschedule.firebaseio.com/';
var myBase = new Firebase(url);
console.log("page was loaded");

$('#addTrain').on('click', function(event) {
  event.preventDefault();
  var trainName = $('#trainName').val().trim();
  var trainDestination = $('#destination').val().trim();
  var firstTime =$('#startInput').val().trim();
  console.log($('#frequency').val());
  var frequency =$('#frequency').val().trim();
  var firstTimeConverted = moment(firstTime,"hh:mm").subtract(1, "years");
  var currentTime = moment();
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  var tRemainder = diffTime % frequency;
  var tMinutesTillTrain = frequency - tRemainder;
  // Next Train
  var nextTrain = moment().add(tMinutesTillTrain, "minutes");
  var nextTime = moment(nextTrain).format("hh:mm");

  var train = {
    name: trainName,
    destination: trainDestination,
    often: frequency,
    nextArrival: nextTime,
    minutesTill: tMinutesTillTrain,
  };

  console.log(train);
  myBase.push(train);

  trainName = $('#trainName').val("");
  trainDestination = $('#destination').val("");
  firstTime =$('#startInput').val("");
  frequency =$('#frequency').val("");

});

myBase.on("child_added", function(childSnapshot, prevChildKey){

	console.log(childSnapshot.val());

	// Store everything into a variable.
	var tName = childSnapshot.val().name;
	var tDestination = childSnapshot.val().destination;
	var tFrequency = childSnapshot.val().often;
	var tArrival = childSnapshot.val().nextArrival;
  var tTill = childSnapshot.val().minutesTill;

	// Add each train's data into the table
	$("tbody").append("<tr><td>" + tName + "</td><td>" + tDestination + "</td><td>" + tFrequency + "</td><td>" + tArrival + "</td><td>" + tTill + "</td></tr>");

});

});
