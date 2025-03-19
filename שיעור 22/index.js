let pageColor = "white";

function changeColor() {
  if (pageColor === "white") {
    $("body").css("background-color", "black");
    pageColor = "black";
  } else if (pageColor === "black") {
    $("body").css("background-color", "white");
    pageColor = "white";
  }
}

const colorInterval = setInterval(changeColor, 5000);

setTimeout(() => {
  clearInterval(colorInterval);
}, 20 * 1000);
