import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../../core/services/user.service';
import { NotificationService } from '../../../../core/services/notification/notification.service';

@Component({
  selector: 'app-register',
  imports: [RouterLink, CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register implements OnInit{

  // Forms
  user! : FormGroup;
  userDetail! : FormGroup;

  constructor(private userService : UserService, private fb : FormBuilder, private notifcationService : NotificationService) {}
  ngOnInit() : void
  {
    this.user = this.fb.group({
      username : ['', [Validators.required, Validators.minLength(6)]],
      passwordHash : ['', [Validators.required, Validators.minLength(8)]],
      role : ['dev'],

      userDetails: this.fb.group({
        firstName : ['', Validators.required],
        lastName : ['', Validators.required],
        email : ['', [Validators.required, Validators.email]]
      }),

      confirmPassword: [{value:'', disabled: true}]
    },{
      validators: this.passwordMatchValidator    
    })

    this.preventTypingConfirmPassword();
  }
  
  preventTypingConfirmPassword()
  {
    this.user.get('passwordHash')?.valueChanges.subscribe(value=>{
      const confirmPassword = this.user.get('confirmPassword');

      if (value && value.trim() !== '') {
        confirmPassword?.enable();
      } else {
        confirmPassword?.disable();
        confirmPassword?.reset();
      }

    });
  }
  get userDetails() {
    return this.user.get('userDetails') as FormGroup;
  }
  
  passwordMatchValidator(form: any)
  {
    const password = form.get('passwordHash')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;

    if(password !== confirmPassword)
      return  { passwordMisMatch: true}

    else
      return null;
  }
  onRegister()
  {
    
    let userData = this.user;
    
    if(this.user.valid)
    {
      this.userService.createUser(userData.value).subscribe({
        next: (response)=>
        {
          console.log('Result ',response);
        },
        error: (err)=>{
          if(err.status === 409)
            this.notifcationService.error(err.error.message);
          
          else if(err.status === 200)
          {
             this.notifcationService.success("Successfully Registered");
             this.user.reset();
          }
           
        }
      })
    }
    else
    {
      this.user.markAllAsTouched();
    }
  }
}
