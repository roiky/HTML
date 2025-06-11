//type User = { userName: string; userLastName: string; userEmail: string; userPhone: string };

import type { User } from ".";
import css from "./custonStyle.module.css";

export default function UsersTable(props: { usersArray: Array<User> }) {
    return (
        <div>
            <table id="customers">
                <tr className={css.customers}>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                </tr>
                {props.usersArray.map((u) => {
                    return (
                        <tr className={css.customers}>
                            <td>{u.userName}</td>
                            <td>{u.userLastName}</td>
                            <td>{u.userEmail}</td>
                            <td>{u.userPhone}</td>
                        </tr>
                    );
                })}
            </table>
        </div>
    );
}
