import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';

import { IonicModule } from '@ionic/angular';
import { TankComponent } from './tank/tank.component';

@NgModule({
  declarations: [HeaderComponent,TankComponent],
  imports: [CommonModule, IonicModule, ],
  exports: [HeaderComponent,TankComponent],
})
export class LayoutModule {}
