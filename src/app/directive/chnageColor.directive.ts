import { Directive, Renderer, ElementRef, HostListener, HostBinding } from '@angular/core';

@Directive({selector:'[bgColor]'})
export class changeColor{
  
    constructor(private ele:ElementRef,private render:Renderer){

    }

    @HostBinding('style.border') border: string;
    @HostBinding('style.backgroundColor') backColor: string;
    @HostListener('mouseenter') onMouseClick(){
  
       this.changeBackgroundColor('red');
       this.border="5px solid green";
       this.backColor="blue";
    }
    @HostListener('mouseleave') onMouseOut(){
        
       this.changeBackgroundColor('yellow');
       this.border="5px solid black";
       this.backColor="green";
    }

    changeBackgroundColor(color: string){
        this.render.setElementStyle(this.ele.nativeElement, 'color', color);
       
        }
}