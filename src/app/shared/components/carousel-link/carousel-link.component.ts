import { AfterViewInit, Component, OnInit } from '@angular/core';
import M from 'materialize-css';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-carousel-link',
  templateUrl: './carousel-link.component.html',
  styleUrls: ['./carousel-link.component.scss']
})
export class CarouselLinkComponent implements OnInit, AfterViewInit {
  options = { fullWidth: true, indicators: true };
  items = [];

    hrefs = ['one', 'two', 'three', 'four', 'five'];

  constructor( private authService: AuthService ) { }

  ngOnInit() {
    this.getImages()
  }

  ngAfterViewInit() {
    let elems = document.querySelectorAll('.carousel');
    let instances = M.Carousel.init(elems, this.options);
    this.getImages()
  }

  madeCarousel(){
  var instance = M.Carousel.init({
    fullWidth: true,
    indicators: true
  });
  }

  getImages(){
    this.items=this.authService.getImages()
  }

}
