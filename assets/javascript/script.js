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


  // console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
  

$("#submit").on("click", function(event) {

  event.preventDefault();

  // console.log(moment(convertedDate).format("MM/DD/YY"));

  var newName = $("#name-input").val().trim();
  var newDestination = $("#destination-input").val().trim();
  var newStartTime = $("#start-time-input").val();
  var newFrequency = parseInt($("#frequency-input").val());

  database.ref().push({
    name: newName,
    destination: newDestination,
    startTime: newStartTime,
    frequency: newFrequency,
    // arrival: nextArrival,
    // dateAdded: firebase.database.ServerValue.TIMESTAMP
  });

  $("#name-input").val("");
  $("#destination-input").val("");
  $("#start-time-input").val("");
  $("#frequency-input").val("");

  var firstTimeConverted = moment(newStartTime, "hh:mm").subtract(1,"years");
  console.log(firstTimeConverted);

  var currentTime = moment();
  console.log("CURRENT TIME" + moment(currentTime).format("hh:mm"));

  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  console.log("diff" + diffTime);

  var tRemainder = diffTime % newFrequency;
  console.log(tRemainder);

  var minAway = newFrequency - tRemainder;
  console.log("min away" + minAway);

  var nextArrival = moment().add(minAway, "minutes");
  console.log("arrival time" + moment(nextArrival).format("hh:mm"));


});

database.ref().on("child_added", function(childSnapshot) {

  // Log everything that's coming out of snapshot
  console.log(childSnapshot.val().name);
  console.log(childSnapshot.val().destination);
  console.log(childSnapshot.val().startTime);
  console.log(childSnapshot.val().frequency);

  var newRow = $("<tr>");
  var nameCell = $("<td>").text(childSnapshot.val().name);
  var destinationCell = $("<td>").text(childSnapshot.val().destination);
  var frequencyCell = $("<td>").text(childSnapshot.val().frequency);
  var nextArrivalCell = $("<td>").text(childSnapshot.val().nextArrival)
  // var startTimeCell = $("<td>").text(childSnapshot.val().startTime);
  

  newRow.append(nameCell, destinationCell , frequencyCell, nextArrivalCell);

  $("#table-body").append(newRow);

// Handle the errors
}, function(errorObject) {
  console.log("Errors handled: " + errorObject.code);
});


/*database.ref().on("value", function(snapshot) {

  // If Firebase has a highPrice and highBidder stored (first case)
  if (snapshot.child("highBidder").exists() && snapshot.child("highPrice").exists()) {
    // Set the variables for highBidder/highPrice equal to the stored values.
    highBidder = snapshot.val().highBidder;
    highPrice = parseInt(snapshot.val().highPrice);

    // Change the text inside the HTML element to reflect the initial value
    $("#highest-bidder").text(snapshot.val().highBidder);
    $("#highest-price").text("$" + snapshot.val().highPrice);

    // Print the data to the console.
    console.log(snapshot.val().highBidder);
    console.log(snapshot.val().highPrice);
  }

  // Keep the variables for highBidder/highPrice equal to the initial values
  else {

    // Change the HTML to reflect the initial value
    $("#highest-bidder").text(highBidder);
    $("#highest-price").text("$" + highPrice);

    // Print the initial data to the console.
    console.log("Current High Price");
    console.log(highBidder);
    console.log(highPrice);
  }*/




});
