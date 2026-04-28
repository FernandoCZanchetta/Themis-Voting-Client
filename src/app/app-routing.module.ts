import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import {
  AuditComponent,
  HomeComponent,
  LoginComponent,
  VotingDetailsComponent,
  VotingsComponent,
} from '@core'
import { AuthGuard, NoAuthGuard } from '@guards'
import { RouteModel } from '@models'

const routes: RouteModel[] = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [NoAuthGuard],
  },
  {
    path: 'votings',
    component: VotingsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'voting/:id',
    component: VotingDetailsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'audit',
    component: AuditComponent,
  },
  { path: '**', redirectTo: '/' } as any,
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes as Routes, {
      anchorScrolling: 'disabled',
      onSameUrlNavigation: 'reload',
      paramsInheritanceStrategy: 'always',
      scrollPositionRestoration: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
