import { Component } from '@angular/core';
import { AuthService } from './account/auth.service'

@Component({
  selector: 'nav',
  template: `
    <mat-toolbar>
        <button mat-button routerLink="/">My Quiz</button>
        <button mat-button routerLink="/play">Play</button>
        <span style="flex: 1 1 auto"></span>
        <button *ngIf="!auth.isAuthenticated" mat-button routerLink="/register">Register</button>
        <button *ngIf="!auth.isAuthenticated" mat-button routerLink="/login">Login</button>
        <button *ngIf="auth.isAuthenticated" mat-button (click)="auth.logout()" routerLink="/register" >Logout</button>
    </mat-toolbar>
  `
})
export class NavComponent {
  constructor(private auth: AuthService) {}
}
