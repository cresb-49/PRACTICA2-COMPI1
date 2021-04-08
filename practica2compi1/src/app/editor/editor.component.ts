import { Component, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {

  ayuda:boolean =false;

  constructor() { }

  ngOnInit(): void {

  }
  helpUser(){
    this.ayuda = true;
  }

  procesarTexto(code:string){
    console.log(code);
    return false;
  }

}
