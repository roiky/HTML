import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SettingsService {
    public styleObject: { bg: string } = { bg: "none" }
    getStyleIbject() {
        return this.styleObject;
    }
    setStyleObject(obj: { bg: string }) {
        if (obj) this.styleObject = obj;
    }
}
