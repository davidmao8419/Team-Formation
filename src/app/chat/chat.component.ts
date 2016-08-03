import { Component, OnInit ,AfterViewInit} from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Subject } from 'rxjs/Subject';
import { FlexchatMessageComponent} from '../flexchat-message';
import { InputBarComponent } from '../input-bar';
import {ROUTER_DIRECTIVES } from '@angular/router';
import { Router,ActivatedRoute} from '@angular/router';
import { Observable} from 'rxjs/Rx';
import { DatePipe } from'@angular/common';

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
export class ChatComponent implements OnInit,AfterViewInit {

  title = 'app works!';
  messages: FirebaseListObservable<any[]>;
  messagesAll: FirebaseListObservable<any[]>;
  limitSubject = new Subject<number>();
  public sub;
  public id:string;
  public time:number=0;
  public test_time:number=30;
  public test;
  public timeStamp;
  constructor(public af: AngularFire, private _router:Router, private _route:ActivatedRoute) {
    // this.messages = af.database.list('/messages', {
    //   query: {
    //     limitToLast: this.limitSubject
    //   }
    // });
     //Observable.interval(1000).map((x)=>x+1).subscribe((x)=>{this.time=x;}) //count the time (sec)
    this.messages = af.database.list('/messages')

  }

  ngOnInit() {
    
    this.sub=this._route.params.subscribe(params => {
      this.id=params['id'];
    })
    //this.test=Observable.interval(1000).map((test_time=30)=>test_time-1).subscribe((test_time)=>{this.time=test_time;
    this.test=Observable.interval(1000).map((x)=>x+1).subscribe((x)=>{this.time=x;
      /*
      if(this.time>=30){
        //console.log("time over 30")
        this.test.unsubscribe();
        let link=["/formtwo/"+this.id];
        this._router.navigate(link);
      }*/
    }) //count the time (sec)
  }
   ngAfterViewInit(){
    // Observable.interval(1000).map((x)=>x+1).subscribe((x)=>{this.time=x;}) //count the time (sec)
     //if(this.time>=30){
     //  console.log("over 30 sec now")
       //let link=["/formtwo/"+this.id];
       //this._router.navigate(link);
     //}
    // console.log(this.time)
   }
  
  addMessage(text) {
    //var datePipe=new DatePipe();
    //this.timeStamp=datePipe.transform(userdate,)
    this.messages.push({ text: text,TurkID:this.id })
    // this.messages.push({ text: text });
  }

  changeLimit(limit) {
    this.limitSubject.next(parseInt(limit, 10));
  }

  nextPage(){
    let link=["/formtwo/"+this.id];
    this._router.navigate(link);
  }

}
