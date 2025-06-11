import { useState } from "react";
import AddUser from "./addUser";
import UsersTable from "./usersTable";

export type User = { userName: string; userLastName: string; userEmail: string; userPhone: string };

export default function UsersPage() {
    const [users, setUsers] = useState<Array<User>>([]);
    function addUserHandler(newUser: User) {
        setUsers([...users, newUser]);
    }
    return (
        <div>
            <AddUser handler={addUserHandler} />
            <UsersTable usersArray={users} />
        </div>
    );
}
