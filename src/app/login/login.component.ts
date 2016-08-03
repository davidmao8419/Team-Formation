import { Component, OnInit, OnDestroy, Inject, HostListener } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseAuth, FirebaseObjectObservable,FirebaseUrl} from 'angularfire2';
import {ROUTER_DIRECTIVES } from '@angular/router';
import { Router,ActivatedRoute} from '@angular/router';
import { Observable} from 'rxjs/Rx';
import { DatePipe } from'@angular/common';

@Component({
  moduleId: module.id,
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})

export class LoginComponent implements OnInit, OnDestroy {
items: FirebaseListObservable<any>;
  users: FirebaseListObservable<any>;
  users_num: FirebaseObjectObservable<any>;
  testing: FirebaseObjectObservable<any>;
  dropout: FirebaseListObservable<any>;
  login_page: FirebaseListObservable<any>;
  public users_number: number=0;
  public user_account:string;
  public del_num:number=0;
  public random_number:number=0;
  public err_message:string=null;
  public check:string=null;
  public sub;
  public child_num:number=0;
  public time;


  constructor(public af: AngularFire, private _router:Router) {
     this.users_num = af.database.object('/users_num',{preserveSnapshot:true});
     this.items = af.database.list('/items');
     this.users = af.database.list('/onlineUsers',{preserveSnapshot:true});
    this.testing = af.database.object('/testing');
    this.dropout= af.database.list('/dropout');
    this.login_page=af.database.list('/page_login');

      Observable.interval(1000).map((x)=>x+1).subscribe((x)=>{this.time=x;}) //count the time (sec)
  }

  @HostListener('window:unload',['$event'])
  unloadHandler(event){
      this.dropout.push({page:1});
      //this.testing.set({test:'AAAAAAAAA'});
  }

  //solve the users_number problem
  ngOnInit(){
    this.users_num.subscribe(snapshot=>{
      //console.log("in the ngOnInit")
      this.users_number=snapshot.val().users_num

    })

    //var userDate;
    //var datePipe=new DatePipe();
    //this.time=datePipe.transform(userDate,'dd/MM/yyyy');
    //console.log("userDate")
    //console.log(this.time)
 }
  ngOnDestroy(){

  }

  save(newName: string) {
    //this.item.set({ name: newName });
    this.items.push({ name: newName});
  }
  update(key: string, newSize: string) {
    this.items.update(key,{ size: newSize });
  }
  deleteItem(key:string){
    this.items.remove(key);
  }
  deleteEverything(){
    this.items.remove();
  }


  login(account:string){
      //console.log("before login");
      this.user_account=account+'@gmail.com';
  //    if(account==accountSec){
       // console.log("login success")
       // console.log(account)
       // console.log(accountSec)
        //      this.af.auth.login({email:account,password:password});

   //   this.users_num.subscribe(snapshot=>{
        //console.log("before")
        //console.log(snapshot.val().users_num)
   //     this.users_number=snapshot.val().users_num

//        this.users_number = this.users_number+1 @@@@@@@@@@@@@@@@@@@@
//        this.users_num.update({users_num:this.users_number}) @@@@@@@@@@@@@@@@@@@@@@
        //console.log("this.users_number:")
        //console.log(this.users_number)
   //   });
//   this.users_number=this.users_number+1;
   //   if(this.af.auth.getAuth().uid!=null){
//        console.log(this.af.auth.getAuth().uid)
        let tag=0;//for checking if there is already existing account in the firebase

        this.sub=this.users.subscribe(snapshots=>{
         // console.log(snapshots)
          snapshots.forEach(snapshot=>{
           // console.log(snapshot.val().account)
           // console.log(snapshot.key)
            if(snapshot.val().TurkID==account){
              tag=1;
            }
           // console.log("tag")
           // console.log(tag)
          })
          //console.log("tag")
          //console.log(tag)
          if(tag==0 ){
            //this.users.push({account:account})
            let t=this.time+' sec';
            console.log("t:")
            console.log(t);
            this.login_page.push({TurkID:account,time:t});//save time
            tag=1;
             let address:string;
            address='/wait/'+account;
            //console.log(address);
            let link=[address];
            this._router.navigate(link);
          }
          else{
            //console.log("account already exist!")
            tag=1;
            this.err_message="Join Fail.Account Already Online";
            this.sub.unsubscribe();
            //let link2=['/fail'];
            //this._router.navigate(link2)
          }
        })

        //console.log("about to add users")
        //console.log("this.users[1].val()")
        //console.log(this.users[1].val().account)
       // this.users.push({ account:account});


//        const ref=this.users._ref;
//        if(ref.onDisconnect()){
//          this.testing.set({test:'offline!!!'});
//      }
        //console.log(this.users_number)
   //   }

      //this.users.subscribe(snapshots => {

      //  snapshots.forEach(snapshot => {
      //        this.users_num++;
      //      if(snapshot.val().uid==this.af.auth.getAuth().uid){
              //console.log("in the if")
              //console.log(snapshot.key)
              //console.log(snapshot.val())
      //     }
            //console.log("in the if")
            //console.log(snapshot.key)
            //console.log(snapshot.val().uid)
       // });
      //console.log(snapshots.key)
      //});
/*
      let address:string;
      address='/welcome/'+account;
      //console.log(address);
      let link=[address];
      this._router.navigate(link);
//    }
      /*
      else{
        //console.log("Not the same account. Input again")
        this.err_message="Not the same account. Input again";
        this.check="haha"
      }
*/
  }
 cancle(){
   this.sub.unsubscribe();
 }
  /*Not using right now*/
  signIn(account:string,password:string){
//    this.af.auth.createUser({email:account,password:password});
  }
 /*Not using right now*/
  signOut(){

    this.users.subscribe(snapshots => {
      snapshots.forEach(snapshot => {
        console.log(this.user_account)
        if(snapshot.val().TurkID==this.user_account){
          this.users.remove(snapshot.key);
          this.del_num++;
        //this.users_number=this.users_number-1;
        //console.log(snapshot.val().account)
        //console.log(snapshot.key)
        }
      });
    })
    console.log(this.del_num)
//    this.af.auth.logout();

    //promise=>(console.log("out success"));


    this.users_number=this.users_number-1;

    //console.log(this.af.auth.getAuth());
    //this.users_num.subscribe(snapshot=>{
    //  this.users_number=snapshot.val().users_num
    //  this.users_number = this.users_number-1
    //});
    //if(this.users_number!=0){
      this.users_num.update({users_num:this.users_number});
    //}
    //console.log(this.af.auth.getAuth());
    //this.af.auth.getAuth().uid=null;
    //console.log(this.af.auth)
  }

  title = 'app works!';



}
