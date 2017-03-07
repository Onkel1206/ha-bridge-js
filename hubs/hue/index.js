//import {HueApi, lightState} from "node-hue-api";
const hue = require('node-hue-api');
const lightState = hue.lightState;
//https://www.developers.meethue.com/documentation/core-concepts
const HueApi = hue.HueApi;

//const findHubs = () => {};
//const getFields = () => {};  // for the UI, what fields are required

const displayResult = function(location, result){
  console.log(location, ':\n', JSON.stringify(result, null, ' ')); //eslint-disable-line no-console
};

const hostname = "192.168.1.77";
const username = "YGg7xeGD6w7Rbw7sLa8Y2qxv3rITaSM02Fym5NHk";

const api = new HueApi(hostname, username);

// api.getConfig(function(err, config) {
//     if (err) displayResult('getConfig:ERR', err);
//     displayResult('getConfig', config);
// });

api.lights(function(err, lights) {
    if (err) displayResult('lights:ERR', err);
    //displayResult('lights', lights);
    displayResult('lights', lights.lights.map(x => ({name: x.name, id: x.id, on: x.state.on, brightness: x.state.bri})));
});

//const state = lightState.create().on().white(500, 100).colorLoop();
const state = lightState.create().on();
//const state = lightState.create().on();
const deviceId = 1;
api.setLightState(deviceId, {"on":true,"bri":255,"sat":255,"hue":12750}, function(err, lights) {
    if (err) displayResult('setLightState:ERR', err);
    displayResult('setLightState', lights);
});

// ----------------------------------------------------------------------------
// let thisHub = {};

// const create = () => {};
// const getDevices = () => {};

// const execute = ({hub, deviceId, state, callback}) => {
//   const ip = hub.url.split('//')[1].split(':')[0];
//   const port = hub.url.split('//')[1].split(':')[1];
//   const brightness = Number(state);
//   const status = isNaN(brightness) ? state : 'on';
//   const zone = deviceId;

//   if (!thisHub[hub.hubId]) thisHub[hub.hubId] = create({ip, port});
//   thisHub[hub.hubId][status]({zone, brightness, callback});
// };

// const Hue = {
//   name: "Hue",
//   urlPattern: "{base}/milights/{deviceId}/{state}"
// };

// Hue.getDevices = getDevices;
// Hue.updateUrl = undefined;
// Hue.execute = execute;

// module.exports = Hue;
