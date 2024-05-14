import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TankNotifyPage } from './tank-notify.page';

const routes: Routes = [
  {
    path: '',
    component: TankNotifyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TankNotifyPageRoutingModule {}
