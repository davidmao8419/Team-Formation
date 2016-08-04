import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable} from 'angularfire2';
import { Router,ActivatedRoute} from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'app-formtwo',
  templateUrl: 'formtwo.component.html',
  styleUrls: ['formtwo.component.css']
})
export class FormtwoComponent implements OnInit {
  formtwoPage:FirebaseListObservable<any>;
  public id:string;
  public sub;
  public random_number:number;

  constructor(public af: AngularFire, private _router:Router, private _route:ActivatedRoute) {
    this.formtwoPage=af.database.list('/page_formTwo');
  }

  ngOnInit() {
    this.sub=this._route.params.subscribe(params => {
      this.id=params['id'];
    })
    this.random_number=Math.ceil(Math.random()*1000000);
  }

  submit(ans:number){
    this.formtwoPage.push({TurkID:this.id,"1+1":ans,"survey code":this.random_number});
    let link=["/success/"+this.random_number];
    this._router.navigate(link);
  }
}
