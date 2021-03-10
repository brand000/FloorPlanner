// projectXS.js
// LINKED to index.html

const SCALE = 1.5;
const INSULATION_COLOR = ["#D2CBCD", "#D2CBCD", "#e8e5e4", "#fec7d4", "#fdfaaa"];
var planHeight; 
var planWidth;
var elevationWidth;
var elevationHeight;
const WALL_COLOR = "#3104fb";
const WINDOW_COLOR = "#07ebf8";
const ELEVATION_BACKGROUND = "#A3BCFD";

function setup(){
    const logo_Obj = document.getElementById("logo");
    const logo = logo_Obj.getContext("2d");
    
    const planObj = document.getElementById("plan-view");
    const elevationObj = document.getElementById("elevation-view");

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

    //Hide insulation chapter
    $("#insulation").hide();

    //Initialize numbers for the inputs
    $("#OpaqueInput").val(2);
    $("#windowAreaInput").val(0);
    
    //Clear the canvas and fill with the background color
    fillCanvas(planObj, planViewContext, INSULATION_COLOR[0]);
    fillCanvas(elevationObj, elevationViewContext, ELEVATION_BACKGROUND);

    addLogo(logo);
    
    drawPlan(planObj, planViewContext);
    drawElevation(elevationObj, elevationViewContext);

    // register the wall thickness slider
    $("#OpaqueSld").on("change", function () {
        drawPlan(planObj, planViewContext);
        $("#OpaqueInput").val($("#OpaqueSld").val());
    });

    // register the window thickness slider
    $("#windowAreaSld").on("change", function () {
        drawPlan(planObj, planViewContext);

        fillCanvas(elevationObj, elevationViewContext, ELEVATION_BACKGROUND)
        drawElevation(elevationObj, elevationViewContext);

        $("#windowAreaInput").val($("#windowAreaSld").val());
    });

    // register the insulation-color select element
    $("#insulation-color").on("change", function () {
      drawPlan(planObj, planViewContext);
    });
        
    // register the select menu for CHAPTERS
    $("#chapter-option").on("change", function () {
      if ($("#chapter-option").val() == "Insulation") {
        $("#insulation").show();
      }else{
        location.reload();
      }
    });
}

function drawPlan(obj, ctx) {
  let thickness = $("#OpaqueSld").val();
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
  let size = $("#windowAreaSld").val() * 2;
  let x = (225 - size * SCL) / 2;

  if (size != 0) {
    ctx.fillStyle = WINDOW_COLOR;
    ctx.fillRect(
      x,
      obj.height - 48 - t2,
      size * SCL,
      (h1 - h2) / 2 + 2
    );
    //Draw dotted lines
    ctx.beginPath();
    ctx.lineWidth = "2";
    ctx.setLineDash([4,3]);
    ctx.strokeStyle = "black";
    ctx.moveTo(x + 1, obj.height - 48 - t2 + 1);
    ctx.lineTo(225 + 1 - x, obj.height - 48 - t2 + 1);
    ctx.stroke();

    ctx.beginPath();
    ctx.lineWidth = "2";
    ctx.setLineDash([4,3]);
    ctx.strokeStyle = "black";
    ctx.moveTo(x + 1, 129);
    ctx.lineTo(225 + 1 -x, 129);
    ctx.stroke();
  }
  
  //Needed to avoid bugs
  ctx.setLineDash([]);
}

function drawElevation(obj, ctx) {
  let size = $("#windowAreaSld").val() * 1.70;

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
      (oX - size * 1.2 * SCL) / 2, 
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
      ((oX - size * 1.2 * SCL) / 2) + 3,  
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

