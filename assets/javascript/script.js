$(document).ready(function() {

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCEzDnGTiMZXTF-j3XOVg5hnFZGAHUgYAM",
    authDomain: "homework-2d45a.firebaseapp.com",
    databaseURL: "https://homework-2d45a.firebaseio.com",
    projectId: "homework-2d45a",
    storageBucket: "",
    messagingSenderId: "848925413248"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  var trainName = "";
  var destination = "";
  var firstTime = 0;
  var frequency = 0;
  

$("#submit").on("click", function(event) {

  event.preventDefault();

  var newName = $("#name-input").val().trim();
  var newDestination = $("#destination-input").val().trim();
  var newStartTime = $("#start-time-input").val();
  var newFrequency = parseInt($("#frequency-input").val());

  console.log(newStartTime);

  var firstTimeConverted = moment(newStartTime, "hh:mm").subtract(1,"years");
  console.log(firstTimeConverted);

  var currentTime = moment();
  console.log("CURRENT TIME " + moment(currentTime).format("hh:mm"));

  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  console.log("diff " + diffTime);

  var tRemainder = diffTime % newFrequency;
  console.log(tRemainder);

  var minAway = newFrequency - tRemainder;
  console.log("min away" + minAway);

  var nextArrival = moment(moment().add(minAway, "minutes")).format("H:mm");
  console.log("arrival time " + nextArrival);

  database.ref().push({
    name: newName,
    destination: newDestination,
    startTime: newStartTime,
    frequency: newFrequency,
    arrival: nextArrival,
    minAway: minAway,
    
  });

  $("#name-input").val("");
  $("#destination-input").val("");
  $("#start-time-input").val("");
  $("#frequency-input").val("");

  
});

database.ref().on("child_added", function(childSnapshot) {

  // Log everything that's coming out of snapshot

  console.log("\n", childSnapshot.val());
  var newRow = $("<tr>");
  var nameCell = $("<td>").text(childSnapshot.val().name);
  var destinationCell = $("<td>").text(childSnapshot.val().destination);
  var frequencyCell = $("<td>").text(childSnapshot.val().frequency);
  var nextArrivalCell;
  if ( childSnapshot.val().arrival < moment()) {
    nextArrivalCell = $("<td>").text(childSnapshot.val().arrival)
  } else {
    nextArrivalCell = $("<td>").text(childSnapshot.val().startTime)

  }

  var minAwayCell = $("<td>").text(childSnapshot.val().minAway);
  

  newRow.append(nameCell, destinationCell , frequencyCell, nextArrivalCell,minAwayCell);

  $("#table-body").append(newRow);

}, function(errorObject) {
  console.log("Errors handled: " + errorObject.code);
});




});
