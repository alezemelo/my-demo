import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  imports: [],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent {
  constructor(private router: Router, private authService: AuthService) { }
  login(){
    this.authService.login().subscribe(
      success => {
        if(success){
          console.log('Login successful!');
        }
      }
    );

  }
  
  logout(){
    this.authService.logout();
  }
      
  navigate(){
    this.router.navigate(['/users']);
  }
}
