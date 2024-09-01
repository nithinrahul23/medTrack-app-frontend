import { NgModule } from '@angular/core';
import { OutletContext, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HomeComponent } from './home/home.component';
import { MedDetailsComponent } from './med-details/med-details.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './_auth/auth.guard';
import { UserDetailsComponent } from './user-details/user-details.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', redirectTo: "/login", pathMatch: 'full' },
  { path: "login", component: LoginComponent },
  { path: "signUp", component: SignUpComponent },
  {
    path: "home",
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: "mediDetails", component: MedDetailsComponent },
      { path: "dashboard", component: DashboardComponent },
      { path: "userDetails", component: UserDetailsComponent },
    ]
  },
  { path: '**', component: PageNotFoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
