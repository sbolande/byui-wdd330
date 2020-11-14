import { getJSON, getLocation } from './utilities.js';
import QuakesController from './QuakesController.js';

new QuakesController(document.getElementById('quakeList')).init();