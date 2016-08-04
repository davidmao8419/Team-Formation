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
    alert("Thanks for waiting!!! Can start the experiment now:)")
    this.sub=this._route.params.subscribe(params => {
      this.id=params['id'];
    })
    this.chatroom.forEach(element => {
        
        this.roomUsers=element.length;
        
    });
  }

  submit(ans:number){
   this.formonePage.push({TurkID:this.id,"1+1":ans});
    /*
    let link=["/chat/"+this.id];
    this._router.navigate(link);
    */
    let check:number=1;
    let rnum=1;
    let assignNum:number;
    let tag:number=0;
    console.log("this.roomUsers")
    console.log(this.roomUsers)
    this.chatroom.forEach(element => {
      //console.log(element)
      //console.log(check)
      if(check==(this.roomUsers+1) && tag==0){
        console.log("in the if ")
        
        element.forEach(user=>{
          console.log(user.TurkID)
          console.log(user.roomNum)
          console.log("***************************")
          
          if(user.TurkID==this.id){
            if(user.roomNum==1){
              let link=["/chat/"+this.id];
              this._router.navigate(link);
            }
            else if(user.roomNum==2){
              let link=["/chat2/"+this.id];
              this._router.navigate(link);
            }
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
}
