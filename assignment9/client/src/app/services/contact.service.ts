import { Injectable } from '@angular/core';
import{ Contact } from '../Modules/contact'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type' : 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class contactService {

  constructor(private http: HttpClient) { }
   url: string = 'http://localhost:3000/people'

  // retriving whole contact list
  getContacts():Observable<Contact[]>{
    return this.http.get<Contact[]>(`${this.url}`)
  }

  // retriving one contact
  getContact(Id:string):Observable<Contact>{
    return this.http.get<Contact>(`${this.url}/${Id}`)
  }

  // add contact
  addContact(contact:Contact):Observable<Contact>{
    return this.http.post<Contact>(this.url, contact, httpOptions)
  }
}
