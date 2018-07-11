import { Directive, HostBinding, HostListener, Input } from '@angular/core'

@Directive({
  selector: '[mwFavorite]'
})
export class FavoriteDirective {
  @HostBinding('class.is-favorite') isFavorite = true

  @HostBinding('class.is-favorite-hovering') hovering = false

  @HostListener('mouseenter') onmouseenter() {
    this.hovering = true
  }

  @HostListener('mouseleave') onmouseleave() {
    this.hovering = false
  }

  @HostListener('mousedown') onmousedown() {
    if (this.isFavorite === false){  
      this.isFavorite = true
    }
    else {
      this.isFavorite = false
    }
  }

  @Input() set mwFavorite(value) {
    this.isFavorite = value
  } 
}
