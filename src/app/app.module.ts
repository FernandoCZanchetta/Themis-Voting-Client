import { NgModule } from '@angular/core'
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { ReactiveFormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import {
  AuditComponent,
  FooterComponent,
  GroupsPanelComponent,
  HomeComponent,
  LoginComponent,
  NavbarComponent,
  PageTitleComponent,
  SidebarComponent,
  VotingDetailsComponent,
  VotingsComponent,
} from '@core'
import { AuthInterceptor } from '@interceptors'
import { SanitizeHtmlPipe } from '@pipes'
import {
  AlternatingLayoutComponent,
  FigureComponent,
  ImageGridComponent,
  LogoComponent,
  ModalComponent,
  SocialMediaIconComponent,
  TitleComponent,
} from '@shared'
import { CarouselModule } from 'ngx-bootstrap/carousel'
import { CollapseModule } from 'ngx-bootstrap/collapse'
import { ModalModule } from 'ngx-bootstrap/modal'
import { TooltipModule } from 'ngx-bootstrap/tooltip'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'

@NgModule({
  declarations: [
    AlternatingLayoutComponent,
    AppComponent,
    AuditComponent,
    FigureComponent,
    FooterComponent,
    GroupsPanelComponent,
    HomeComponent,
    ImageGridComponent,
    LoginComponent,
    LogoComponent,
    ModalComponent,
    NavbarComponent,
    PageTitleComponent,
    SanitizeHtmlPipe,
    SidebarComponent,
    SocialMediaIconComponent,
    TitleComponent,
    VotingDetailsComponent,
    VotingsComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    CarouselModule.forRoot(),
    CollapseModule.forRoot(),
    HttpClientModule,
    ModalModule.forRoot(),
    ReactiveFormsModule,
    TooltipModule.forRoot(),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
