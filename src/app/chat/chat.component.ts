import { Component, OnInit} from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Subject } from 'rxjs/Subject';
import { FlexchatMessageComponent} from '../flexchat-message';
import { InputBarComponent } from '../input-bar';
import { Router,ActivatedRoute} from '@angular/router';
import { Observable} from 'rxjs/Rx';

@Component({
  moduleId: module.id,
  selector: 'app-chat',
  templateUrl: 'chat.component.html',
  styleUrls: ['chat.component.css'],
  directives: [
    FlexchatMessageComponent,
    InputBarComponent
  ]
})
export class ChatComponent implements OnInit {

  messages: FirebaseListObservable<any[]>;
  limitSubject = new Subject<number>();
  public sub;
  public id:string;
  public time:number=0;
  public test;

  constructor(public af: AngularFire, private _router:Router, private _route:ActivatedRoute) {
    this.messages = af.database.list('/messages')
  }

  ngOnInit() {
    this.sub=this._route.params.subscribe(params => {this.id=params['id']});
    this.test=Observable.interval(1000).map((x)=>x+1).subscribe((x)=>{this.time=x});
  }

  addMessage(text) {
    this.messages.push({ text: text,TurkID:this.id })
  }

  changeLimit(limit) {
    this.limitSubject.next(parseInt(limit, 10));
  }

  nextPage(){
    let link=["/formtwo/"+this.id];
    this._router.navigate(link);
  }
}
