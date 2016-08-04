import { Component, OnInit ,OnDestroy,HostListener,AfterViewInit,OnChanges,Input} from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseAuth, FirebaseObjectObservable} from 'angularfire2';
import {ROUTER_DIRECTIVES } from '@angular/router';
import { Router,ActivatedRoute} from '@angular/router';
import { Observable} from 'rxjs/Rx';

@Component({
  moduleId: module.id,
  selector: 'app-wait',
  templateUrl: 'wait.component.html',
  styleUrls: ['wait.component.css']
})
export class WaitComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  users_num: FirebaseObjectObservable<any>;
  users: FirebaseListObservable<any>;
  testing:FirebaseObjectObservable<any>;
  dropout:FirebaseListObservable<any>;//record how many close the browser
  waiting_page:FirebaseListObservable<any>;
  chatRoom:FirebaseListObservable<any>;
  public sub;
  public a;
  public id:string;
  public users_number:number=0;
  //@Input() users_number:number;
  //@ViewChild("users_num") form;
  public users_left:number=0;
  public check:string=null;
  public child_num:number=0;
  public time:number=0;
  public x:number;

  constructor(private _route:ActivatedRoute, private _router:Router, public af:AngularFire) {
    this.users_num = af.database.object('/users_num',{preserveSnapshot:true});
    this.users= af.database.list('/onlineUsers',{preserveSnapshot:true});
    this.testing = af.database.object('/testing');
    this.dropout = af.database.list('/dropout',{preserveSnapshot:true});
    this.waiting_page=af.database.list('/page_waiting');
    this.chatRoom=af.database.list('/chatRoomAssign');
    Observable.interval(1000).map((x)=>x+1).subscribe((x)=>{this.time=x;}) //count the time (sec)

  }
   /* Handle checking offline if closing the browser or not */
  @HostListener('window:beforeunload',['$event'])
  beforeUnloadHandler(event){
      //this.testing.set({test:'BBBBBBBBBB'});
      alert("Do you really want to close?")
  }
  @HostListener('window:unload',['$event'])
  unloadHandler(event){
      //this.testing.set({test:'AAAAAAAAA'});
//      this.users_number=this.users_number-1; @@@@@@@@@@@@@@@@@@@@@@@
//      this.users_num.update({users_num:this.users_number}); @@@@@@@@@@@@@@@@@@@@@@@@@@@
      this.dropout.push({TurkID:this.id,page:2});
      this.remove_list();
  }

  @HostListener('window:reload',['$event'])
  reloadHandler(event){
    //console.log("in the window reload function")
    this.testing.set({test:'BBBBBBBBB'})
  }

  //@HostListener('window:renavigate')
  ngAfterViewInit(){
    /*this.form.control.valueChanges.subscribe(
      console.log("in the after view init")
    )*/
    //console.log("in the after view")
    //console.log(this.form)
   // console.log("in the after view")
   // console.log(this.users_number)
    //this._router.navigateByUrl(this._router.url);
    this.users_num.subscribe(snapshot=>{
      //console.log("in the afterview snapshot")
      this.users_number=snapshot.val().users_num
      //console.log(snapshot.val().users_num)
      //console.log(this.users_number)

      if(this.users_number>=4){
        //console.log("in welcome you got two people!!!")
     //   this.page2.push({account:this.id,time:this.time});
        this.success();
      }
     // this.users_left=15-this.users_number;
      //console.log("users_number")
      //console.log(this.users_number)

    })
  }
  ngOnInit() {
    Observable.interval(1000).map((x)=>x+1).subscribe((x)=>{this.time=x;})
    //console.log("in the ngOnInit")
    //get the user account
    this.sub=this._route.params.subscribe(params => {
      //let id= +params['id'];
      this.id=params['id']
      //console.log("in the welcome page this.id=")
      //console.log(this.id);
    })

    this.users.push({TurkID:this.id,room:0});

    this.users_num.subscribe(snapshot=>{
      //console.log("in the ngOnInit snapshot")
      this.users_number=snapshot.val().users_num
      //console.log(snapshot.val().users_num)
      //console.log(this.users_number)
      this.users_left=4-this.users_number;




      //console.log("this.users.every.length")
      //console.log(this.users.every.length)
      //console.log("users_number")
      //console.log(this.users_number)
    })



    /*Count the number of child in the list*/
      //console.log("this.users.for each")
      this.users.forEach(element => {
        //console.log(element)
        //console.log(element.length)
        this.child_num=element.length;
         this.users_num.update({users_num:this.child_num});//@@@@@@@@@@@@@@@@
    });

      /*
      let chatRoomNum=Math.ceil(this.users_number/2);
      this.chatRoom.push({TurkID:this.id, roomNum:chatRoomNum});//assign users into different chat rooms
      */
      if(this.users_number>=4){
        //console.log("in welcome you got two people!!!")
        //console.log("in the uesrs number bigger")
        //console.log(this.id)
        //console.log(this.time)
        //this.page2.push({account:this.id,time:0});
        this.time=0;
        this.success();
      }
      else{
        Observable.interval(1000).map((x)=>x+1).subscribe((x)=>{this.time=x;})
        //console.log("in the reload")
        //console.log(this._router.url)


    }

        //this._router.navigateByUrl(this._router.url);
     // location.reload();
     //  let link=['/welcome/'+this.id];
     //   this._router.navigate(link);
     //   console.log("in the reload")


  }

  ngOnDestroy(){
    const ref=this.users._ref;
    if(ref.onDisconnect()){
     // this.testing.set({test:'**********'});
      //this.users_num.subscribe(snapshot=>{
      //this.users_number=snapshot.val().users_num
      //this.users_num.update({users_num:snapshot.val().users_num-1})
      //console.log("users_number")
      //console.log(this.users_number)
    //})

      this.remove_list();

    }
    //console.log("in the ngOnDestroy")
  }

  ngOnChanges(changes){
    //console.log("in the ngOnChenges")
  }


/*
  renavigate(){
    let params: Object={};
    Object.assign(params,this._router.url.params)
  }
*/
  success(){

    //if(this.users_number>=2){
      //Observable.interval(1000).map((x)=>x+1).subscribe((x)=>{this.time=x;})
      let t=this.time+' sec';
      //console.log("t:")
      //console.log(t);

      this.assignUsers2();
      

      this.waiting_page.push({TurkID:this.id,time:t});
      //console.log("in the success")
      //console.log(this.time)
    //}

    let link=['/formone/'+ this.id];
    this._router.navigate(link);
  }

  back(){
    let link=['/login'];
    this._router.navigate(link);
  }

  remove_list(){
      let tag=1;
      let key:string;
    this.sub=this.users.subscribe(snapshots=>{
         // console.log(snapshots)
          snapshots.forEach(snapshot=>{
            //console.log(snapshot.val().account)
            if(snapshot.val().TurkID==this.id){
              tag=0;
              key=snapshot.key;
            }
            //console.log("tag")
            //console.log(tag)
          })
          //console.log("tag")
          //console.log(tag)
          if(tag==0 ){
            this.users.remove(key);
            //this.users.push({account:this.id})
            tag=1;
          }
          else{
            //console.log("account already exist!")
            tag=1;
           // this.sub.unsubscribe();
          }
        })
  }

  assignUsers2(){
    let check:number=1;
    let rnum=1;
    let assignNum:number;
    let tag:number=0;
    this.users.forEach(element => {
      //console.log(element)
      //console.log(check)
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
      
      /*element.forEach(user=>{
        console.log(user)
      })*/
    });
  }
  assignUsers2(){
    let check:number=1;
    let rnum=1;
    let assignNum:number;
    let tag:number=0;
    this.users.forEach(element => {
      //console.log(element)
      //console.log(check)
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
      
      /*element.forEach(user=>{
        console.log(user)
      })*/
    });
  }
  assignUsers(){
   let tag=1;
    let key:string;
    this.a=this.users.subscribe(snapshots=>{
          console.log("snapshots")
          //console.log(snapshots)
          /*
          snapshots.forEach(snapshot=>{
            if(snapshot.val().room==0){
              console.log("n the if")
              console.log(snapshot.val().TurkID)
              snapshot.val().room=1;
            }
         
            
          })
          */
          //this.a.unsubscribe();
          //console.log(tag)
          //console.log(key)
          //tag=tag+1;        
        })
  }

}
