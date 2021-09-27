import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import {ForgotPasswordComponent} from './pages/forgot-password/forgot-password.component';
import {Error404Component} from './pages/error404/error404.component';
import { PromotionComponent } from './pages/promotion/promotion.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { RegisterPromotionComponent } from './pages/register-promotion/register-promotion.component';
import { AdminApprovalComponent } from './pages/admin-approval/admin-approval.component';
import { AuthGuardService as AuthGuard  } from './guards/auth-guard.service';
import { RoleGuardService as RoleGuard } from './guards/role-guard.service';


const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'promotion/:id', component: PromotionComponent},
  {path: 'admin', component: AdminPageComponent, canActivate: [RoleGuard]},
  {path: 'admin-room/:id', component: AdminApprovalComponent, canActivate: [RoleGuard]},
  {path: 'share', component: RegisterPromotionComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'forgot-password', component: ForgotPasswordComponent},
  {
    path: '404', component: Error404Component
  },
  {
    path: '**', redirectTo: '/404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
