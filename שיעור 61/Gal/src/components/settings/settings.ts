import { Component } from '@angular/core';
import { SettingsService } from '../../services/settings/settings';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-settings',
    imports: [FormsModule, CommonModule],
    templateUrl: './settings.html',
    styleUrl: './settings.css'
})
export class Settings {
    public bg: string = ""

    constructor(public settingsService: SettingsService) {
    }

    setFn() {
        this.settingsService.setStyleObject({ bg: this.bg })
    }
}
