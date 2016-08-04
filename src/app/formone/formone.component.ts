import { Component, OnInit} from '@angular/core';
import { AngularFire, FirebaseListObservable} from 'angularfire2';
import { Router,ActivatedRoute} from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'app-formone',
  templateUrl: 'formone.component.html',
  styleUrls: [ 'formone.component.css']
})

export class FormoneComponent implements OnInit {
  formonePage:FirebaseListObservable<any>;
  public id:string;
  public sub;
  constructor(public af: AngularFire, private _router:Router, private _route:ActivatedRoute) {
    this.formonePage=af.database.list('/page_formOne');
  }

  ngOnInit() {
    this.sub=this._route.params.subscribe(params => {
      this.id=params['id'];
    })
  }

  submit(ans:number){
    this.formonePage.push({TurkID:this.id,"1+1":ans});
    let link=["/chat/"+this.id];
    this._router.navigate(link);
  }
}
