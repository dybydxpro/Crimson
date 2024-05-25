import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatModule } from './components/shared/mat/mat.module';
import { HomeComponent } from './components/home/home.component';
import { SigninComponent } from './components/authonticate/signin/signin.component';

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "sign-in", component: SigninComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SigninComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    MatModule
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
