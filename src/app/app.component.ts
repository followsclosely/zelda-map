import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  assets : string = "/assets";
  x : number = 7;
  y : number = 7;
  world : string[][] = [];
  screen : string[][] = [];
  fullScreen : boolean = false;
  showGuideLines : boolean = false;

  constructor(private http: HttpClient) {
    var y = 0;
    this.http.get(this.assets + '/nes_zelda_overworld_tile_map.txt',
      {responseType: "text"} ).subscribe(data => {
      data.split('\n').forEach( (line) => {
        if( line.length > 0) this.world[y++] = line.split(' ');
      });
      this.home();
    });
  }

  public setScreen(x : number, y : number) {
    this.fullScreen = false;
    if (x<0||x>=16||y<0||y>=8){
      return;
    }
    this.x = x;
    this.y = y;
    var screen = [];
    for(var dy:number = 0; dy<11; dy++){
      console.log("for loop executed : " + y);
      screen[dy] = this.world[(y*11)+dy].slice((x*16), (x*16)+16);
    }
    this.screen = screen;
  }

  public home() { this.setScreen(7,7) }
  public zoomIn() { this.setScreen(this.x, this.y); }

  public zoomOut(){
    this.fullScreen = true;
    this.screen = this.world;
  }
}
