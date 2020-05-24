import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, Subject } from 'rxjs';
import { User } from './user.model';

export interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({providedIn:'root'})
export class AuthService {

    user = new Subject<User>();

    signupUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBmla2VuYJM23vmdZpzCoCC-uhoAlMe7gc';
    signinUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBmla2VuYJM23vmdZpzCoCC-uhoAlMe7gc'

    constructor(private http: HttpClient) {}

    signup(email: string, password: string) {
        return this.http.post<AuthResponseData>(this.signupUrl, {
            email: email,
            password: password,
            returnSecureToke: true
        }).pipe(catchError(this.handleError), tap(res => {
            this.saveUser(res.email, res.localId, res.idToken, +res.expiresIn);
        }));
    }

    login(email: string, password: string) {
        return this.http.post<AuthResponseData>(this.signinUrl, {
            email: email,
            password: password,
            returnSecureToke: true
        }).pipe(catchError(this.handleError), tap(res => {
            this.saveUser(res.email, res.localId, res.idToken, +res.expiresIn);
        }));
    }

    private handleError(errorRes: HttpErrorResponse) {
        let errorMessage = 'An unknown error occurred!';
        if(!errorRes.error || !errorRes.error.error) {
            return throwError(errorMessage);
        }
        switch(errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMessage = "This email exists already!";
                break;
            case 'EMAIL_NOT_FOUND':
                errorMessage = "This email was not found!";
                break;
            case 'INVALID_PASSWORD':
                errorMessage = "The password is incorrect!";
                break;
        }
        return throwError(errorMessage);
    }

    private saveUser(email: string, userId: string, token: string, expiresIn: number) {
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new User(email, userId, token, expirationDate);
        this.user.next(user);
    }
}