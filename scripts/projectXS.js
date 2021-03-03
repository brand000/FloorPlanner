function setup(){
    var c = document.getElementById("logo");
    var ctx = c.getContext("2d");
    
    var gradient = ctx.createLinearGradient(0, 0, 170, 0);
    gradient.addColorStop("0", "magenta");
    gradient.addColorStop("0.5" ,"blue");
    gradient.addColorStop("1.0", "red");
    
    // Fill with gradient
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 5;
    ctx.strokeRect(20, 20, 150, 100);
}

// function doBoxes(Obj, context){
//    context.clearRect(0, 0, obj.width, obj.height);
//    context.beginPath();
//   context.rect(0, 0, 600, 400);
//   context.stroke();

// }