import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { users } from "./usersDummy"
import { Observable } from 'rxjs';
import axios from "axios"
export type User = typeof users.results[0]

type UsersApiPayload = { results: User[] }
@Injectable({
    providedIn: 'root'
})
export class UsersService {
    private apiUrl = `https://randomuser.me/api/?results=10`
    constructor(private http: HttpClient) { } // HttpClient => fetch/axios
    getUsers(): Observable<UsersApiPayload> {
        const result = this.http.get<UsersApiPayload>(this.apiUrl)
        return result
    }

    async getUsersPromise(): Promise<UsersApiPayload> {
        const result = await axios.get<UsersApiPayload>(this.apiUrl)
        return result.data
    }
}
