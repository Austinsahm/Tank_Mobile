import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { CardlistComponent } from './cardlist/cardlist.component';
import { CardComponent } from './card/card.component';
import { CarouselCardComponent } from './carousel-card/carousel-card.component';
import { VisualComponent } from '../card/visual/visual.component';
import { TankCardComponent } from './tank-card/tank-card.component';

@NgModule({
  declarations: [
    CardComponent,
    CarouselCardComponent,
    VisualComponent,
    CardlistComponent,
    TankCardComponent,
  ],

  imports: [CommonModule, IonicModule],

  exports: [
    CardComponent,
    CarouselCardComponent,
    VisualComponent,
    CardlistComponent,
    TankCardComponent,
  ],
})
export class CardsModule {}
