import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { fromEvent, debounceTime } from 'rxjs';
const data = [
    {
        "name": "Alice Johnson",
        "age": 28,
        "phone": "555-123-4567"
    },
    {
        "name": "Brian Smith",
        "age": 34,
        "phone": "555-234-5678"
    },
    {
        "name": "Catherine Lee",
        "age": 22,
        "phone": "555-345-6789"
    },
    {
        "name": "Daniel Kim",
        "age": 30,
        "phone": "555-456-7890"
    },
    {
        "name": "Eva Martinez",
        "age": 27,
        "phone": "555-567-8901"
    },
    {
        "name": "Frank Williams",
        "age": 41,
        "phone": "555-678-9012"
    },
    {
        "name": "Grace Liu",
        "age": 26,
        "phone": "555-789-0123"
    },
    {
        "name": "Henry Brown",
        "age": 33,
        "phone": "555-890-1234"
    },
    {
        "name": "Isabella Davis",
        "age": 29,
        "phone": "555-901-2345"
    },
    {
        "name": "Jack Wilson",
        "age": 38,
        "phone": "555-012-3456"
    }
]


@Component({
    selector: 'app-users-list',
    imports: [CommonModule, FormsModule],
    templateUrl: './users-list.html',
    styleUrl: './users-list.css'
})
export class UsersList {
    public listOfUsers: Array<typeof data[0]> = data
    public userName: string = "Tomer Dan"
    public age: number = 20
    public phone: string = "05044545781"
    public selectedUserIndex: number = -1
    ngOnInit(): void {
        console.log("Do i need extend?")

    }

    checkIfOld(age: number) {
        if (age > 33) {
            return "Too OLD"
        } else {
            return age
        }
    }

    saveUser() {
        if (this.selectedUserIndex === -1) return;
        let currentUser = this.listOfUsers[this.selectedUserIndex];
        if (!this.listOfUsers[this.selectedUserIndex]) return;
        this.listOfUsers[this.selectedUserIndex] = { age: this.age, name: this.userName, phone: this.phone }
    }

    setSelectedUser(index: number) {
        if (index === -1) return;
        this.selectedUserIndex = index
        const currentUser = this.listOfUsers[index];
        if (currentUser) {
            this.age = currentUser.age
            this.userName = currentUser.name
            this.phone = currentUser.phone
        }
    }

    clear() {
        this.selectedUserIndex = -1
        this.userName = ""
        this.age = 0
        this.phone = ""
    }

} 