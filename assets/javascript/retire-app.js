$(document).ready(function () {
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
  var dataBase = firebase.database();
  // Create button for adding a row
  $("#add-row-btn").on("click", function (event) {
    console.log("clicked");
    event.preventDefault();
    // Grabs user input
    var totalAssets = $("#assets-input").val().trim();
    var incomeInRetirement = $("#income-input").val().trim();
    var retirementAge = $("#retirement-age-input").val().trim();
    // var targetCity = $("#city-input").val().trim();
    var targetCity = $("#city-select :selected").text();

    console.log("targetCity " + targetCity)
    // Creates local "temporary" object for holding retirement entry data
    var newEntry = {
      city: targetCity,
      assets: totalAssets,
      income: incomeInRetirement,
      age: retirementAge
    };
    // Uploads data to the database
    dataBase.ref().push(newEntry);

    // alert("Entry successfully added");

    // Clear all of the text-boxes
    $("#assets-input").val("");
    $("#income-input").val("");
    $("#retirement-age-input").val("");
    // $("#city-input").val("");
  });

  // Firebase event for getting the database contents whenever an entry is added.
  dataBase.ref().on("child_added", function (childSnapshot) {
    var key = childSnapshot.key;
    // console.log(key);

    // Store everything into a variable.
    var targetCity = childSnapshot.val().city;
    var totalAssets = parseInt(childSnapshot.val().assets, 10);
    var incomeInRetirement = parseInt(childSnapshot.val().income, 10);
    var retirementAge = childSnapshot.val().age;

    // Constants used for calculating the cost of retirement, using Atlanta as the CpiR reference,
    // $50,000 as the minimum annual cost of living, and 80 year life expectancy.
    const lifeExpectancy = 80;
    const AtlantaMin = 50000;
    const AtlantaCpiR = 59.6549832654245;
    var queryURL = "https://www.numbeo.com/api/indices?api_key=gfc0idlc9cvrs2&query=" + targetCity;
    $.ajax({
      url: queryURL,
      method: "GET"
    })
      .then(function (response) {
        // console.log(response);
        var targetCityCpiR = response.cpi_and_rent_index;
        var yearsOfRetirement = lifeExpectancy - retirementAge;
        var youNeed = parseInt(yearsOfRetirement * AtlantaMin * targetCityCpiR / AtlantaCpiR, 10);
        var assetsInRetirement = totalAssets + yearsOfRetirement * incomeInRetirement;

        // If the result is positive (retirement fund >= funds needed), we will set the class of
        // the <td> to "positive", so that it can be styled differently from negative outcomes.

        if (assetsInRetirement >= youNeed) {
          var result = "positive";
        }

        // Create the new row
        var newRow = $("<tr class='table-row' id=" + "'" + key + "'" + ">").append(
          $("<td class='col-xs-2' style='word-wrap:normal'>").addClass(result).text("$ " + commaSeparateNumber(totalAssets)),
          $("<td class='col-xs-2' style='word-wrap:normal'>").addClass(result).text("$ " + commaSeparateNumber(incomeInRetirement)),
          $("<td class='col-xs-1' style='word-wrap:normal'>").addClass(result).text(retirementAge),
          $("<td class='col-xs-2' style='word-wrap:normal'>").addClass(result).text(targetCity),
          $("<td class='col-xs-2' style='word-wrap:normal'>").addClass(result).text("$ " + commaSeparateNumber(assetsInRetirement)),
          $("<td class='col-xs-2' style='word-wrap:normal'>").addClass(result).text("$ " + commaSeparateNumber(youNeed)),
          $("<button value='remove-entry' class='remove-entry btn btn-primary btn-sm'>" + "remove" + "</td>")
        );

        // Append the new row to the table
        $("#scenario-table > tbody").append(newRow);
      });
  });

  // Function to add commas to the numbers. 
  function commaSeparateNumber(val) {
    while (/(\d+)(\d{3})/.test(val.toString())) {
      val = val.toString().replace(/(\d+)(\d{3})/, '$1' + ',' + '$2');
    }
    return val;
  }

  // If "remove" button is clicked, delete the entry from the database.
  $("body").on("click", ".remove-entry", function () {
    $(this).closest('tr').remove();
    console.log("row removed");
    getKey = $(this).parent().attr('id');
    console.log("this is the key: " + getKey);
    dataBase.ref().child(getKey).remove();
  });
})