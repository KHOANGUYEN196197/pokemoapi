import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router,) { }

  ngOnInit(): void {
  }
  toHomePage(){
    this.router.navigate([""]);
  }
  toGames(){
    this.router.navigate(["/games"]);
  }
  toGenerations(){
    this.router.navigate(["/generations"]);
  }
  toLocations(){
    this.router.navigate(["/locations"]);
  }
  toItems(){
    this.router.navigate(["/items"]);
  }

}
