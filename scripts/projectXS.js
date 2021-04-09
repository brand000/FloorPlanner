/**
 * projextXS.js
 * Linked to index.html
 * Author: Brandon Watson, Laurence Cortez, Fardin 
 */

// SCL is the Scale Factor (used in formulas)
const SCL = 1.35;
// INSULATION_COLO array contains the color of the insulation in order they are in the select options
const INSULATION_COLOR = ["#D2CBCD", "#D2CBCD", "#e8e5e4", "#fec7d4", "#fdfaaa"];
// WALL_COLOR is the color used on Insulation/Wall
const WALL_COLOR = "#3104fb";
// WINDOW_COLOR is the color used on the window in the Plan View
const WINDOW_COLOR = "#07ebf8";
// ELEVATION_BACKGROUND is the fill of the canvas for Elevation View
const ELEVATION_BACKGROUND = "#A3BCFD";
// OPAQUE_CONSTRUCTION contains the values used in the calculations based on the order in the select options
const OPAQUE_CONSTRUCTION = [0, 0, 0, 3, 3, 6];
// DEGREE_DAYS contains the values used in calculations according to the order in the select options
const DEGREE_DAYS = [1, 13030, 9980, 9000, 8170, 7100, 6440, 6050, 5670, 5500, 5000, 4800, 4670, 4520, 4460, 4300, 4000, 3500, 3400, 3000];
// CONCEPTS array contains the element IDs of the concept divs in the html file, this is used for easier showing and hiding the elements
const CONCEPTS = ["","localConditions", "annualEnergyBudget", "draftsAndVentiation", "insulationAndHeatloss", "materialsAndInsulation", "environmentalImpact"];

/**  
 * Loads everything needed for the page to work.
 */
function setup(){ 
    const logo_Obj = document.getElementById("logo");
    const logoContext = logo_Obj.getContext("2d");
    
    const planObj = document.getElementById("plan-view");
    const elevationObj = document.getElementById("elevation-view");

    const planViewContext = planObj.getContext("2d");
    const elevationViewContext = elevationObj.getContext("2d");

    // Hide insulation chapter
    $("#insulation").hide();

    // Initialize Opaque output to 2
    $("#opaqueOutput").val(2);
    // Initialize Window Area output to 0
    $("#windowAreaOutput").val(0);
    // Initialize the Opaque Thermal Output to empty
    $("#opaqueThermalOutput").val("");
    // Initialize the Door Thermal output to 2
    $("#doorThermalOutput").val(2);
    // Initialize the Window Thermal Resistance output to 1
    $("#windowThermalResOutput").val(1);
    // Initialize the effective Thermal Resistance output to blank
    $("#effectiveOverallThermalResOutput").val("");
    // Initialize the Annual Energy output to blank
    $("#annualEnergyOutput").val("");

    //Clear the canvas' and fill with the background color
    fillCanvas(planObj, planViewContext, INSULATION_COLOR[0]);
    fillCanvas(elevationObj, elevationViewContext, ELEVATION_BACKGROUND);

    // Draws the logo to the page
    addLogo(logoContext);
    
    // Draws the Plan View and Elevation View with the initial values
    drawPlan(planObj, planViewContext);
    drawElevation(elevationObj, elevationViewContext);

    // Set the step to .5 each for the Opaque Slider
    document.getElementById("OpaqueSld").step = ".5";

    // register the wall thickness slider to the Opaque Thickness output
    $("#OpaqueSld").on("change", function () {

        // Everytime the slider is changed, re-draw the Plan View
        drawPlan(planObj, planViewContext);

        // val contains the value of the Opaque Thickness slider
        let val = $("#OpaqueSld").val();
        if(val >= 4){
          // Set the min attribute for the Opaque output to 4 when the value of Opaque Thickness slider is >= 4
          $("#opaqueOutput").attr("min", "4");
          // Reflect the slider value to the Opaque Thicknness output only when the slider value is >= 4
          $("#opaqueOutput").val(val);

          //recalculate the Opaque Thermal Resistance
          calculateOpaqueThermalResistance();
        }
    });

    // Set the step to .5 each for the Opaque Slider
    document.getElementById("windowAreaSld").step = ".1";
    // Register the Window Thickness slider to the output
    $("#windowAreaSld").on("change", function () {

        // Reflect the Window Area slider value to the output
        $("#windowAreaOutput").val(($("#windowAreaSld").val() / 12 * 6.744).toFixed(1));
        // Trigger the change event so that other calculations will be done
        $("#windowAreaOutput").change();


        // Re-draw the Plan View when the slider is changed
        drawPlan(planObj, planViewContext);

        // Fill the Elevation Canvas and re-draw the Elevation View
        fillCanvas(elevationObj, elevationViewContext, ELEVATION_BACKGROUND)
        drawElevation(elevationObj, elevationViewContext);
  
        
    });

    // Register the Opaque Construction select element to change the color when a selection is made
    $("#insulation-color").on("change", function () {
      // Redraw the Plan View
      drawPlan(planObj, planViewContext);

      // DO NOT calculate Opaque Thermal Rsistance if "OPAQUE CONSTRUCTION WITH R or R/INCH" is selected
      if ($("#insulation-color").val() == 0){
        return;
      }
      // Recalculate Opaque Thermal Resistance output
      calculateOpaqueThermalResistance();
    });
     
    // Show the insulation plan if the page is reloaded while Insulation is selected
    if ($("#chapter-option").val() == "Insulation") {
      $("#insulation").show();
    }
    // Register the select menu for CHAPTERS
    $("#chapter-option").on("change", function () {
      // selectedOption is the selected option from the CHAPTERS VIEW select element
      const selectedOption = $("#chapter-option").val();
      // Shows the Insulation plan
      if ( selectedOption == "Insulation") {
        $("#insulation").show();
      }else if (selectedOption == "VIEW CHAPTERS"){
        // Reloads the page
        location.reload();
      }
    });

    // Register the Door Thermal Resistance output to the Slider
    $("#doorThermalSld").on("change", function() {
      // Reflect the Door Thermal Output to the slider
      $("#doorThermalOutput").val($("#doorThermalSld").val());
      // Trigger the change event for other calculations to happen
      $("#doorThermalOutput").change();
    });

    // Register the Window Thermal Resistance output to the slider
    $("#windowThermalResSld").on("change", function() {
      // Reflect the Window Thermal Resistance output to the slider
      $("#windowThermalResOutput").val($("#windowThermalResSld").val());
      // Call the change event for other calculations to happen
      $("#windowThermalResOutput").change();
    });

    // Recalculate Overall Effective Thermal Resistance when Opaque Thermal Resistance output is changed
    $("#opaqueThermalOutput").change(function() {
      const opaqueThickness = $("#opaqueOutput").val();
      if (opaqueThickness >= 4) {
        // Recalculate Overall Effective Thermal Resistance
        calculateEffectiveOverallThermalRes();
      }
    });
    // Recalculate Overall Effective Thermal Resistance when Window Area output is changed
    $("#windowAreaOutput").change(function() {
      // Recalculate Overall Effective Thermal Resistance
      calculateEffectiveOverallThermalRes();
    });
    // Recalculate Overall Effective Thermal Resistance when Door Thermal Resistance output is changed
    $("#doorThermalOutput").change(function() {
      // Recalculate Overall Effective Thermal Resistance
      calculateEffectiveOverallThermalRes();
    });
    // Recalculate Overall Effective Thermal Resistance when Window Thermal Resistance output is changed
    $("#windowThermalResOutput").change(function() {
      // Recalculate Overall Effective Thermal Resistance
      calculateEffectiveOverallThermalRes();
    });

    // Register DEGREE_DAYS selection in the calculations of Annual Energy
    $("#placesWithDegreeDays").on("change", function() {
      // Calculate Annual Energy
      calculateAnnualEnergy();
    });

    // Recalculate Annual Energy when Effective Overall Thermal Resistance output is changed
    $("#effectiveOverallThermalResOutput").on("change", function () {
      // Recalculate Annual Energy
      calculateAnnualEnergy();
    });

    // Hide the paragraphs for CONCEPT
    for(let i = 0; i < CONCEPTS.length; i++) {
      $("#"+CONCEPTS[i]).hide();
    }

    // Show selected concept, this is useful when reloading the page
    showConcept();
    // Show appropriate concept when a selection is made.
    $("#conceptSelect").on("change", function () {
      showConcept();
    });
}

/**
 * Draws the Plan View, calculations are done inside
 */
function drawPlan(obj, ctx) {
  // thickness is the Thickness of the wall
  let thickness = $("#OpaqueSld").val() * SCL;
  // color is the Color of the Insulation
  let color = $("#insulation-color").val();

  //Drawing the Walls with color
  //OUTER WALL (BLUE)
  // This (h1) value is used for next computation so it's a good idea to put it on a variable
  let h1 = obj.height - 48 - 2; 
  ctx.beginPath();
  ctx.lineWidth = "2";
  ctx.strokeStyle = WALL_COLOR;
  ctx.rect(
    1, 
    1, 
    obj.width - 2, 
    obj.height - 48 - 2
    );
  ctx.stroke();
  //OUTER FILL (INSULATION)
  ctx.fillStyle = INSULATION_COLOR[color];
  ctx.fillRect(
    2,
    2,
    obj.width - 4,
    obj.height - 48 - 4
  );
  //INNER WALL (BLUE)
  // Values t1 and h2 are used on the next calculation so it's a good idea to put it on a variable
  let t1 = Number(thickness) + 1;
  let h2 = obj.height - 48 - t1 * 2;
  ctx.beginPath();
  ctx.lineWidth = "2";
  ctx.strokeStyle = WALL_COLOR;
  ctx.rect(
    t1, 
    t1, 
    obj.width - t1 * 2, 
    h2
  );
  ctx.stroke();
  //INNER FILL 
  // Value of t2 is used on the next calculation so it's a good idea to put it on a variable
  let t2 = t1 + 1;
  ctx.fillStyle = INSULATION_COLOR[0];
  ctx.fillRect(
    t2,
    t2,
    obj.width - (t2 * 2),
    obj.height - 48 - (t2 * 2)
  );

  //Drawing the door
  //Removing part of the line
  ctx.beginPath();
  ctx.lineWidth = "2";
  ctx.setLineDash([]);
  ctx.strokeStyle = INSULATION_COLOR[0];
  ctx.moveTo(225, 129);
  ctx.lineTo(273, 129);
  ctx.stroke();
  
  ctx.beginPath();
  ctx.lineWidth = "2";
  ctx.setLineDash([]);
  ctx.strokeStyle = INSULATION_COLOR[0];
  ctx.moveTo(225, obj.height - 48 - t2 + 1);
  ctx.lineTo(273, obj.height - 48 - t2 + 1);
  ctx.stroke();

  //Drawing dotted lines
  ctx.beginPath();
  ctx.lineWidth = "2";
  ctx.setLineDash([4,3]);
  ctx.strokeStyle = "black";
  ctx.moveTo(225 + 1, obj.height - 48 - t2 + 1);
  ctx.lineTo(273 + 1, obj.height - 48 - t2 + 1);
  ctx.stroke();

  ctx.beginPath();
  ctx.lineWidth = "2";
  ctx.setLineDash([4,3]);
  ctx.strokeStyle = "black";
  ctx.moveTo(225 + 1, 129);
  ctx.lineTo(273 + 1, 129);
  ctx.stroke();

  //Drawing door black line
  ctx.beginPath();
  ctx.lineWidth = "3";
  ctx.setLineDash([]);
  ctx.strokeStyle = "black";
  ctx.moveTo(225 + 1, 129);
  ctx.lineTo(225 + 1, 177);
  ctx.stroke();

  //Drawing curved on door
  ctx.strokeStyle = "black"; // blue
  ctx.lineWidth = 1;
  ctx.setLineDash([3, 3]);
  ctx.beginPath();
  ctx.arc(225 + 1, 129, 48, 0, Math.PI / 2, false);
  ctx.stroke();
  
  //Drawing the Window/Glass
  let size = Math.trunc($("#windowAreaSld").val()) / 2.25 * 2;


  if( $("#windowAreaOutput").val() < 1.5 ) {
    // DO NOT draw the window if the Window Area Output is < 1.5
    size = 0;
  }

  let x = (225 - size * SCL) / 2;

  if (size != 0) {
    ctx.fillStyle = WINDOW_COLOR;
    ctx.fillRect(
      20 + x,
      obj.height - 48 - t2,
      size * SCL,
      (h1 - h2) / 2 + 2
    );
    //Draw dotted lines
    ctx.beginPath();
    ctx.lineWidth = "2";
    ctx.setLineDash([4,3]);
    ctx.strokeStyle = "black";
    ctx.moveTo(20 + x + 1, obj.height - 48 - t2 + 1);
    ctx.lineTo(20 + 225 + 1 - x, obj.height - 48 - t2 + 1);
    ctx.stroke();

    ctx.beginPath();
    ctx.lineWidth = "2";
    ctx.setLineDash([4,3]);
    ctx.strokeStyle = "black";
    ctx.moveTo(20 + x + 1, 129);
    ctx.lineTo(20+ 225 + 1 -x, 129);
    ctx.stroke();
  }
  
  //Needed to avoid bugs
  ctx.setLineDash([]);
}

/**
 * Draws the Elevation View, calculations are done inside
 */
function drawElevation(obj, ctx) {
  let size = Math.trunc($("#windowAreaSld").val()) / 2.25 * 1.70 - 1;

  //Drawing the door
  //OUTER LINE
  ctx.beginPath();
  ctx.lineWidth = "1";
  ctx.strokeStyle = "black";
  let oX = obj.width - 72 * SCL;
  let oY = obj.height - 87 * SCL;
  ctx.rect(
    oX, 
    oY, 
    36 * SCL, 
    80 * SCL
    );
  ctx.stroke();
  //INNER LINE
  ctx.lineWidth = "1";
  ctx.strokeStyle = "black";
  let x = obj.width + 3 - 72 * SCL;
  let y = obj.height + 3 - 87 * SCL;
  let xl = 36 * SCL - 6;
  let yl = 80 * SCL - 6;
  ctx.rect(
    x, 
    y, 
    xl, 
    yl
    );
  ctx.stroke();
  //DOOR KNOB
  let centerX = x + xl;
  let centerY = (y + yl) / 1.5;
  ctx.strokeStyle = "black"; // blue
  ctx.lineWidth = 1;
  ctx.setLineDash([]);
  ctx.beginPath();
  ctx.arc(centerX - 5, centerY, 3, 0, 2 * Math.PI);
  ctx.stroke();

  //Drawing the Window
  // Only draw window if the Window Area is >= 1.5
  if (size >= 1.5) {
    //OUTER LINE
    ctx.beginPath();
    ctx.lineWidth = "1";
    ctx.strokeStyle = "black";
    ctx.rect(
      20 + (oX - size * 1.2 * SCL) / 2, 
      oY, 
      size * 1.2 * SCL, 
      size * SCL 
      );
    ctx.stroke();
    //INNER LINE
    ctx.beginPath();
    ctx.lineWidth = "1";
    ctx.strokeStyle = "black";
    ctx.rect(
      20 + ((oX - size * 1.2 * SCL) / 2) + 3,  
      oY + 3, 
      size * 1.2 * SCL - 6, 
      size * SCL - 6
      );
    ctx.stroke();
  }
  
}

/**
 * Fills the Canvas with specified color
 */
function fillCanvas(obj, context, color){
  context.clearRect(0, 0, obj.width, obj.height);
  context.beginPath();
  context.fillStyle = color;
  context.fillRect(0, 0, obj.width, obj.height);
}

/**
 * Draws the logo to the page
 */
function addLogo(context){
  context.font = "40px Georgia";
  context.strokeStyle = "blue";
  context.strokeText("PROJECT", 30, 50);
  
  context.font = "60px Georgia";
  context.strokeText("Xs",210, 50);
}

/**
 * Calculates the Opaque Thermal Resistance using required values
 * and put the result on the output.
 */
function calculateOpaqueThermalResistance(){
  // opaqueConstruction is what's selected in the select option
  let opaqueConstruction = $("#insulation-color").val();
  // opaqueThickness is the value on the Opaque Thickness Output
  let opaqueThickness = $("#opaqueOutput").val();

  // The calculation
  var calc = 2 + (opaqueThickness - 2) * OPAQUE_CONSTRUCTION[opaqueConstruction];

  // Puts the calculation to the output
  $("#opaqueThermalOutput").val(calc);
  // Trigger the event for other calculations to occur
  $("#opaqueThermalOutput").change();
}

/**
 * Calculates the Effective Overall Thermal Resistance using required values
 * and put the result to the output.
 */
function calculateEffectiveOverallThermalRes(){
  // windowArea is the value on the Window Area Output
  let windowArea = $("#windowAreaOutput").val();
  // opaqueThermal is the value on the Opaque Thermal Output
  let opaqueThermal = $("#opaqueThermalOutput").val();
  // windowThermal is the value on the Window Thermal Resistance Output
  let windowThermal = $("#windowThermalResOutput").val();
  // doorThermal is the value on the Door Thermal Output
  let doorThermal = $("#doorThermalOutput").val();

  // The calculation
  var calc = 1 / ( ( (800 - windowArea)/opaqueThermal + windowArea/windowThermal + 20/doorThermal) / 820 );
  // Put the value on the Effective Overall Thermal Resistance Output
  $("#effectiveOverallThermalResOutput").val(calc.toFixed(0));
  // Run the change event for other calculations to occur
  $("#effectiveOverallThermalResOutput").change();
}

/**
 * Calculates the Annual Energy using required values
 * and put the result to the output.
 */
function calculateAnnualEnergy(){
  // place is the value of selected option in the Places With Degree Days option
  let place = $("#placesWithDegreeDays").val()

  // if the selection is the default one, clears the value on the output, and exit out of the function
  if(place == 0){

    // exit function to avoid changing the output if the "PLACES WITH DEGREE DAYS" is selected
    return;
  }

  // effectiveOverallThermalRes is the value of the Overall Thermal Resistance Ouput
  let effectiveOverallThermalRes = $("#effectiveOverallThermalResOutput").val();
  // if the selection is the default one, clears the value on the output, and exit out of the function
  if(effectiveOverallThermalRes == 0){
    // Clears the value on the output
    $("#annualEnergyOutput").val("");
    // exit function
    return;
  }

  // Do calcualation
  var calc = ( 820 * DEGREE_DAYS[place] * 1.8 * 24 / effectiveOverallThermalRes ) / 3412 + DEGREE_DAYS[place] * 1.8 * 24 * 65 / 3412 + 3000;

  // Display the result on the Annual Energy Output
  $("#annualEnergyOutput").val(Math.trunc(calc));
}

/**
 * Shows the selected Concept and hides the other,
 * or hides all concepts when the default is selected
 */
function  showConcept() {
  // the value of the selected concept (index)
  let selected = $("#conceptSelect").val();

  // loops through the array of IDs (global) and shows what matches the selection
  for(let i = 1; i < CONCEPTS.length; i++) {
    // if the index matches the selection
    if(i == selected) {
      // show the concept
      $("#"+CONCEPTS[i]).show();
      // prevents the hide code to be not executed.
      continue;
    }
    // hides the concept that does not match the selection
    $("#"+CONCEPTS[i]).hide();
  }
}

/**
 * Shows an alert when an unfinished Chapters is selected
 */
function underConstruction() {
  // optionValue is the value of the selected option from the CHAPTERS VIEW select element
  const optionValue= $("#chapter-option").val();
  // chapterOptionObj is the CHAPTERS VIEW select element object
  const chapterOptionObj = $("#chapter-option");

  // displays the error
  alert(optionValue + " is under construction.");

  // return the value to VIEW CHAPTERS, this will reload the page after calling change()
  chapterOptionObj.val("VIEW CHAPTERS");
  // run change function for other functionality to occur
  chapterOptionObj.change();
}