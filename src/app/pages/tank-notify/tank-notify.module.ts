import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TankNotifyPageRoutingModule } from './tank-notify-routing.module';

import { TankNotifyPage } from './tank-notify.page';
import { WidgetsModule } from 'src/app/widgets/widgets.module';
import { LayoutModule } from 'src/app/widgets/layout/layout.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TankNotifyPageRoutingModule,
    WidgetsModule,
    LayoutModule,
  ],
  declarations: [TankNotifyPage],
})
export class TankNotifyPageModule {}
