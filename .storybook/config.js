import { configure, addParameters } from "@storybook/react";
//import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";

// pick all stories.js files within the src/ folder
const req = require.context("../__tests__", true, /stories\.js$/);

//addParameters({ viewport: { viewports: INITIAL_VIEWPORTS } });
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
