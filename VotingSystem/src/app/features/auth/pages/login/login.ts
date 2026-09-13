import { Component, OnInit } from '@angular/core';
import { RouterLink, Router } from "@angular/router";
import { UserService } from '../../../../core/services/user.service';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { jwtDecode } from 'jwt-decode';
import { JwtPayload } from '../../../../shared/models/Users';

@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {

  loginForm! : FormGroup;

  constructor(private userService : UserService, private fb : FormBuilder, private router : Router) 
  {
    this.loginForm = this.fb.group({
      username: ['',[Validators.required]],
      password: ['',[Validators.required]]
    });
  }

  ngOnInit(): void 
  {
    
  }

  onLoginUser()
  {
    var loginData = this.loginForm.value;
    
    if(this.loginForm.invalid)
    {
      this.loginForm.markAllAsTouched();
      return;
    }

    else
    {
      this.userService.loginUser(loginData).subscribe({
        next: (response) =>{
          
          if(response.token !== '' && response.message === 'Verified')
          {
            localStorage.setItem('token', response.token);
            this.router.navigate(['/dashboard']);
          }
          
        },
        error : (err) =>
        {
          console.log('Error ',err);
        }
      });
    }
    
  }
}
