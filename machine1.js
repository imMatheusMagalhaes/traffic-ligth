const chalk = require("chalk");
const { createMachine, send, interpret } = require("xstate");

const trafficLightMachine = createMachine({
  id: "trafficLight",
  type: "parallel",
  states: {
    carTrafficLight: {
      initial: "open",
      states: {
        open: {
          entry: [
            send({
              type: "peopleChange",
              data: { peopleStatus: "closed" },
            }),
          ],
          after: {
            2000: "attention",
          },
        },
        closed: {
          entry: [
            send({
              type: "peopleChange",
              data: { peopleStatus: "open" },
            }),
          ],
          after: {
            2000: "open",
          },
        },
        attention: {
          entry: [
            send({
              type: "peopleChange",
              data: { peopleStatus: "closed" },
            }),
          ],
          after: {
            1000: "closed",
          },
        },
      },
    },
    peopleTrafficLight: {
      initial: "closed",
      states: {
        open: {},
        closed: {},
      },
      on: {
        peopleChange: [
          {
            target: ".open",
            cond: (ctx, evt) => {
              console.log("open " + evt.data.peopleStatus);
              return evt.data.peopleStatus === "open";
            },
          },
          {
            target: ".closed",
            cond: (ctx, evt) => {
              console.log("closed " + evt.data.peopleStatus);
              return evt.data.peopleStatus === "closed";
            },
          },
        ],
      },
    },
  },
});

const service = interpret(trafficLightMachine);
service.start();
service.onTransition((state) => {
  if (state.value.carTrafficLight === "open") {
    console.clear();
    console.log("VEICULOS");
    console.log("---");
    console.log(` ${chalk.green("O")}`);
    console.log("---");
    console.log(" O");
    console.log("---");
    console.log(" O");
    console.log("---");
    console.log("PESSOAS");
    console.log("---");
    console.log(" O");
    console.log("---");
    console.log(` ${chalk.red("O")}`);
    console.log("---");
  } else if (state.value.carTrafficLight === "closed") {
    console.clear();
    console.log("VEICULOS");
    console.log("---");
    console.log(" O");
    console.log("---");
    console.log(" O");
    console.log("---");
    console.log(` ${chalk.red("O")}`);
    console.log("---");
    console.log("PESSOAS");
    console.log("---");
    console.log(` ${chalk.green("O")}`);
    console.log("---");
    console.log(" O");
    console.log("---");
  } else {
    console.clear();
    console.log("VEICULOS");
    console.log("---");
    console.log(" O");
    console.log("---");
    console.log(` ${chalk.yellow("O")}`);
    console.log("---");
    console.log(" O");
    console.log("---");
    console.log("PESSOAS");
    console.log("---");
    console.log(" O");
    console.log("---");
    console.log(` ${chalk.red("O")}`);
    console.log("---");
  }
});
