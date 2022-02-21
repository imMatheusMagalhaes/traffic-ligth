const { createMachine, send, interpret } = require("xstate");
const { peopleMachine } = require("./peopleMachine");

const peopleService = interpret(peopleMachine);

const initPeopleMachine = () => {
  peopleService.start();
  return peopleService.machine;
};

const carMachine = createMachine({
  id: "carMachine",
  initial: "open",
  invoke: {
    id: "peopleMachine",
    src: initPeopleMachine,
  },
  states: {
    open: {
      entry: [
        send(
          {
            type: "CHANGE_STATUS",
            data: { peopleStatus: "closed" },
          },
          {
            to: "peopleMachine",
          }
        ),
      ],
      after: {
        4000: "attention",
      },
    },
    attention: {
      entry: [
        send(
          {
            type: "CHANGE_STATUS",
            data: { peopleStatus: "closed" },
          },
          {
            to: "peopleMachine",
          }
        ),
      ],
      after: {
        2000: "closed",
      },
    },
    closed: {
      entry: [
        send(
          {
            type: "CHANGE_STATUS",
            data: { peopleStatus: "open" },
          },
          {
            to: "peopleMachine",
          }
        ),
      ],
      after: {
        4000: "open",
      },
    },
  },
});
peopleService.onTransition(({ value }) => console.log("people: " + value));
module.exports = { carMachine };
