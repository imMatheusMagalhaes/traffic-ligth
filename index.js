const { interpret } = require("xstate");
const { carMachine } = require("./carMachine");

const carService = interpret(carMachine);

carService.start();

carService.onTransition((state) => {
  console.log("car: " + state.value);
});
