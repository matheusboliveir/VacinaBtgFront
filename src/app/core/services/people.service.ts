import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Person } from '../@types/Person';
import { Observable } from 'rxjs';
import { RequestAddPeople } from '../@types/PeopleService';

@Injectable({
  providedIn: 'root',
})
export class PeopleService {
  private http = inject(HttpClient);

  private readonly BASE_URL = `${environment.apiUrl}Pessoas/`;

  public list(): Observable<Person[]> {
    return this.http.get<Person[]>(this.BASE_URL + 'Listar');
  }

  public add(data: RequestAddPeople): Observable<Person> {
    return this.http.post<Person>(this.BASE_URL + 'Cadastrar', data);
  }

  public edit(data: Person): Observable<Person> {
    return this.http.put<Person>(this.BASE_URL + 'Editar', data);
  }

  public delete(id: number): Observable<void> {
    return this.http.delete<void>(this.BASE_URL + 'Deletar/' + id);
  }
}
