import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {

  grid: boolean[][];
  gridSize: number = 50;

  constructor() { }

  ngOnInit() {
    this.createEmptyGrid();
  }

  createEmptyGrid = () => {
    for (let x = 0; x < this.gridSize; x++) {
      for (let y = 0; y < this.gridSize; y++) {
        this.grid[x][y] = false;
        if (x == 20 && y == 25) {
          this.grid[x][y] = true;
        }
      }
    }
  }

}