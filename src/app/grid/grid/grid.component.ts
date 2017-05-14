import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {

  grid: boolean[][] = [];
  gridSize: number = 50;

  started: boolean = false;
  ended: boolean = false;

  constructor() { }

  ngOnInit() {
    this.createEmptyGrid();
    this.setStartState();
  }

  private createEmptyGrid = () => {
    this.grid = [];
    for (let x = 0; x < this.gridSize; x++) { //rows
      this.grid[x] = [];
      for (let y = 0; y < this.gridSize; y++) { //columns
        this.grid[x][y] = false;
      }
    }
  }

  private setStartState = () => {
    this.grid[4][5] = true;
    this.grid[5][6] = true;
    this.grid[6][4] = true;
    this.grid[6][5] = true;
    this.grid[6][6] = true;
  }

  run = () => {
    this.started = true;
    this.ended = false;
  }

  end = () => {
    this.ended = true;
    this.started = false;
  }

}
