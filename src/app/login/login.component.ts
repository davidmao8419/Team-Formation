import { Component, OnInit, HostListener } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';
import { Router } from '@angular/router';
import { Observable} from 'rxjs/Rx';
import { DatePipe } from'@angular/common';
mport {CORE_DIRECTIVES} from '@angular/common';
import {FORM_DIRECTIVES} from '@angular/forms';
import {BUTTON_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';
import {MD_INPUT_DIRECTIVES} from '@angular2-material/input';
@Component({
  moduleId: module.id,
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css'],
  directives: [BUTTON_DIRECTIVES, CORE_DIRECTIVES, FORM_DIRECTIVES,MD_INPUT_DIRECTIVES]
})

export class LoginComponent implements OnInit {
  public singleModel:string = '1';
  public radioModel:string = 'Middle';
  public checkModel:any = {left: false, middle: true, right: false};
  users_num:  FirebaseObjectObservable<any>;
  testing:    FirebaseObjectObservable<any>;
  items:      FirebaseListObservable<any>;
  users:      FirebaseListObservable<any>;
  dropout:    FirebaseListObservable<any>;
  login_page: FirebaseListObservable<any>;

  public users_number: number=0;
  public user_account: string;
  public err_message: string=null;
  public sub;
  public time;

  constructor(public  af: AngularFire, private _router:Router) {
    this.users_num  = af.database.object('/users_num',{preserveSnapshot:true}); //todo: why preserve?
    this.items      = af.database.list('/items');
    this.users      = af.database.list('/onlineUsers',{preserveSnapshot:true});
    this.testing    = af.database.object('/testing');
    this.dropout    = af.database.list('/dropout');
    this.login_page = af.database.list('/page_login');
    Observable.interval(1000).map((x)=>x+1).subscribe((x)=>{this.time=x;}) //count the time (sec)
  }

  @HostListener('window:unload',['$event'])
  unloadHandler(event){
      this.dropout.push({page:1});
  }

  //solve the users_number problem
  ngOnInit(){
    this.users_num.subscribe(snapshot=>{ //todo: i think this can be | asyc
      this.users_number=snapshot.val().users_num
    })
  }

  save(newName: string) {
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
      this.user_account=account+'@gmail.com';
        let tag=0;//for checking if there is already existing account in the firebase
        this.sub=this.users.subscribe(snapshots=>{
          snapshots.forEach(snapshot=>{if(snapshot.val().TurkID==account){tag=1;}})

          if(tag==0 ){
            let t=this.time+' sec';
            this.login_page.push({TurkID:account,time:t});//save time
            tag=1;
             let address:string;
            address='/wait/'+account;
            let link=[address];
            this._router.navigate(link);
          }
          else{
            tag=1;
            this.err_message="Join Fail.Account Already Online";
            this.sub.unsubscribe();
          }

        })
  }
 cancle(){
   this.sub.unsubscribe();
 }
}
