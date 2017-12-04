import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  goto(id){
    jQuery('html, body').stop().animate({
        scrollTop: jQuery('#'+id).offset().top
    }, 1000);
  }
}
