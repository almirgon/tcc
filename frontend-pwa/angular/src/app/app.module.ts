import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { HeaderComponent } from './components/header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './pages/home/home.component';
import { AvatarModule } from 'ngx-avatar';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfilePhotoComponent } from './components/profile-photo/profile-photo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadingComponent } from './components/loading/loading.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { Error404Component } from './pages/error404/error404.component';
import { PromotionComponent } from './pages/promotion/promotion.component';
import { LikeComponent } from './components/like/like.component';
import { BackComponent } from './components/back/back.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { AdminApprovalComponent } from './pages/admin-approval/admin-approval.component';
import { RegisterPromotionComponent } from './pages/register-promotion/register-promotion.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TokenInterceptorService } from './guards/interceptors/token-interceptor.service';
import { LOCALE_ID } from '@angular/core';

import { ToastrModule } from 'ngx-toastr';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxHumanizeDurationModule, NgxHumanizerOptions } from 'ngx-humanize-duration';
import { DateAgoPipe } from './pipes/date-ago.pipe';
import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import {ConnectionServiceModule} from 'ng-connection-service';
import {ConnectionStatusService} from './services/connection-status.service'

registerLocaleData(localePt);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ProfilePhotoComponent,
    LoadingComponent,
    ForgotPasswordComponent,
    Error404Component,
    PromotionComponent,
    LikeComponent,
    BackComponent,
    AdminPageComponent,
    AdminApprovalComponent,
    RegisterPromotionComponent,
    DateAgoPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AvatarModule,
    FormsModule, 
    ReactiveFormsModule,
    ConnectionServiceModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 4000,
      positionClass: 'toast-bottom-center',
      maxOpened: 3,
      preventDuplicates: true,
    }), 
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production
    }),
    NgbModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    {provide: LOCALE_ID, useValue: 'pt-BR'},
    ConnectionStatusService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
