import { Component, OnInit } from '@angular/core';
import {
  Validators,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UserService } from '../../../../services/user.service';
import { User } from '../../../../shared/models/user.models';
import { TextInputComponent } from '../../../partials/form/text-input/text-input.component';
import { CommonModule } from '@angular/common';
import { IAccount } from '../../../../shared/interfaces/IAccount';
import { AccountsService } from '../../../../services/accounts.service';

@Component({
  selector: 'app-accounts-new',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TextInputComponent,
    RouterModule,
  ],
  templateUrl: './accounts-new.component.html',
  styleUrl: './accounts-new.component.css',
})
export class AccountsNewComponent implements OnInit {
  accountForm!: FormGroup;
  isSubmitted: boolean = false;
  user!: User;
  returnUrl: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private accountService: AccountsService
  ) {
    userService.userObservable.subscribe((newUser) => {
      this.user = newUser;
    });
  }
  ngOnInit(): void {
    this.accountForm = this.formBuilder.group({
      AccNom: ['', [Validators.required]],
      AccTip: ['', [Validators.required]],
      AccBanId: ['', [Validators.required]],
      AccSalIni: ['', [Validators.required]],
      AccMoe: [1, [Validators.required]],
    });
    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'];
  }
  get fc() {
    return this.accountForm.controls;
  }

  submit() {
    this.isSubmitted = true;
    if (this.accountForm.invalid) return;
    const fv = this.accountForm.value;
    const account: IAccount = {
      AccUsuId: this.user.id,
      AccNom: fv.AccNom,
      AccTip: fv.AccTip,
      AccBanId: fv.AccBanId,
      AccSalIni: fv.AccSalIni,
      AccMoe: fv.AccMoe,
    };
    this.accountService.CreateAccount(account).subscribe((_) => {
      this.router.navigateByUrl(this.returnUrl);
    });
  }

  showBanco: boolean = false;
  mostrabanco() {
    if (this.fc['AccTip'].value != 'dinheiro') {
      this.showBanco = true;
    } else {
      this.showBanco = false;
      this.fc['AccBanId'].setValue(1);
    }
  }
}
