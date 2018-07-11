import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router'

@Injectable()
export class AuthService {

    constructor(private http: HttpClient, private router: Router) { }

    get isAuthenticated() {
        // if the user is logged in ( double negative gives a positive )
        return !!localStorage.getItem('token')
    }

    // Questions API calls

    register(credentials) {
        return this.http.post<any>(`http://localhost:58331/api/account/`, credentials)
            .subscribe(res => {
                this.authenticate(res)
            })
    }

    login(credentials) {
        return this.http.post<any>(`http://localhost:58331/api/account/login`, credentials)
            .subscribe(res => {
                this.authenticate(res)
            })
    }

    authenticate(res) {
        localStorage.setItem('token', res)

        this.router.navigate(['/'])
    }

    logout() {
        localStorage.removeItem('token')
    }
}