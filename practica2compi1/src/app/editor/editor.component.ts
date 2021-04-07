import { Component, OnInit} from '@angular/core';

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
}
