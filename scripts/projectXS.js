// projectXS.js
// LINKED to index.html

const SCALE = 1.5;
const INSULATION_COLOR = ["#D2CBCD", "#D2CBCD", "#e8e5e4", "#fec7d4", "#fdfaaa"];
var planHeight; 
var planWidth;
var elevationWidth;
var elevationHeight;
function setup(){
    const logo_Obj = document.getElementById("logo");
    const logo = logo_Obj.getContext("2d");
    
    const plan = document.getElementById("plan-view");
    const elevation = document.getElementById("elevation-view");

    const planViewContext = plan.getContext("2d");
    const elevationViewContext = elevation.getContext("2d");
    
    fillCanvas(plan, planViewContext, "#D2CBCD");
    fillCanvas(elevation, elevationViewContext, "#A3BCFD");

    addLogo(logo);

    // Declaration
    planHeight = plan.height;
    planWidth= plan.width;
    elevationWidth = elevation.width;
    elevationHeight = elevation.height;
    

    planViewContext.clearRect(0, 0, planWidth, planHeight);
    elevationViewContext.clearRect(0, 0, elevationWidth, elevationHeight);

    // slab
    // planViewContext.fillStyle = "#d2cbcd"; // concrete porch
    // planViewContext.fillRect(0, 0, planWidth, planHeight);
    // outer skin
    planViewContext.fillStyle = "#3104fb"; // blue
    planViewContext.fillRect(0, 0, planWidth, planHeight);
    // interior of wall
    planViewContext.fillStyle = INSULATION_COLOR[0]; // concrete
    planViewContext.fillRect(
        1 * SCALE,
        1 * SCALE,
        planWidth - 2 * SCALE,
        planHeight - 2 * SCALE
    );
    // inner skin
    planViewContext.fillStyle = "#3104fb"; // blue
    planViewContext.fillRect(
        2 * SCALE,
        2 * SCALE,
        planWidth - 4 * SCALE,
        planHeight - 4 * SCALE
    );
    // interior floor
    planViewContext.fillStyle = "#d2cbcd"; // concrete
    planViewContext.fillRect(
        3 * SCALE,
        3 * SCALE,
        planWidth - 6 * SCALE,
        planHeight - 6 * SCALE
    );

    // elevation wall
    elevationViewContext.fillStyle = "#a3bcfd"; // light blue to give hint
    elevationViewContext.fillRect(0, 0, elevationWidth, elevationHeight);

    // set initial slider value 2" output for display purposes only
    $("#OpaqueInput").val(2);

    // set initial slider value 0" output for display purposes only
    $("#windowAreaInput").val(0);

    processInput();

    // register the wall thickness slider
    $("#OpaqueSld").on("change", function () {
        processInput();
    });

    // register the window thickness slider
    $("#windowAreaSld").on("change", function () {
        processInput();
    });

    $("#insulation-color").on("change", function () {
        processInput();
    });
        
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

function processInput() {
  let construction = $("#OpaqueSld").val();
  let window = $("#windowAreaSld").val();
  let insulationColor = $("#insulation-color").val();

  draw(construction, window, insulationColor);
}

function draw(construction, window, insulationColor) {
  const plan = document.getElementById("plan-view");
  const elevation = document.getElementById("elevation-view");

  const planViewContext = plan.getContext("2d");
  const elevationViewContext = elevation.getContext("2d");

  // Declaration
  planHeight = plan.height;
  planWidth= plan.width;
  elevationWidth = elevation.width;
  elevationHeight = elevation.height;

  planViewContext.clearRect(0, 0, planWidth, planHeight);
  elevationViewContext.clearRect(0, 0, elevationWidth, elevationHeight);

  // update slider value outputs for display purposes only
  $("#OpaqueInput").val(construction);
  $("#windowAreaInput").val(window * 2);

  // PLAN *********************************************************************
  // slab
  planViewContext.fillStyle = "#d2cbcd"; // concrete porch
  planViewContext.fillRect(0, 0, planWidth, planHeight);
  // outer skin
  planViewContext.fillStyle = "#3104fb"; // blue
  planViewContext.fillRect(0, 0, planWidth, planHeight);
  // interior of wall
  planViewContext.fillStyle = INSULATION_COLOR[insulationColor]; // concrete
  planViewContext.fillRect(1, 1, planWidth - 2, planHeight - 2);
  // inner skin
  planViewContext.fillStyle = "#3104fb";
  planViewContext.fillRect(
    construction * SCALE + Number(2),
    construction * SCALE + Number(2),
    planWidth - 2 * construction * SCALE - 4,
    planHeight - 2 * construction * SCALE - 4
  );
  // interior floor
  planViewContext.fillStyle = "#d2cbcd"; // concrete
  planViewContext.fillRect(
    construction * SCALE + Number(3),
    construction * SCALE + Number(3),
    planWidth - 2 * construction * SCALE - 6,
    planHeight - 2 * construction * SCALE - 6
  );

  // plan wipe with concrete
  planViewContext.fillStyle = "#d2cbcd"; // concrete
  planViewContext.fillRect(
    100 * SCALE - window * SCALE,
    planHeight - construction * SCALE - 2 * SCALE,
    2 * window * SCALE,
    construction * SCALE + Number(2 * SCALE)
  );
  // plan window
  planViewContext.fillStyle = "#07ebf8"; // glass
  planViewContext.fillRect(
    100 * SCALE - window * SCALE,
    planHeight - construction * SCALE - 2 * SCALE,
    2 * window * SCALE,
    construction * SCALE + Number(2 * SCALE)
  );

  // plan window inner threshold
  planViewContext.setLineDash([4, 3]);
  planViewContext.beginPath();
  planViewContext.moveTo(
    100 * SCALE - window * SCALE,
    planHeight - construction * SCALE - 2 * SCALE
  );
  planViewContext.lineTo(
    100 * SCALE + Number(window * SCALE),
    planHeight - construction * SCALE - 2 * SCALE
  );
  planViewContext.stroke();
  // plan window outer threshold
  planViewContext.beginPath();
  planViewContext.moveTo(100 * SCALE - window * SCALE, planHeight);
  planViewContext.lineTo(100 * SCALE + Number(window * SCALE), planHeight);
  planViewContext.stroke();

  // ELEVATION ****************************************************************
  // elevation wall
  elevationViewContext.fillStyle = "#a3bcfd"; // light blue to give hint
  elevationViewContext.fillRect(0, 0, elevationWidth, elevationHeight);

  // elevation window 4 x 3 aspect ratio
  // elevation window frame
  // black
  elevationViewContext.fillStyle = "black";
  elevationViewContext.fillRect(
    100 * SCALE - window * SCALE,
    25 * SCALE,
    2 * window * SCALE + Number(6),
    Number(((3 * window) / 2) * SCALE) + Number(4)
  );
  // blue
  elevationViewContext.fillStyle = "#a3bcfd";
  elevationViewContext.fillRect(
    101 * SCALE - window * SCALE,
    26 * SCALE,
    2 * window * SCALE + Number(3),
    Number(((3 * window) / 2) * SCALE) + Number(1)
  );
  // elevation window
  // black
  elevationViewContext.fillStyle = "black";
  elevationViewContext.fillRect(
    102 * SCALE - window * SCALE,
    27 * SCALE,
    2 * window * SCALE,
    Number(((3 * window) / 2) * SCALE) - 2
  );
  // blue
  elevationViewContext.fillStyle = "#a3bcfd";
  elevationViewContext.fillRect(
    103 * SCALE - window * SCALE,
    28 * SCALE,
    2 * window * SCALE - 2,
    Number(((3 * window) / 2) * SCALE) - 4
  );

  // Door of Elevation*************************************************************
  // Dimensions
  const Height_Rect = 100;
  const Width_Rect = 50;
  

  // postions
  const x_rect = 250;
  const y_rect = 50;

  // Parent Rectangle
  elevationViewContext.strokeStyle = "black";
  elevationViewContext.rect(x_rect, y_rect, Width_Rect, Height_Rect);
  elevationViewContext.stroke();

  // Child Rectangle
  elevationViewContext.strokeStyle = "black";
  elevationViewContext.rect(x_rect +3, y_rect +3, Width_Rect -7, Height_Rect -7);
  elevationViewContext.stroke();

  // Door knob
  elevationViewContext.beginPath();
  elevationViewContext.strokeStyle = "black";
  elevationViewContext.arc(x_rect + 40, y_rect +50,3, 0, 2 * Math.PI);
  elevationViewContext.stroke();
  
}
