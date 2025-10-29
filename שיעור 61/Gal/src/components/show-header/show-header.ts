import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
    selector: 'app-show-header',
    imports: [CommonModule],
    templateUrl: './show-header.html',
    styleUrl: './show-header.css'
})
export class ShowHeader {
    public showMesage: boolean = false

    toggle() {
        this.showMesage = !this.showMesage
    }

}
