import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.routing';
import { AuthComponent } from './auth.component';
import { ForgotPasswordComponent } from './forgotpassword.component';
import { ResetPasswordComponent } from './resetpassword.component';

@NgModule({
    declarations: [
        AuthComponent,
        ForgotPasswordComponent,
        ResetPasswordComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        AuthRoutingModule,
    ],
    providers: [
    ],
})

export class AuthModule {
}