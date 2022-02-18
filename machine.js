const { createMachine, interpret, send } = require('xstate');

// Stateless machine definition
// machine.transition(...) is a pure function used by the interpreter.
const trafficLightMachine = createMachine({
    id: 'trafficLight',
    initial: 'closed',
    states: {
        open: {
            actions: ['switch'],
            on: { TOGGLE: 'attention' }
        },
        closed: { on: { TOGGLE: 'open' } },
        attention: { on: { TOGGLE: 'closed' } },
    }
}, {
    guards: {

    },
    actions: {
        switch: (ctx, evt) => {
            send(ctx, "TOGGLE")
        }
    },
    services: {

    }
});


// Machine instance with internal state
const toggleService = interpret(trafficLightMachine)
    .onTransition((state) => console.log(state.value))
    .start();
// => 'inactive'

toggleService.send('TOGGLE');
// => 'active'

toggleService.send('TOGGLE');
// => 'inactive'