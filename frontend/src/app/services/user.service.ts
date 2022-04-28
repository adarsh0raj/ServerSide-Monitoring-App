import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../interfaces/user';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    public apiUrl = 'http://localhost:3080';

    getAll() {
        return this.http.get<User[]>(`${this.apiUrl}/users`);
    }

    register(username, password) {
        console.log({username, password});
        return this.http.post(`${this.apiUrl}/register`, {username, password});
    }

    delete(id: number) {
        return this.http.delete(`${this.apiUrl}/users/${id}`);
    }
}