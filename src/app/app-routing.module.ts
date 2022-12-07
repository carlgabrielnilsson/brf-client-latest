import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrfDashboardComponent } from './_components/brf-dashboard/brf-dashboard.component';
import { FaqComponent } from './_components/faq/faq.component';
import { FeedbackComponent } from './_components/feedback/feedback.component';
import { HomeComponent } from './_components/home/home.component';

const routes: Routes = [
  {
    path: '', pathMatch: 'full', redirectTo: 'home'
  },
  {
    path: 'brf-dashboard',
    component: BrfDashboardComponent
  },
  {
    path: 'faq',
    component: FaqComponent
  },  
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'feedback',
    component: FeedbackComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
