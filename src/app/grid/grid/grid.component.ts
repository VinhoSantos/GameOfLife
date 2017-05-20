import { Component, OnInit } from '@angular/core';

class Cell {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

@Component({
  selector: 'grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {

  grid: boolean[][] = []; //x = rows, y = columns
  gridSize: number = 50;

  started: boolean = false;
  ended: boolean = false;

  step: number = 0;

  playingFieldGrid: Cell[] = [];
  aliveGrid: Cell[] = [];
  deadGrid: Cell[] = [];

  constructor() { }

  ngOnInit() {
    this.createEmptyGrid();
    this.setStartState();
  }

  private startGame = () => {
    this.aliveGrid = [];
    this.deadGrid = [];
    this.calculateGridField();
    this.calculateNextStep();
  }

  private calculateGridField = () => {
    this.playingFieldGrid = [];
    for (let x = 0; x < this.gridSize; x++) {
      for (let y = 0; y < this.gridSize; y++) {
        if (this.grid[x][y]) {
          this.addToPlayingFieldGrid(x, y);
        }
      }
    }

    // for (let cell of this.playingFieldGrid) {
    //   console.log('playing field grid: ' + cell.x + ',' + cell.y);
    // }
    // console.log('playing field: ' + this.playingFieldGrid.length);
  }

  private addToPlayingFieldGrid(x: number, y: number) {
    if (x > 0) {
      if (y > 0) {
        if (this.playingFieldGrid.findIndex(c => c.x === x - 1 && c.y === y - 1) === -1) this.playingFieldGrid.push(new Cell(x - 1, y - 1)); //buur linksboven
      }
      if (this.playingFieldGrid.findIndex(c => c.x === x - 1 && c.y === y) === -1) this.playingFieldGrid.push(new Cell(x - 1, y)); //buur boven
      if (y < (this.gridSize - 1)) {
        if (this.playingFieldGrid.findIndex(c => c.x === x - 1 && c.y === y + 1) === -1) this.playingFieldGrid.push(new Cell(x - 1, y + 1)); //buur rechtsboven
      }
    }

    if (y > 0) {
      if (this.playingFieldGrid.findIndex(c => c.x === x && c.y === y - 1) === -1) this.playingFieldGrid.push(new Cell(x, y - 1)); //buur links    
    }
    if (this.playingFieldGrid.findIndex(c => c.x === x && c.y === y) === -1) this.playingFieldGrid.push(new Cell(x, y)); //de levende cell
    if (y < (this.gridSize - 1)) {
      if (this.playingFieldGrid.findIndex(c => c.x === x && c.y === y + 1) === -1) this.playingFieldGrid.push(new Cell(x, y + 1)); //buur rechts
    }

    if (x < (this.gridSize - 1)) {
      if (y > 0) {
        if (this.playingFieldGrid.findIndex(c => c.x === x + 1 && c.y === y - 1) === -1) this.playingFieldGrid.push(new Cell(x + 1, y - 1)); //buur linksonder
      }
      if (this.playingFieldGrid.findIndex(c => c.x === x + 1 && c.y === y) === -1) this.playingFieldGrid.push(new Cell(x + 1, y)); //buur onder
      if (y < (this.gridSize - 1)) {
        if (this.playingFieldGrid.findIndex(c => c.x === x + 1 && c.y === y + 1) === -1) this.playingFieldGrid.push(new Cell(x + 1, y + 1)); //buur rechtsonder
      }
    }
  }

  private calculateNextStep = () => {
    for (let cell of this.playingFieldGrid) {
      this.calculateNextState(cell.x, cell.y);
    }
    for (let cell of this.aliveGrid) {
      this.grid[cell.x][cell.y] = true;
    }
    for (let cell of this.deadGrid) {
      this.grid[cell.x][cell.y] = false;
    }    
    this.step++;
  }

  run = () => {
    this.started = true;
    this.ended = false;

    this.startGame();
  }

  end = () => {
    this.ended = true;
    this.started = false;

    this.clearState();
  }

  isInSidePlayingField = (x: number, y: number) => {
    return this.playingFieldGrid.findIndex(c => c.x === x && c.y === y) !== -1;
  }

  clearState = () => {
    this.step = 0;
    this.clearPlayingField();
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

    // this.grid[24][25] = true;
    // this.grid[25][26] = true;
    // this.grid[26][24] = true;
    // this.grid[26][25] = true;
    // this.grid[26][26] = true;

    // this.grid[0][0] = true;
    // this.grid[49][49] = true;    
  }

  private clearPlayingField = () => {
    this.playingFieldGrid = [];
  }

  private calculateNextState = (x: number, y: number) => {
    let neighbours = 0;
    if (this.grid[x - 1][y - 1]) neighbours++;
    if (this.grid[x - 1][y]) neighbours++;
    if (this.grid[x - 1][y + 1]) neighbours++;
    if (this.grid[x][y - 1]) neighbours++;
    if (this.grid[x][y + 1]) neighbours++;
    if (this.grid[x + 1][y - 1]) neighbours++;
    if (this.grid[x + 1][y]) neighbours++;
    if (this.grid[x + 1][y + 1]) neighbours++;

    if (neighbours === 2 || neighbours === 3) {
      if (neighbours === 3 || this.grid[x][y]) {
      this.aliveGrid.push(new Cell(x, y));
      //console.log('aliveGrid: ' + x + ',' + y);
      }
    }
    if (neighbours < 2 || neighbours > 3) {
      this.deadGrid.push(new Cell(x, y));
      //console.log('deadGrid: ' + x + ',' + y);
    }
  }
}