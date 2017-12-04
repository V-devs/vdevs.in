import { Component, OnInit, Injectable } from '@angular/core';
import {AngularFireAuthModule, AngularFireAuth} from 'angularfire2/auth';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import "rxjs/add/operator/retry";
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  public name:string="";
  public email:string="";
  public mobile:string="";
  public purpose:number=-1;
  public validName:boolean = true;
  public validEmail:boolean = true;
  public validMobile:boolean = true;
  public validPurpose:boolean = true;
  public results;
  public status:any;
  constructor(private http: HttpClient){}
  ngOnInit() {
  }
  async submitToServer(body): Promise<Object>{
    const response = this.http.post('https://vdevs-api.herokuapp.com/add-contact-data',body
    ,{headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
}).retry(2).toPromise();
    return response;
  }
  async submitForm(){
    this.validName = true?/^[a-zA-Z]+([\s.]{1}[a-zA-Z]+)*$/.test(this.name):false;
    this.validEmail = true?/^[^@]+\@[^.@]+\.[^@.]+$/.test(this.email):false;
    this.mobile = this.mobile.replace(/[\s-()]/g,'');
    this.validMobile=true?/^\+?\d{10,12}$/.test(this.mobile):false;
    this.validPurpose = true?this.purpose>=0 && this.purpose<5:false;
    
    if(this.validName && this.validEmail && this.validMobile && this.validPurpose){
      const body = {'name':this.name, 'email': this.email, 'mobile': this.mobile, 'purpose':this.purpose};

      
      // setTimeout(()=>{
      //   if(Object.keys(this.status)[0]=='success'){
      //     alert('success');
      //   }
      // },1000);
      jQuery('form.contact-form').fadeOut(200);
      jQuery('div.contact-success').fadeIn(200);
      this.status = await this.submitToServer(body);
      setTimeout(()=>{
        console.log(this.status);
        if(Object.keys(this.status)[0]=='success'){
          jQuery('.circle-loader').toggleClass('load-complete');
          jQuery('.checkmark').toggle();
          jQuery('.success').toggle();
        }
        else{
          jQuery('div.contact-success').fadeOut(200);
          jQuery('form.contact-form').fadeIn(200);
        }
      },2000);
  //     this.http.post('http://localhost:8080/add-contact-data',body
  //     ,{headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
  // }).subscribe(
  //       data => {console.log(data);}
  //     );
    }
  }

}
