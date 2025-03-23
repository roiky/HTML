

function whatToPrint(){
  return "check";
}

function drawtoHTML(text){
  document.getElementById("drawPlace").innerHTML = text;
}

drawtoHTML(whatToPrint());