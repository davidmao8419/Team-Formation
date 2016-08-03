import { Component ,OnInit} from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Subject } from 'rxjs/Subject';
import { FlexchatMessageComponent} from './flexchat-message';
import { InputBarComponent } from './input-bar';
import {ROUTER_DIRECTIVES } from '@angular/router';
import { Router} from '@angular/router';


@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [
    FlexchatMessageComponent,
    InputBarComponent,
    ROUTER_DIRECTIVES
  ]
})
export class AppComponent implements OnInit{
   constructor(private _router:Router){

    };
    
    ngOnInit(){
      let link=['/login'];
      this._router.navigate(link);
    }
    
    title='app works!';
}
