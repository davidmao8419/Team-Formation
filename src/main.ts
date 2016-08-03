import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { AppComponent, environment } from './app/';
import { FIREBASE_PROVIDERS, defaultFirebase, AngularFire } from 'angularfire2';
import {provideRouter} from '@angular/router';
import {Route} from '@angular/router';
import {LoginComponent} from './app/login';
import {ChatComponent} from './app/chat';
import {WaitComponent} from './app/wait';
import {FormoneComponent} from './app/formone';
import {FormtwoComponent} from './app/formtwo';
import {SuccessComponent} from './app/success';

export const AppRoutes: Route[]=[
    { path:'', component: AppComponent},
    { path:'login', component:LoginComponent},
    { path:'chat/:id', component: ChatComponent},
    { path:'wait/:id', component: WaitComponent},
    { path:'formone/:id', component:FormoneComponent},
    { path:'formtwo/:id',component:FormtwoComponent},
    { path:'success/:surveyCode', component:SuccessComponent}
];

if (environment.production) {
  enableProdMode();
}

bootstrap(AppComponent,[
  FIREBASE_PROVIDERS,
  // Initialize Firebase app
  defaultFirebase({
    apiKey: "AIzaSyCdFW2Uclc2AqA69PkMhLq6IIuuRn3CkwY",
    authDomain: "chat-5ed4b.firebaseapp.com",
    databaseURL: "https://chat-5ed4b.firebaseio.com",
    storageBucket: "chat-5ed4b.appspot.com"
  }),
  provideRouter(AppRoutes)
]);

