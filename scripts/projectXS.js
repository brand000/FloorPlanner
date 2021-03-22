// projectXS.js
// LINKED to index.html

const SCL = 1.35;
const INSULATION_COLOR = ["#D2CBCD", "#D2CBCD", "#e8e5e4", "#fec7d4", "#fdfaaa"];
const WALL_COLOR = "#3104fb";
const WINDOW_COLOR = "#07ebf8";
const ELEVATION_BACKGROUND = "#A3BCFD";
const OPAQUE_CONSTRUCTION = [0, 0, 0, 3, 3, 6];

function setup(){ 
    const logo_Obj = document.getElementById("logo");
    const logo = logo_Obj.getContext("2d");
    
    const planObj = document.getElementById("plan-view");
    const elevationObj = document.getElementById("elevation-view");

    const planViewContext = planObj.getContext("2d");
    const elevationViewContext = elevationObj.getContext("2d");

    //Hide insulation chapter
    $("#insulation").hide();

    //Initialize numbers for the inputs
    $("#OpaqueInput").val(2);
    $("#windowAreaInput").val(0);
    $("#opaqueThermalOut").val(0);
    $("#doorThermalOut").val(2);
    $("#windowThermalResOut").val(1);
    $("#effectiveOverallThermalResOut").val("");
    $("#annualEnergyOut").val("");

    //Clear the canvas and fill with the background color
    fillCanvas(planObj, planViewContext, INSULATION_COLOR[0]);
    fillCanvas(elevationObj, elevationViewContext, ELEVATION_BACKGROUND);

    addLogo(logo);
    Concepts();
    drawPlan(planObj, planViewContext);
    drawElevation(elevationObj, elevationViewContext);

    // Set the step to .5 each for the Opaque Slider
    document.getElementById("OpaqueSld").step = ".5";
    // register the wall thickness slider
    $("#OpaqueSld").on("change", function () {

        drawPlan(planObj, planViewContext);

        let val = $("#OpaqueSld").val();
        if(val >= 4){
          $("#OpaqueInput").attr("min", "4")
          $("#OpaqueInput").val(val);

          //recalculate the Opaque Thermal Resistance
          calculateOpaqueThermalResistance();
        }
    });

    // Set the step to .5 each for the Opaque Slider
    document.getElementById("windowAreaSld").step = ".1";
    // register the window thickness slider
    $("#windowAreaSld").on("change", function () {
        drawPlan(planObj, planViewContext);

        fillCanvas(elevationObj, elevationViewContext, ELEVATION_BACKGROUND)
        drawElevation(elevationObj, elevationViewContext);

        $("#windowAreaInput").val($("#windowAreaSld").val());
        // Trigger the event
        $("#windowAreaInput").change();
    });

    // register the insulation-color select element
    $("#insulation-color").on("change", function () {
      drawPlan(planObj, planViewContext);

      // recalculate Opaque Thermal Resistance
      calculateOpaqueThermalResistance();
    });
        
    // register the select menu for CHAPTERS
    $("#chapter-option").on("change", function () {
      if ($("#chapter-option").val() == "Insulation") {
        $("#insulation").show();
      }else{
        location.reload();
      }
    });

    // register the Door Thermal Resistance output to the Slider
    $("#doorThermalSld").on("change", function() {

      $("#doorThermalOut").val($("#doorThermalSld").val());
      // Trigger the change event
      $("#doorThermalOut").change();
    });

    //register the Window Thermal Resistance output to the Slider
    $("#windowThermalResSld").on("change", function() {

      $("#windowThermalResOut").val($("#windowThermalResSld").val());
      //call the change event
      $("#windowThermalResOut").change();
    });

    //recalculate Overall Effective Thermal Resistance when Opaque Thermal Resistance output is changed
    $("#opaqueThermalOut").change(function() {
      //recalculate Overall Effective Thermal Resistance
      calculateEffectiveOverallThermalRes();
    });
    //recalculate Overall Effective Thermal Resistance when Window Area output is changed
    $("#windowAreaInput").change(function() {
      //recalculate Overall Effective Thermal Resistance
      calculateEffectiveOverallThermalRes();
    });
    //recalculate Overall Effective Thermal Resistance when Door Thermal Resistance output is changed
    $("#doorThermalOut").change(function() {
      //recalculate Overall Effective Thermal Resistance
      calculateEffectiveOverallThermalRes();
    });
    //recalculate Overall Effective Thermal Resistance when Window Thermal Resistance output is changed
    $("#windowThermalResOut").change(function() {
      //recalculate Overall Effective Thermal Resistance
      calculateEffectiveOverallThermalRes();
    });
}

// controls the options of the Concept menu
function Concepts(){
  // concept hide options
    $("#localCondations").hide();
    $("#annual-energy").hide();
    $("#drafts-ventilation").hide();
    $("#insulation-heatloss").hide();
    $("#materials-Insulation").hide();
    $("#environmental-impact").hide();

  // show options when selected
  $("#concepts-options").on("change", function () {
    if ($("#concepts-options").val() == "1") {
      $("#localCondations").show();
    }
    if ($("#concepts-options").val() == "2") {
      $("#annual-energy").show();
    }
    if ($("#concepts-options").val() == "3") {
      $("#drafts-ventilation").show();
    }
    if ($("#concepts-options").val() == "4") {
      $("#insulation-heatloss").show();
    }
    if ($("#concepts-options").val() == "5") {
      $("#materials-Insulation").show();
    }
    if ($("#concepts-options").val() == "6") {
      $("#environmental-impact").show();
    }
  });

}

function drawPlan(obj, ctx) {
  let thickness = $("#OpaqueSld").val() * SCL;
  let color = $("#insulation-color").val();

  //Drawing the Walls with color
  //OUTER WALL (BLUE)
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
  if (size > 0) {
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

function fillCanvas(obj, context, color){
  context.clearRect(0, 0, obj.width, obj.height);
  context.beginPath();
  context.fillStyle = color;
  context.fillRect(0, 0, obj.width, obj.height);
}

function addLogo(context){
  context.font = "40px Georgia";
  context.strokeStyle = "blue";
  context.strokeText("PROJECT", 30, 50);
  
  context.font = "60px Georgia";
  context.strokeText("Xs",210, 50);
}

function calculateOpaqueThermalResistance(){
  let opaqueConstruction = $("#insulation-color").val();
  let opaqueThickness = $("#OpaqueInput").val();

  var calc = 2 + (opaqueThickness - 2) * OPAQUE_CONSTRUCTION[opaqueConstruction];

  $("#opaqueThermalOut").val(calc);
  // Trigger the event
  $("#opaqueThermalOut").change();
}

function calculateEffectiveOverallThermalRes(){
  let windowArea = $("#windowAreaInput").val();
  let opaqueThermal = $("#opaqueThermalOut").val();
  let windowThermal = $("#windowThermalResOut").val();
  let doorThermal = $("#doorThermalOut").val();

  var calc = 1 / ( ( (800 - windowArea)/opaqueThermal + windowArea/windowThermal + 20/doorThermal) / 820 );
  console.log(windowArea, opaqueThermal, windowThermal, doorThermal);
  $("#effectiveOverallThermalResOut").val(calc.toFixed(0));
}

function calculateAnnualEnergy(){
  let effectiveOverallThermaRes = $("#effectiveOverallThermalResOut").val();
  let places = $("#placesWithDegreeDays").val()

  
}