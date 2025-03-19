// Promise
// Object that describe completion or rejection of async operation
// Success - resolve => then
// Failed - reject => catch
// Pending

const carsArr = ["volvo", "mazda", "bmw", "kia"];

function getCars(price) {
  return new Promise((resolve, reject) => {
    if (!price || typeof price !== "number") reject("missing price");
    else {
      setTimeout(() => {
        resolve(carsArr);
      }, 5 * 1000);
    }
  });
}

getCars(125)
  .then((msg) => console.log(msg))
  .catch((msg) => console.log(msg));
getCars("1")
  .then((msg) => console.log(msg))
  .catch((msg) => console.log(msg));
