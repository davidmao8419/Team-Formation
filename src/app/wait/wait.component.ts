import { Component, OnInit ,OnDestroy, HostListener, AfterViewInit } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';
import { Router,ActivatedRoute} from '@angular/router';
import { Observable} from 'rxjs/Rx';

@Component({
  moduleId: module.id,
  selector: 'app-wait',
  templateUrl: 'wait.component.html',
  styleUrls: ['wait.component.css']
})
export class WaitComponent implements OnInit, AfterViewInit, OnDestroy {
  users_num:    FirebaseObjectObservable<any>;
  testing:      FirebaseObjectObservable<any>;

  users:        FirebaseListObservable<any>;
  dropout:      FirebaseListObservable<any>;//record how many close the browser
  waiting_page: FirebaseListObservable<any>;
  chatRoom:     FirebaseListObservable<any>;

  public sub;
  public a;
  public id:string;
  public users_number:number=0;
  public users_left:number=0;
  public child_num:number=0;
  public time:number=0;
  public x:number;

  constructor(private _route:ActivatedRoute, private _router:Router, public af:AngularFire) {
    this.users_num    = af.database.object('/users_num',{preserveSnapshot:true});
    this.users        = af.database.list('/onlineUsers',{preserveSnapshot:true});
    this.testing      = af.database.object('/testing');
    this.dropout      = af.database.list('/dropout',{preserveSnapshot:true});
    this.waiting_page = af.database.list('/page_waiting');
    this.chatRoom     = af.database.list('/chatRoomAssign');
    Observable.interval(1000).map((x)=>x+1).subscribe((x)=>{this.time=x;}) //count the time (sec)
  }

  @HostListener('window:unload',['$event'])
  unloadHandler(event){ // counts windows closed
      this.dropout.push({TurkID:this.id,page:2});
      this.remove_list();
  }

  ngAfterViewInit(){
    this.users_num.subscribe(snapshot=>{
      this.users_number=snapshot.val().users_num

      if(this.users_number>=4){
        this.success();
      }

    })
  }
  ngOnInit() {
    Observable.interval(1000).map((x)=>x+1).subscribe((x)=>{this.time=x;}); // timer

    this.sub=this._route.params.subscribe(params => { //grabs the mturk id
      this.id=params['id'] //refers to :id in the route
    });

    this.users.push({TurkID:this.id,room:0});

    this.users_num.subscribe(snapshot=>{
      this.users_number=snapshot.val().users_num
      this.users_left=4-this.users_number;
    })

    this.users.forEach(element => {
      this.child_num=element.length;
      this.users_num.update({users_num:this.child_num});
    });

    if(this.users_number>=4){
      this.time=0;
      this.success();
    }
    else{
      Observable.interval(1000).map((x)=>x+1).subscribe((x)=>{this.time=x;})
    }
  }

  ngOnDestroy(){
    const ref=this.users._ref;
    if(ref.onDisconnect()){ //remove them if they hit the back button
      this.remove_list();
    }
  }

  success(){
      let t=this.time+' sec';
      this.assignUsers2();
      this.waiting_page.push({TurkID:this.id,time:t});
      let link=['/formone/'+ this.id];
      this._router.navigate(link);
  }

  back(){
    let link=['/login'];
    this._router.navigate(link);
  }

  remove_list(){ //delete users?
      let tag=1;
      let key:string;
    this.sub=this.users.subscribe(snapshots=>{
              snapshots.forEach(snapshot=>{
            if(snapshot.val().TurkID==this.id){ //todo: is this the current user?
              tag=0;
              key=snapshot.key;
            }});

      if( tag==0 ){
        this.users.remove(key);
        tag=1;
      }
      else{
        tag=1;
      }
    })
  }

  assignUsers2(){
    let check:number=1;
    let rnum=1;
    let assignNum:number;
    let tag:number=0;
    this.users.forEach(element => {
      if(check==5 && tag==0){
        console.log("in the if ")

        element.forEach(user=>{
          console.log("rnum")
          console.log(rnum)
          console.log(user.val().TurkID)
          assignNum=Math.ceil(rnum/2);
          console.log(assignNum)
          console.log("***************************")
          if(user.val().TurkID==this.id){
            this.chatRoom.push({TurkID:user.val().TurkID, roomNum:assignNum});//assign users into different chat rooms
          }
          rnum++;
          tag=1;
        })

      }
      check++;

    });
  }

}
