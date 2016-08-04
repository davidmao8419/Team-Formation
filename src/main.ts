import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { AppComponent, environment } from './app/';
import { FIREBASE_PROVIDERS, defaultFirebase, AngularFire } from 'angularfire2';
import {provideRouter} from '@angular/router';
import {Route} from '@angular/router';
import {LoginComponent} from './app/login';
import {ChatComponent} from './app/chat';
import {ChatTwoComponent} from './app/chat-two';
import {WaitComponent} from './app/wait';
import {FormoneComponent} from './app/formone';
import {FormtwoComponent} from './app/formtwo';
import {SuccessComponent} from './app/success';
import {disableDeprecatedForms, provideForms} from '@angular/forms';
export const AppRoutes: Route[]=[
    { path:'', component: AppComponent},
    { path:'login', component:LoginComponent},
    { path:'chat/:id', component: ChatComponent},
    { path:'wait/:id', component: WaitComponent},
    { path:'formone/:id', component:FormoneComponent},
    { path:'formtwo/:id',component:FormtwoComponent},
    { path:'success/:surveyCode', component:SuccessComponent},
    { path:'chat2/:id', component:ChatTwoComponent}
];

if (environment.production) {
  enableProdMode();
}

bootstrap(AppComponent,[
  FIREBASE_PROVIDERS,
  // Initialize Firebase app  
  defaultFirebase({
    apiKey: "AIzaSyCT8F19LrA7YWbq8ZtBK0kruwDlg_P_muk",
    authDomain: "test-c214a.firebaseapp.com",
    databaseURL: "https://test-c214a.firebaseio.com",
    storageBucket: "test-c214a.appspot.com"
  }),
  provideRouter(AppRoutes),
  disableDeprecatedForms(),
  provideForms()
]);

