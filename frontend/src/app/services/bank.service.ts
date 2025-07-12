import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Bank } from '../shared/models/bank.model';
import { CREATE_NEW_BANK, GET_ALL_BANKS_URL } from '../shared/constants/urls';
import { IBank } from '../shared/interfaces/IBank';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BankService {
  constructor(private http: HttpClient, private toastrService: ToastrService) {}

  CreateBank(bankRegister: IBank): Observable<Bank> {
    return this.http.post<Bank>(CREATE_NEW_BANK, bankRegister).pipe(
      tap({
        next: (bank) => {
          this.toastrService.success(
            `Banco: ${bank.BanNom} registrada com sucesso`
          );
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error, ' registro falhou');
        },
      })
    );
  }

  getAllBanks(): Observable<Bank[]> {
    return this.http.get<Bank[]>(GET_ALL_BANKS_URL);
  }
}
