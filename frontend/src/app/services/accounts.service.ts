import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { IAccount } from '../shared/interfaces/IAccount';
import { Observable, tap } from 'rxjs';
import { Account } from '../shared/models/account.model';
import {
  CREATE_NEW_ACCOUNT,
  GET_ALL_ACOUNTS_URL,
} from '../shared/constants/urls';

@Injectable({
  providedIn: 'root',
})
export class AccountsService {
  constructor(private http: HttpClient, private toastrService: ToastrService) {}

  CreateAccount(accountRegister: IAccount): Observable<Account> {
    return this.http.post<Account>(CREATE_NEW_ACCOUNT, accountRegister).pipe(
      tap({
        next: (account) => {
          this.toastrService.success(
            `Conta: ${account.AccNom} registrada com sucesso`
          );
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error, ' registro falhou');
        },
      })
    );
  }

  getAllAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>(GET_ALL_ACOUNTS_URL);
  }
}
