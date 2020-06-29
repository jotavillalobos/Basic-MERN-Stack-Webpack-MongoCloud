import React from 'react';
import { render } from 'react-dom';
import App from './app';
import M from 'materialize-css'
import 'materialize-css/dist/css/materialize.min.css';
import "regenerator-runtime/runtime.js";

render(<App/>, document.getElementById('app'));