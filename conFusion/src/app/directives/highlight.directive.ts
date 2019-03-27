import { Directive, ElementRef, Renderer2, HostListener} from '@angular/core';
// to create the directive Renderer2
// Hostlistener mouse moves
@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  constructor(private el: ElementRef,
  private renderer: Renderer2) { }

// This is a way to add and remove classes css
  @HostListener('mouseenter') onmouseenter(){
      this.renderer.addClass(this.el.nativeElement,'highlight');
  }
  @HostListener('mouseleave') onmouseleave(){
      this.renderer.removeClass(this.el.nativeElement, 'highlight')
  }
}
