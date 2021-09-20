import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselLinkComponent } from './components/carousel-link/carousel-link.component';

const COMPONENTS = [
  CarouselLinkComponent
]

@NgModule({
  declarations: [COMPONENTS],
  imports: [
    CommonModule
  ],
  exports: [COMPONENTS],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }
