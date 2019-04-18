// Initialize Firebase
var config = {
    apiKey: "AIzaSyClSH-okXO9m-Sj8UDkWM4yaPz1LY1wmos",
    authDomain: "retire-trial.firebaseapp.com",
    databaseURL: "https://retire-trial.firebaseio.com",
    projectId: "retire-trial",
    storageBucket: "retire-trial.appspot.com",
    messagingSenderId: "342348471391"
  };
  
  firebase.initializeApp(config);
  
  var database = firebase.database();
  
  // Create button for adding a row
  $("#add-row-btn").on("click", function (event) {
    event.preventDefault();
  
    // Grabs user input
    var totalAssets = $("#assets-input").val().trim();
    var incomeInRetirement = $("#income-input").val().trim();
    var retirementAge = $("#retirement-age-input").val().trim();
    var targetCity = $("#city-input").val().trim();
  
    // Creates local "temporary" object for holding train data
    var newEntry = {
      city: targetCity,
      assets: totalAssets,
      income: incomeInRetirement,
      age: retirementAge
    };
  
    // Uploads data to the database
    database.ref().push(newEntry);
  
    // Logs everything to console
    console.log("new city: " + newEntry.city);
    console.log("new assets: " + newEntry.assets);
    console.log("new income: " + newEntry.income);
    console.log("new age: " + newEntry.age);
  
    alert("Entry successfully added");
  
    // Clears all of the text-boxes
    $("#assets-input").val("");
    $("#income-input").val("");
    $("#retirement-age-input").val("");
    $("#city-input").val("");
  });
  
  // Create Firebase event for adding train to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function (childSnapshot) {
    // console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var targetCity = childSnapshot.val().city;
    var totalAssets = parseInt(childSnapshot.val().assets,10);
    var incomeInRetirement = parseInt(childSnapshot.val().income, 10);
    var retirementAge = childSnapshot.val().age;
  
    // these are set for the program.  using Atlanta and $50,000 as the minimum base requirement
  var lifeExpectancy=80;
  var AtlantaMin=50000;
  var AtlantaCpiR = 59.6549832654245;
  
    var queryURL = "https://www.numbeo.com/api/indices?api_key=gfc0idlc9cvrs2&query=" + targetCity;
  
    $.ajax({
      url: queryURL,
      method: "GET"
    })
      .then(function (response) {
        console.log(response);
        var targetCityCpiR = response.cpi_and_rent_index;
        console.log(targetCityCpiR);
        if(targetCityCpiR == "undefined");{
          console.log("target city not available");
        }
        var yearsOfRetirement = lifeExpectancy - retirementAge;
        console.log(yearsOfRetirement, AtlantaMin, targetCityCpiR, AtlantaCpiR);
        var youNeed = parseInt(yearsOfRetirement * AtlantaMin * targetCityCpiR / AtlantaCpiR,10);
        var assetsInRetirement = totalAssets + yearsOfRetirement * incomeInRetirement;
        // if(youNeed == "NaN"); {youNeed="City Data Not Available"};
        
        // Create the new row
        var newRow = $("<tr>").append(
          $("<td>").text("$ " + commaSeparateNumber(totalAssets)),
          $("<td>").text("$ " + commaSeparateNumber(incomeInRetirement)),
          $("<td>").text(retirementAge),
          $("<td>").text(targetCity),
          $("<td>").text("$ " + commaSeparateNumber(assetsInRetirement)),
          $("<td>").text("$ " + commaSeparateNumber(youNeed)),
        );
  
        // Append the new row to the table
        $("#train-table > tbody").append(newRow);
      });
  });
  
  function commaSeparateNumber(val){
    while (/(\d+)(\d{3})/.test(val.toString())){
      val = val.toString().replace(/(\d+)(\d{3})/, '$1'+','+'$2');
    }
    return val;
  }