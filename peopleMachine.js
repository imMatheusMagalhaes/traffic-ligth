const { createMachine } = require("xstate");

const peopleMachine = createMachine({
  id: "peopleMachine",
  initial: "closed",
  states: {
    open: {},
    closed: {},
  },
  on: {
    CHANGE_STATUS: [
      {
        target: ".open",
        cond: (ctx, evt) => {
          return evt.data.peopleStatus === "open";
        },
      },
      {
        target: ".closed",
        cond: (ctx, evt) => {
          return evt.data.peopleStatus === "closed";
        },
      },
    ],
  },
});
module.exports = { peopleMachine };
