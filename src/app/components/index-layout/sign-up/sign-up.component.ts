import { NgIf } from '@angular/common';
import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenticationService } from '../../../core/services';

@Component({
  selector: 'app-sign-up',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    NgIf
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})

export default class SignUpComponent implements OnInit {
  protected submitted = false;
  protected form!: FormGroup
  private emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  private fb = inject(FormBuilder);
  private authService = inject(AuthenticationService);

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', [
        Validators.required,
        Validators.maxLength(30)
      ]],
      surname: ['', [
        Validators.required,
        Validators.maxLength(30)
      ]],
      email: ['', [
        Validators.required,
        Validators.pattern(this.emailRegex)
      ]],
      username: ['', [
        Validators.required,
        Validators.maxLength(30)
      ]],
      password: ['', [
        Validators.required,
        Validators.maxLength(30)
      ]],
      role: ['']
    }); 
  }

  protected signUp(): void {
    (document.getElementById('msg') as HTMLElement).classList.remove("success");
    (document.getElementById('msg') as HTMLElement).classList.remove("error");
    (document.getElementById('msg') as HTMLElement).textContent = '';
    this.submitted = true;

    if (this.form.valid) {
      this.form.patchValue({
        role: {
          id: 2,
          name: 'ROLE_CUSTOMER'
        }
      })

      this.authService.register(this.form.value).subscribe({
        next: (user) => {
          if (user) {
            (document.getElementById('msg') as HTMLElement).classList.add("success");
            (document.getElementById('msg') as HTMLElement).textContent = "User created successfully!";
          } 
          else {
            (document.getElementById('msg') as HTMLElement).classList.add("error");
            (document.getElementById('msg') as HTMLElement).textContent = "Username already exists!";
          }
        },
        error: (err) => console.error(err)
      });

      this.submitted = false;
    }
  }
}
