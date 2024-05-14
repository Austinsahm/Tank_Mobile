import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { HomePageRoutingModule } from './home-routing.module';
import { LayoutModule } from '../widgets/layout/layout.module';
import { DevicesModule } from '../widgets/devices/devices.module';
import { CardsModule } from '../widgets/cards/cards.module';

// Load
import { WidgetsModule } from '../widgets/widgets.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DevicesModule,
    HomePageRoutingModule,
    LayoutModule,
    CardsModule,
    WidgetsModule
  ],
  declarations: [HomePage, ],
})
export class HomePageModule {}
