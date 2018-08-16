import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Team } from '../model/team';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
 
  private baseUrl = 'http://localhost:8080/edit-teams';
 
  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get('//localhost:8080/edit-teams');
  }
  getAllType(): Observable<any> {
    return this.http.get('//localhost:8080/edit-teams/type');
  }

  deleteTeam(id : number) : Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`,{responseType: 'text'});
  }

  addTeam(team: Team): Observable<any> {
    console.log(team.name);
    console.log(team.type.id);
     return this.http.post(`${this.baseUrl}/add/${team.name}/${team.type.id}`, {responseType: 'text'});
  }
  editTeam(team: Team): Observable<any> {
    console.log(team.name);
    console.log(team.type.discipline);
     return this.http.post(`${this.baseUrl}/edit/${team.id}/${team.name}/${team.type.id}`,{responseType: 'text'});
  }

}