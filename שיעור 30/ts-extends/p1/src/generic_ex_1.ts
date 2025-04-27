// Remove UsersApiResponse and AdminsApiResponse types
// and use generic type ApiResponse in order to specify API
// response formats for each of the functions.

interface User {
    type: "user";
    name: string;
    age: number;
    occupation: string;
}

interface Admin {
    type: "admin";
    name: string;
    age: number;
    role: string;
}

type Person = User | Admin;

const admins: Admin[] = [
    { type: "admin", name: "Jane Doe", age: 32, role: "Administrator" },
    { type: "admin", name: "Bruce Willis", age: 64, role: "World saver" },
];

const users: User[] = [
    {
        type: "user",
        name: "Max Mustermann",
        age: 25,
        occupation: "Chimney sweep",
    },
    { type: "user", name: "Kate Müller", age: 23, occupation: "Astronaut" },
];

export type ApiResponse<T> = unknown;

type AdminsApiResponse =
    | {
        status: "success";
        data: Admin[];
    }
    | {
        status: "error";
        error: string;
    };

export function requestAdmins(callback: (response: AdminsApiResponse) => void) {
    callback({
        status: "success",
        data: admins,
    });
}

type UsersApiResponse =
    | {
        status: "success";
        data: User[];
    }
    | {
        status: "error";
        error: string;
    };

export function requestUsers(callback: (response: UsersApiResponse) => void) {
    callback({
        status: "success",
        data: users,
    });
}