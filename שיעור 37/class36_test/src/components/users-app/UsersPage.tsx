import { useState } from "react";

export default function UsersPage() {
    const [users, setUsers] = useState([]);

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
    });

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

    function handleSubmit(event: React.FormEvent) {
        event.preventDefault();

        if (!formData.firstName || !formData.email) return;
        setUsers((prev) => [...prev, formData]);
        setFormData({ firstName: "", lastName: "", email: "", phone: "" });
    }

    return (
        <div>
            <h1>Users Page</h1>

            <form onSubmit={handleSubmit}>
                <input name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} />
                <input name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} />
                <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
                <input name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} />
                <button type="submit">Add User</button>
            </form>

            <table>
                <thead>
                    <tr>
                        {/* <th>#</th> */}
                        <th>First</th>
                        <th>Last</th>
                        <th>Email</th>
                        <th>Phone</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((u, i) => (
                        <tr key={i}>
                            {/* <td>{i + 1}</td> */}
                            <td>{u.firstName}</td>
                            <td>{u.lastName}</td>
                            <td>{u.email}</td>
                            <td>{u.phone}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
