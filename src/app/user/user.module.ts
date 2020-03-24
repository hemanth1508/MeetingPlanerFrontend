import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogInComponent } from './log-in/log-in.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { EmailVerifyComponent } from './email-verify/email-verify.component';
import { InfoComponent } from './info/info.component';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AdminEmailVerifyComponent } from './admin-email-verify/admin-email-verify.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';




@NgModule({
  declarations: [SignUpComponent, LogInComponent, EmailVerifyComponent, InfoComponent, AdminEmailVerifyComponent, ResetPasswordComponent],
  imports: [
    CommonModule,
    ToastrModule,
    FormsModule,
    FontAwesomeModule,
    BrowserAnimationsModule,

    RouterModule.forChild([
      { path: 'email-verify/user/:userId/:secretKey', component: EmailVerifyComponent },
      { path: 'email-verify/admin/:adminId/:secretKey', component: AdminEmailVerifyComponent },
      { path: 'info', component: InfoComponent }
    ])
  ]
})
export class UserModule { }
