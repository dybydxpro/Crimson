import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppbarComponent } from './appbar/appbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MatModule } from './mat/mat.module';
import { LocalStoragePipe } from './local-storage.pipe';

@NgModule({
  declarations: [
    AppbarComponent,
    SidebarComponent,
    LocalStoragePipe
  ],
  imports: [
    CommonModule,
    MatModule
  ],
  exports: [
    LocalStoragePipe
  ]
})
export class SharedModule { }
