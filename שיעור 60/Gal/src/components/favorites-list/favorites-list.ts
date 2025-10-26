import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-favorites-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './favorites-list.html',
  styleUrl: './favorites-list.css',
})
export class FavoritesList {
  public showList = true;

  toggleList() {
    this.showList = !this.showList;
  }
}
