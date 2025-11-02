import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import 'zone.js';  
bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));

  console.log("IS this running client side ? or in ithe Node js which bootstraping the application ?")