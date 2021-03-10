// projectXS.js
// LINKED to index.html

<<<<<<< HEAD
const SCALE = 1.5;
// const INSULATION_COLOR = ["#D2CBCD", "#D2CBCD", "#e8e5e4", "#fec7d4", "#fdfaaa"];
// <<<<<<< HEAD
// var planHeight; 
// var planWidth;
// var elevationWidth;
// var elevationHeight;
// =======
const WALL_COLOR = "#3104fb";
const WINDOW_COLOR = "#07ebf8";
const ELEVATION_BACKGROUND = "#A3BCFD";
=======
const SCL = 1.35;
const INSULATION_COLOR = ["#D2CBCD", "#D2CBCD", "#e8e5e4", "#fec7d4", "#fdfaaa"];
>>>>>>> parent of 93c386f... recreated Javascript, everything seems to be working fine now.

// >>>>>>> 93c386f5d0f4d4dbdc23541908e5bdd7c870a179
function setup(){
    const logo_Obj = document.getElementById("logo");
    const logo = logo_Obj.getContext("2d");
    
    const plan = document.getElementById("plan-view");
    const elevation = document.getElementById("elevation-view");

<<<<<<< HEAD
// <<<<<<< HEAD
//     const planViewContext = plan.getContext("2d");
//     const elevationViewContext = elevation.getContext("2d");
    
//     fillCanvas(plan, planViewContext, "#D2CBCD");
//     fillCanvas(elevation, elevationViewContext, "#A3BCFD");

//     addLogo(logo);

//     // Declaration
//     planHeight = plan.height;
//     planWidth= plan.width;
//     elevationWidth = elevation.width;
//     elevationHeight = elevation.height;
    

//     planViewContext.clearRect(0, 0, planWidth, planHeight);
//     elevationViewContext.clearRect(0, 0, elevationWidth, elevationHeight);

//     // slab
//     // planViewContext.fillStyle = "#d2cbcd"; // concrete porch
//     // planViewContext.fillRect(0, 0, planWidth, planHeight);
//     // outer skin
//     planViewContext.fillStyle = "#3104fb"; // blue
//     planViewContext.fillRect(0, 0, planWidth, planHeight);
//     // interior of wall
//     planViewContext.fillStyle = INSULATION_COLOR[0]; // concrete
//     planViewContext.fillRect(
//         1 * SCALE,
//         1 * SCALE,
//         planWidth - 2 * SCALE,
//         planHeight - 2 * SCALE
//     );
//     // inner skin
//     planViewContext.fillStyle = "#3104fb"; // blue
//     planViewContext.fillRect(
//         2 * SCALE,
//         2 * SCALE,
//         planWidth - 4 * SCALE,
//         planHeight - 4 * SCALE
//     );
//     // interior floor
//     planViewContext.fillStyle = "#d2cbcd"; // concrete
//     planViewContext.fillRect(
//         3 * SCALE,
//         3 * SCALE,
//         planWidth - 6 * SCALE,
//         planHeight - 6 * SCALE
//     );

//     // elevation wall
//     elevationViewContext.fillStyle = "#a3bcfd"; // light blue to give hint
//     elevationViewContext.fillRect(0, 0, elevationWidth, elevationHeight);
// =======
    const planViewContext = planObj.getContext("2d");
    const elevationViewContext = elevationObj.getContext("2d");

    //Hide insulation chapter
    $("#insulation").hide();
// >>>>>>> 93c386f5d0f4d4dbdc23541908e5bdd7c870a179
=======
    const planViewContext = plan.getContext("2d");
    const elevationViewContext = elevation.getContext("2d");
    
    fillCanvas(plan, planViewContext, "#D2CBCD");
    fillCanvas(elevation, elevationViewContext, "#A3BCFD");

    addLogo(logo);

    planViewContext.clearRect(0, 0, plan.width, plan.height);
    elevationViewContext.clearRect(0, 0, elevation.width, elevation.height);

    // slab
    // planViewContext.fillStyle = "#d2cbcd"; // concrete porch
    // planViewContext.fillRect(0, 0, plan.width, plan.height);
    // outer skin
    planViewContext.fillStyle = "#3104fb"; // blue
    planViewContext.fillRect(0, 0, plan.width, plan.height);
    // interior of wall
    planViewContext.fillStyle = INSULATION_COLOR[0]; // concrete
    planViewContext.fillRect(
        1 * SCL,
        1 * SCL,
        plan.width - 2 * SCL,
        plan.height - 2 * SCL
    );
    // inner skin
    planViewContext.fillStyle = "#3104fb"; // blue
    planViewContext.fillRect(
        2 * SCL,
        2 * SCL,
        plan.width - 4 * SCL,
        plan.height - 4 * SCL
    );
    // interior floor
    planViewContext.fillStyle = "#d2cbcd"; // concrete
    planViewContext.fillRect(
        3 * SCL,
        3 * SCL,
        plan.width - 6 * SCL,
        plan.height - 6 * SCL
    );

    // elevation wall
    elevationViewContext.fillStyle = "#a3bcfd"; // light blue to give hint
    elevationViewContext.fillRect(0, 0, elevation.width, elevation.height);
>>>>>>> parent of 93c386f... recreated Javascript, everything seems to be working fine now.

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
<<<<<<< HEAD
// <<<<<<< HEAD
// }

// function processInput() {
//   let construction = $("#OpaqueSld").val();
//   let window = $("#windowAreaSld").val();
//   let insulationColor = $("#insulation-color").val();

//   draw(construction, window, insulationColor);
// }

// function draw(construction, window, insulationColor) {
//   const plan = document.getElementById("plan-view");
//   const elevation = document.getElementById("elevation-view");

//   const planViewContext = plan.getContext("2d");
//   const elevationViewContext = elevation.getContext("2d");

//   // Declaration
//   planHeight = plan.height;
//   planWidth= plan.width;
//   elevationWidth = elevation.width;
//   elevationHeight = elevation.height;

//   planViewContext.clearRect(0, 0, planWidth, planHeight);
//   elevationViewContext.clearRect(0, 0, elevationWidth, elevationHeight);

//   // update slider value outputs for display purposes only
//   $("#OpaqueInput").val(construction);
//   $("#windowAreaInput").val(window * 2);

//   // PLAN *********************************************************************
//   // slab
//   planViewContext.fillStyle = "#d2cbcd"; // concrete porch
//   planViewContext.fillRect(0, 0, planWidth, planHeight);
//   // outer skin
//   planViewContext.fillStyle = "#3104fb"; // blue
//   planViewContext.fillRect(0, 0, planWidth, planHeight);
//   // interior of wall
//   planViewContext.fillStyle = INSULATION_COLOR[insulationColor]; // concrete
//   planViewContext.fillRect(1, 1, planWidth - 2, planHeight - 2);
//   // inner skin
//   planViewContext.fillStyle = "#3104fb";
//   planViewContext.fillRect(
//     construction * SCALE + Number(2),
//     construction * SCALE + Number(2),
//     planWidth - 2 * construction * SCALE - 4,
//     planHeight - 2 * construction * SCALE - 4
//   );
//   // interior floor
//   planViewContext.fillStyle = "#d2cbcd"; // concrete
//   planViewContext.fillRect(
//     construction * SCALE + Number(3),
//     construction * SCALE + Number(3),
//     planWidth - 2 * construction * SCALE - 6,
//     planHeight - 2 * construction * SCALE - 6
//   );

//   // plan wipe with concrete
//   planViewContext.fillStyle = "#d2cbcd"; // concrete
//   planViewContext.fillRect(
//     100 * SCALE - window * SCALE,
//     planHeight - construction * SCALE - 2 * SCALE,
//     2 * window * SCALE,
//     construction * SCALE + Number(2 * SCALE)
//   );
//   // plan window
//   planViewContext.fillStyle = "#07ebf8"; // glass
//   planViewContext.fillRect(
//     100 * SCALE - window * SCALE,
//     planHeight - construction * SCALE - 2 * SCALE,
//     2 * window * SCALE,
//     construction * SCALE + Number(2 * SCALE)
//   );

//   // plan window inner threshold
//   planViewContext.setLineDash([4, 3]);
//   planViewContext.beginPath();
//   planViewContext.moveTo(
//     100 * SCALE - window * SCALE,
//     planHeight - construction * SCALE - 2 * SCALE
//   );
//   planViewContext.lineTo(
//     100 * SCALE + Number(window * SCALE),
//     planHeight - construction * SCALE - 2 * SCALE
//   );
//   planViewContext.stroke();
//   // plan window outer threshold
//   planViewContext.beginPath();
//   planViewContext.moveTo(100 * SCALE - window * SCALE, planHeight);
//   planViewContext.lineTo(100 * SCALE + Number(window * SCALE), planHeight);
//   planViewContext.stroke();

//   // ELEVATION ****************************************************************
//   // elevation wall
//   elevationViewContext.fillStyle = "#a3bcfd"; // light blue to give hint
//   elevationViewContext.fillRect(0, 0, elevationWidth, elevationHeight);

//   // elevation window 4 x 3 aspect ratio
//   // elevation window frame
//   // black
//   elevationViewContext.fillStyle = "black";
//   elevationViewContext.fillRect(
//     100 * SCALE - window * SCALE,
//     25 * SCALE,
//     2 * window * SCALE + Number(6),
//     Number(((3 * window) / 2) * SCALE) + Number(4)
//   );
//   // blue
//   elevationViewContext.fillStyle = "#a3bcfd";
//   elevationViewContext.fillRect(
//     101 * SCALE - window * SCALE,
//     26 * SCALE,
//     2 * window * SCALE + Number(3),
//     Number(((3 * window) / 2) * SCALE) + Number(1)
//   );
//   // elevation window
//   // black
//   elevationViewContext.fillStyle = "black";
//   elevationViewContext.fillRect(
//     102 * SCALE - window * SCALE,
//     27 * SCALE,
//     2 * window * SCALE,
//     Number(((3 * window) / 2) * SCALE) - 2
//   );
//   // blue
//   elevationViewContext.fillStyle = "#a3bcfd";
//   elevationViewContext.fillRect(
//     103 * SCALE - window * SCALE,
//     28 * SCALE,
//     2 * window * SCALE - 2,
//     Number(((3 * window) / 2) * SCALE) - 4
//   );

//   // Door of Elevation*************************************************************
//   // Dimensions
//   const Height_Rect = 100;
//   const Width_Rect = 50;
  

//   // postions
//   const x_rect = 250;
//   const y_rect = 50;

//   // Parent Rectangle
//   elevationViewContext.strokeStyle = "black";
//   elevationViewContext.rect(x_rect, y_rect, Width_Rect, Height_Rect);
//   elevationViewContext.stroke();

//   // Child Rectangle
//   elevationViewContext.strokeStyle = "black";
//   elevationViewContext.rect(x_rect +3, y_rect +3, Width_Rect -7, Height_Rect -7);
//   elevationViewContext.stroke();

//   // Door knob
//   elevationViewContext.beginPath();
//   elevationViewContext.strokeStyle = "black";
//   elevationViewContext.arc(x_rect + 40, y_rect +50,3, 0, 2 * Math.PI);
//   elevationViewContext.stroke();
  
// }
// =======
}
// >>>>>>> 93c386f5d0f4d4dbdc23541908e5bdd7c870a179
=======
}

function processInput() {
  let construction = $("#windowAreaSld").val();
  let window = $("#windowAreaSld").val();
  let insulationColor = $("#insulation-color").val();

  draw(construction, window, insulationColor);
}

function draw(construction, window, insulationColor) {
  const plan = document.getElementById("plan-view");
  const elevation = document.getElementById("elevation-view");

  const planViewContext = plan.getContext("2d");
  const elevationViewContext = elevation.getContext("2d");

  planViewContext.clearRect(0, 0, plan.width, plan.height);
  elevationViewContext.clearRect(0, 0, elevation.width, elevation.height);

  // update slider value outputs for display purposes only
  $("#OpaqueInput").val(construction);
  $("#windowAreaInput").val(window * 2);

  // PLAN *********************************************************************
  // slab
  planViewContext.fillStyle = "#d2cbcd"; // concrete porch
  planViewContext.fillRect(0, 0, plan.width, plan.height);
  // outer skin
  planViewContext.fillStyle = "#3104fb"; // blue
  planViewContext.fillRect(0, 0, plan.width, plan.height);
  // interior of wall
  planViewContext.fillStyle = INSULATION_COLOR[insulationColor]; // concrete
  planViewContext.fillRect(1, 1, plan.width - 2, plan.height - 2);
  // inner skin
  planViewContext.fillStyle = "#3104fb";
  planViewContext.fillRect(
    construction * SCL + Number(2),
    construction * SCL + Number(2),
    plan.width - 2 * construction * SCL - 4,
    plan.height - 2 * construction * SCL - 4
  );
  // interior floor
  planViewContext.fillStyle = "#d2cbcd"; // concrete
  planViewContext.fillRect(
    construction * SCL + Number(3),
    construction * SCL + Number(3),
    plan.width - 2 * construction * SCL - 6,
    plan.height - 2 * construction * SCL - 6
  );

  // plan wipe with concrete
  planViewContext.fillStyle = "#d2cbcd"; // concrete
  planViewContext.fillRect(
    100 * SCL - window * SCL,
    plan.height - construction * SCL - 2 * SCL,
    2 * window * SCL,
    construction * SCL + Number(2 * SCL)
  );
  // plan window
  planViewContext.fillStyle = "#07ebf8"; // glass
  planViewContext.fillRect(
    100 * SCL - window * SCL,
    plan.height - construction * SCL - 2 * SCL,
    2 * window * SCL,
    construction * SCL + Number(2 * SCL)
  );

  // plan window inner threshold
  planViewContext.setLineDash([4, 3]);
  planViewContext.beginPath();
  planViewContext.moveTo(
    100 * SCL - window * SCL,
    plan.height - construction * SCL - 2 * SCL
  );
  planViewContext.lineTo(
    100 * SCL + Number(window * SCL),
    plan.height - construction * SCL - 2 * SCL
  );
  planViewContext.stroke();
  // plan window outer threshold
  planViewContext.beginPath();
  planViewContext.moveTo(100 * SCL - window * SCL, plan.height);
  planViewContext.lineTo(100 * SCL + Number(window * SCL), plan.height);
  planViewContext.stroke();

  // ELEVATION ****************************************************************
  // elevation wall
  elevationViewContext.fillStyle = "#a3bcfd"; // light blue to give hint
  elevationViewContext.fillRect(0, 0, elevation.width, elevation.height);

  // elevation window 4 x 3 aspect ratio
  // elevation window frame
  // black
  elevationViewContext.fillStyle = "black";
  elevationViewContext.fillRect(
    100 * SCL - window * SCL,
    25 * SCL,
    2 * window * SCL + Number(6),
    Number(((3 * window) / 2) * SCL) + Number(4)
  );
  // blue
  elevationViewContext.fillStyle = "#a3bcfd";
  elevationViewContext.fillRect(
    101 * SCL - window * SCL,
    26 * SCL,
    2 * window * SCL + Number(3),
    Number(((3 * window) / 2) * SCL) + Number(1)
  );
  // elevation window
  // black
  elevationViewContext.fillStyle = "black";
  elevationViewContext.fillRect(
    102 * SCL - window * SCL,
    27 * SCL,
    2 * window * SCL,
    Number(((3 * window) / 2) * SCL) - 2
  );
  // blue
  elevationViewContext.fillStyle = "#a3bcfd";
  elevationViewContext.fillRect(
    103 * SCL - window * SCL,
    28 * SCL,
    2 * window * SCL - 2,
    Number(((3 * window) / 2) * SCL) - 4
  );
}
>>>>>>> parent of 93c386f... recreated Javascript, everything seems to be working fine now.
