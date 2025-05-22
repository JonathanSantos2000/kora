import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { PasswordMatchValidator } from '../../../../shared/validators/password_match_validator';
import { ActivatedRoute, Router } from '@angular/router';
import { TextInputComponent } from '../../../partials/form/text-input/text-input.component';
import { CommonModule } from '@angular/common';
import { IUserRegister } from '../../../../shared/interfaces/IUserRegister';
import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TextInputComponent],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  dataAtual = new Date();
  dataFormatada = this.dataAtual.toLocaleDateString('pt-BR');
  registerForm!: FormGroup;
  isSubmitted: boolean = false;

  returnUrl: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group(
      {
        name: ['', [Validators.required, Validators.minLength(5)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(5)]],
        confirmPassword: ['', Validators.required],
      },
      {
        validators: PasswordMatchValidator('password', 'confirmPassword'),
      }
    );
    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'];
  }
  get fc() {
    return this.registerForm.controls;
  }

  submit() {
    this.isSubmitted = true;
    if (this.registerForm.invalid) return;

    const fv = this.registerForm.value;
    const user: IUserRegister = {
      name: fv.name,
      email: fv.email,
      password: fv.password,
      confirmPassword: fv.confirmPassword,
      role: 'User',
      createdAt: this.dataFormatada,
    };

    this.userService.register(user).subscribe((_) => {
      this.router.navigateByUrl(this.returnUrl);
    });
  }
}
