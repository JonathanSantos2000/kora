import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  type OnChanges,
  type OnInit,
  type SimpleChanges,
} from '@angular/core';
import type { AbstractControl } from '@angular/forms';

const VALIDATORS_MESSAGES: any = {
  required: 'Não deveria estar vazio',
  email: 'E-mail não está correto',
  minlength: 'Deve conter no minimo 5 caracteres',
  notMatch: 'senhas não correspondem',
};

@Component({
  selector: 'app-input-validation',
  imports: [CommonModule],
  templateUrl: './input-validation.component.html',
  styleUrl: './input-validation.component.css',
})
export class InputValidationComponent implements OnInit, OnChanges {
  @Input()
  control!: AbstractControl;
  @Input()
  showErrorWhen: boolean = true;

  errorMessages: string[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    this.checkValidation();
  }
  ngOnInit(): void {
    this.control.statusChanges.subscribe(() => {
      this.checkValidation();
    });
    this.control.valueChanges.subscribe(() => {
      this.checkValidation();
    });
  }

  checkValidation() {
    const errors = this.control.errors;

    if (!errors) {
      this.errorMessages = [];
      return;
    }

    const errorKeys = Object.keys(errors);
    this.errorMessages = errorKeys.map((key) => VALIDATORS_MESSAGES[key]);
  }
}
