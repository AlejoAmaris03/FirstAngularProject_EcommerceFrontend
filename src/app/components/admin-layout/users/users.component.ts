import { Component, inject, OnInit } from '@angular/core';
import { AuthenticationService, RoleService, UserService } from '../../../core/services';
import { RoleModel, UserModel } from '../../../core/interfaces/models';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-users',
  imports: [
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})

export default class UsersComponent implements OnInit {
  protected form!: FormGroup;
  protected users: UserModel[] = [];
  protected roles: RoleModel[] = [];
  private fb = inject(FormBuilder);
  private emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  private authService = inject(AuthenticationService);
  private userService = inject(UserService);
  private roleService = inject(RoleService);
  private currentUser: UserModel | null = this.authService.getUser();
  private action!: string;

  ngOnInit(): void {
    this.userService.getUsers().subscribe(users => {
      this.users = users.filter(user => user.id !== this.currentUser!.id);
    });

    this.roleService.getRoles().subscribe(roles => {
      this.roles = roles;
    });

    this.form = this.fb.group({
      id: [''],
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
      role: ['', Validators.required],
    });
  }

  protected submit(): void {
    if (this.form.valid) {
      const formData: FormData = new FormData();

      if (this.form.controls['id'].value === '')
        this.action = 'register';
      else
        this.action = 'update';

      formData.append('user', new Blob(
        [JSON.stringify(this.form.value)],
        { 'type': 'application/json' }
      ));

      formData.append('action', this.action);

      this.userService.registerUser(formData).subscribe(user => {
        if (user) {
          alert('User registrated/updated successfully');
          this.userService.getUsers().subscribe(users => {
            this.users = users.filter(user => user.id !== this.currentUser!.id);
          });
          this.form.reset();
          this.form.patchValue({
            id: '',
            role: ''
          })
        }
        else
          alert('ERROR, that username already exists');
      });
    }
    else
      alert('Please fill all required fields');
  }

  protected getData(id: number): void {
    this.userService.getUserById(id).subscribe(user => {
      this.form.patchValue({
        id: user.id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        username: user.username,
        password: '',
        role: this.roles.find(role => role.id === user.role.id)
      });
    });
  }

  protected deleteUser(id: number): void {
    this.userService.deleteUser(id).subscribe(() => {
      alert('User deleted successfully');

      this.userService.getUsers().subscribe(users => {
        this.users = users.filter(user => user.id !== this.currentUser!.id);
      });
    })
  }
}
