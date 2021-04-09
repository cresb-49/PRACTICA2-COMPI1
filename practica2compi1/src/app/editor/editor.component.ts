import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})

export class EditorComponent implements OnInit {

  
  ayuda:boolean =false;
  constructor() { 
    this.expreciones ="";
  }
  ngOnInit(): void {

  }

  helpUser(){
    this.ayuda = true;
  }

  procesarTexto(code:string){
    console.log(this.expreciones);
    return false;
  }
}
