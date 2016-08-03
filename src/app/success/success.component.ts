import { Component, OnInit , OnDestroy,HostListener,AfterViewInit,OnChanges,Input,ViewChild} from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseAuth, FirebaseObjectObservable} from 'angularfire2';
import {ROUTER_DIRECTIVES } from '@angular/router';
import { Router,ActivatedRoute} from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'app-success',
  templateUrl: 'success.component.html',
  styleUrls: ['success.component.css']
})
export class SuccessComponent implements OnInit {
  public sub;
  public code:string;
  constructor(private _route:ActivatedRoute, private _router:Router, public af:AngularFire) {

  }

  ngOnInit() {
    this.sub=this._route.params.subscribe(params => {
      //let id= +params['id'];
      this.code=params['surveyCode']
      //console.log("in the welcome page this.id=")
      //console.log(this.id);
    })
  }
}
