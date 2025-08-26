import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Vacine } from '../@types/Vacine';
import { RequestAddVacine, RequestEditVacine } from '../@types/VacinesService';

@Injectable({
  providedIn: 'root',
})
export class VacinesService {
  private http = inject(HttpClient);

  private readonly BASE_URL = `${environment.apiUrl}Vacinas/`;

  public list(): Observable<Vacine[]> {
    return this.http.get<Vacine[]>(this.BASE_URL + 'Listar');
  }

  public listByPerson(personId: number): Observable<Vacine[]> {
    return this.http.get<Vacine[]>(
      this.BASE_URL + 'Listar?pessoaId=' + personId
    );
  }

  public searchById(id: number): Observable<Vacine> {
    return this.http.get<Vacine>(this.BASE_URL + 'Buscar;' + id);
  }

  public add(data: RequestAddVacine): Observable<Vacine> {
    return this.http.post<Vacine>(this.BASE_URL + 'Cadastrar', data);
  }

  public edit(data: RequestEditVacine): Observable<Vacine> {
    return this.http.put<Vacine>(this.BASE_URL + 'Editar', data);
  }

  public delete(id: number): Observable<void> {
    return this.http.delete<void>(this.BASE_URL + 'Deletar/' + id);
  }
}
