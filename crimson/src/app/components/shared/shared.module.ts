import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppbarComponent } from './appbar/appbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MatModule } from './mat/mat.module';

@NgModule({
  declarations: [
    AppbarComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    MatModule
  ]
})
export class SharedModule { }
