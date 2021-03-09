// projectXS.js
// LINKED to index.html

function setup(){
    var c = document.getElementById("logo");
    var ctx = c.getContext("2d");
    const planViewObj = document.getElementById("plan-view");
    const elevationViewObj = document.getElementById("elevation-view");

    const planViewCon = planViewObj.getContext("2d");
    const elevationViewCon = elevationViewObj.getContext("2d");
    
    fillCanvas(planViewObj, planViewCon, "#D2CBCD");
    fillCanvas(elevationViewObj, elevationViewCon, "#A3BCFD");

    var gradient = ctx.createLinearGradient(0, 0, 170, 0);
    gradient.addColorStop("0", "magenta");
    gradient.addColorStop("0.5" ,"blue");
    gradient.addColorStop("1.0", "red");
    
    // Fill with gradient
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 5;
    ctx.strokeRect(20, 20, 150, 100);
}

function fillCanvas(obj, context, color){
    context.clearRect(0, 0, obj.width, obj.height);
    context.beginPath();
    context.fillStyle = color;
    context.fillRect(0, 0, obj.width, obj.height);
}