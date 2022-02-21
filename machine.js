const { createMachine } = require("xstate");
const { carMachine } = require("./carMachine");
const { peopleMachine } = require("./peopleMachine");

const machine = createMachine({
  id: "machine",
  states: {
    car: {
      invoke: {
        src: carMachine,
        id: "car",
      },
    },
    people: {
      invoke: {
        src: peopleMachine,
        id: "car",
      },
    },
  },
});
