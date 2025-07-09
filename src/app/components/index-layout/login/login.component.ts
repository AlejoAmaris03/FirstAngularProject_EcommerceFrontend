import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { AuthenticationService } from '../../../core/services';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    NgIf
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export default class LoginComponent implements OnInit {
  protected submitted = false;
  protected form!: FormGroup
  private fb = inject(FormBuilder);
  private authService = inject(AuthenticationService);
  private router = inject(Router);

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', [
          Validators.required,
          Validators.maxLength(30)
      ]],
      password: ['', [
        Validators.required,
        Validators.maxLength(30)
      ]]
    });
  }

  protected login(): void {
    (document.getElementById('msg') as HTMLElement).classList.remove("error");
    (document.getElementById('msg') as HTMLElement).textContent = '';
    this.submitted = true;

    if(this.form.valid) {
      this.authService.authenticate(this.form.value).subscribe({
        next: (user) => {
          if(user) {
            if(user.role.name === 'ROLE_ADMIN')
              this.router.navigate(['/admin']);
            else
              this.router.navigate(['/home']);
          }
          else {
            (document.getElementById('msg') as HTMLElement).classList.add("error");
            (document.getElementById('msg') as HTMLElement).textContent = "Invalid username or password";

            this.form.patchValue({
              password: ''
            })
          }
        },
        error: (err) => console.error(err)
      });

      this.submitted = false;
    }
  }
}
