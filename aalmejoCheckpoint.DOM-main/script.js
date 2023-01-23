/* eslint-disable no-alert */

/**************
 *   SLICE 1
 **************/

function updateCoffeeView(coffeeQty) {
  document.getElementById("coffee_counter").innerText = coffeeQty;
}

function clickCoffee(data) {
  // increment the coffee count
  data.coffee++;
  // update the view to reflect the new coffee count
  updateCoffeeView(data.coffee);
  // render any producers that may be affected by the coffee count
  renderProducers(data);
}

/**************
 *   SLICE 2
 **************/

// unlockProducers, takes in two arguments: an array of producers and a coffeeCount.
const unlockProducers = (producers, coffeeCount) =>
  producers.forEach(
    (producer) => (producer.unlocked = coffeeCount >= producer.price / 2)
  );

const getUnlockedProducers = ({ producers }) =>
  producers.filter(({ unlocked }) => unlocked);

//makeDisplayNameFromId takes in a string, which is assumed to be an id
const makeDisplayNameFromId = (id) =>
  id
    .split("_")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");

// You shouldn't need to edit this function-- its tests should pass once you've written makeDisplayNameFromId
function makeProducerDiv(producer) {
  const containerDiv = document.createElement("div");
  containerDiv.className = "producer";
  const displayName = makeDisplayNameFromId(producer.id);
  const currentCost = producer.price;
  const html = `
  <div class="producer-column">
    <div class="producer-title">${displayName}</div>
    <button type="button" id="buy_${producer.id}">Buy</button>
  </div>
  <div class="producer-column">
    <div>Quantity: ${producer.qty}</div>
    <div>Coffee/second: ${producer.cps}</div>
    <div>Cost: ${currentCost} coffee</div>
  </div>
  `;
  containerDiv.innerHTML = html;
  return containerDiv;
}

// Function to delete all child nodes of a given parent node
function deleteAllChildNodes(parent) {
  // Remove each child from the parent node using the removeChild() method
  Array.from(parent.childNodes).forEach((child) => parent.removeChild(child));
}

// Function to render producers
function renderProducers(data) {
  // Select the producer container element using querySelector()
  const producerContainer = document.querySelector("#producer_container");

  // Unlock the producers using the unlockProducers() function, passing in the producers and coffee data
  unlockProducers(data.producers, data.coffee);

  // Delete all existing child nodes of the producer container element
  deleteAllChildNodes(producerContainer);

  // Get the unlocked producers using the getUnlockedProducers() function
  getUnlockedProducers(data)
    .map((producer) => makeProducerDiv(producer))
    .forEach((containerDiv) => {
      producerContainer.append(containerDiv);
    });
}

/**************
 *   SLICE 3
 **************/

// data and a producerId and returns the producer object from the data with a matching id
function getProducerById(data, producerId) {
  return data.producers.find((producer) => producer.id === producerId);
}

// data and a producerId and returns a boolean indicating if the data has enough coffee to afford the producer
function canAffordProducer(data, producerId) {
  return data.coffee >= getProducerById(data, producerId).price ? true : false;
}

function updateCPSView(cps) {
  // your code here
}

function updatePrice(oldPrice) {
  // your code here
}

function attemptToBuyProducer(data, producerId) {
  // your code here
}

function buyButtonClick(event, data) {
  // your code here
}

function tick(data) {
  // your code here
}

/*************************
 *  Start your engines!
 *************************/

// You don't need to edit any of the code below
// But it is worth reading so you know what it does!

// So far we've just defined some functions; we haven't actually
// called any of them. Now it's time to get things moving.

// We'll begin with a check to see if we're in a web browser; if we're just running this code in node for purposes of testing, we don't want to 'start the engines'.

// How does this check work? Node gives us access to a global variable /// called `process`, but this variable is undefined in the browser. So,
// we can see if we're in node by checking to see if `process` exists.
if (typeof process === "undefined") {
  // Get starting data from the window object
  // (This comes from data.js)
  const data = window.data;

  // Add an event listener to the giant coffee emoji
  const bigCoffee = document.getElementById("big_coffee");
  bigCoffee.addEventListener("click", () => clickCoffee(data));

  // Add an event listener to the container that holds all of the producers
  // Pass in the browser event and our data object to the event listener
  const producerContainer = document.getElementById("producer_container");
  producerContainer.addEventListener("click", (event) => {
    buyButtonClick(event, data);
  });

  // Call the tick function passing in the data object once per second
  setInterval(() => tick(data), 1000);
}
// Meanwhile, if we aren't in a browser and are instead in node
// we'll need to exports the code written here so we can import and
// Don't worry if it's not clear exactly what's going on here;
// We just need this to run the tests in Mocha.
else if (process) {
  module.exports = {
    updateCoffeeView,
    clickCoffee,
    unlockProducers,
    getUnlockedProducers,
    makeDisplayNameFromId,
    makeProducerDiv,
    deleteAllChildNodes,
    renderProducers,
    updateCPSView,
    getProducerById,
    canAffordProducer,
    updatePrice,
    attemptToBuyProducer,
    buyButtonClick,
    tick,
  };
}
