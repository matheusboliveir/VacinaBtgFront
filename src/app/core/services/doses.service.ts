import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Dose } from '../@types/Dose';
import { RequestAddDose } from '../@types/DosesService';

@Injectable({
  providedIn: 'root',
})
export class DosesService {
  private http = inject(HttpClient);

  private readonly BASE_URL = `${environment.apiUrl}Doses/`;

  public add(data: RequestAddDose): Observable<Dose> {
    return this.http.post<Dose>(this.BASE_URL + 'Cadastrar', data);
  }

  public delete(id: number): Observable<void> {
    return this.http.delete<void>(this.BASE_URL + 'Deletar/' + id);
  }
}
