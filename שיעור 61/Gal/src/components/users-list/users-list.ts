import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User, UsersService } from '../../services/users/users';



@Component({
    standalone: true,
    selector: 'app-users-list',
    imports: [CommonModule, FormsModule],
    templateUrl: './users-list.html',
    styleUrl: './users-list.css'
})
export class UsersList {
    public listOfUsers: Array<User> = []
    public userName: string = "Tomer Dan"
    public age: number = 20
    public phone: string = "05044545781"
    public selectedUserIndex: number = -1
    public errorMessage: string = ""
    public isLoading: boolean = true;

    constructor(public userService: UsersService) { }
    ngOnInit(): void {
        // console.log("ngOnInit executed!")
        // this.userService.getUsers().subscribe({
        //     next: (data) => {
        //         this.listOfUsers = data.results;
        //         this.isLoading = false;
        //     },
        //     error: (error) => {
        //         console.log(error)
        //         this.errorMessage = "Seomthing went Wrong"
        //     }
        // })

        this.userService.getUsersPromise().then((d) => {
            console.log(d.results, "in component update!")
            this.isLoading = true;
            this.listOfUsers = d.results;
        }).catch(() => {
            this.errorMessage = "Seomthing went Wrong"
        }).finally(() => {
            this.isLoading = false;
        })
    }
    checkIfOld(age: number | undefined) {
        if (!age) return 0;
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
        // this.listOfUsers[this.selectedUserIndex] = { age: this.age, name: this.userName, phone: this.phone }
    }

    setSelectedUser(index: number) {
        if (index === -1) return;
        this.selectedUserIndex = index
        const currentUser = this.listOfUsers[index];
        if (currentUser) {
            // this.age = currentUser.age
            // this.userName = currentUser.name
            // this.phone = currentUser.phone
        }
    }

    clear() {
        this.selectedUserIndex = -1
        this.userName = ""
        this.age = 0
        this.phone = ""
    }

} 