// projectXS.js
// LINKED to index.html

function setup(){
    const logo_Obj = document.getElementById("logo");
    const logo = logo_Obj.getContext("2d");
    const planViewObj = document.getElementById("plan-view");
    const elevationViewObj = document.getElementById("elevation-view");

    const planViewCon = planViewObj.getContext("2d");
    const elevationViewCon = elevationViewObj.getContext("2d");
    
    fillCanvas(planViewObj, planViewCon, "#D2CBCD");
    fillCanvas(elevationViewObj, elevationViewCon, "#A3BCFD");

    addLogo(logo);

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
