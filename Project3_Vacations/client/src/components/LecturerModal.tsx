import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";

type LecturerModalProps = {
    open: boolean;
    onClose: () => void;
    onSave: (data: { first_name: string; last_name: string; age: number; email: string; course_count: number }) => void;
};

export default function LecurerModal({ open, onClose, onSave }: LecturerModalProps) {
    const [firstName, setFirstName] = useState<string>("");
    const [lasttName, setLastName] = useState<string>("");
    const [age, setAge] = useState<number>();
    const [email, setMail] = useState<string>("");
    const [courseCount, setCourseCount] = useState<number>();

    const isSaveDisabled = !firstName || !lasttName || !age || !email || !courseCount; //cant save until the user filled

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isSaveDisabled) return;
        onSave({ first_name: firstName, last_name: lasttName, age: age, email: email, course_count: courseCount });
        onClose();
        // cleanup
        handleCleanup();
    };

    const handleCleanup = () => {
        setFirstName("");
        setLastName("");
        setAge(0);
        setMail("");
        setCourseCount(0);
    };

    return (
        <Dialog
            open={open}
            onClose={() => {
                onClose();
                handleCleanup();
            }}
            fullWidth
        >
            <DialogTitle>Create New Lecturer</DialogTitle>

            <form onSubmit={handleSubmit}>
                <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
                    <TextField
                        label="First Name"
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        fullWidth
                        required
                    ></TextField>

                    <TextField
                        label="Last Name"
                        type="text"
                        value={lasttName}
                        onChange={(e) => setLastName(e.target.value)}
                        fullWidth
                        required
                    ></TextField>

                    <TextField
                        label="Age"
                        type="number"
                        value={age}
                        onChange={(e) => setAge(Number(e.target.value))}
                        fullWidth
                        required
                    />

                    <TextField
                        label="Email"
                        type="text"
                        value={email}
                        onChange={(e) => setMail(e.target.value)}
                        fullWidth
                        required
                    />
                    <TextField
                        label="Course Count"
                        type="number"
                        value={courseCount}
                        onChange={(e) => setCourseCount(Number(e.target.value))}
                        fullWidth
                        required
                    />
                </DialogContent>

                <DialogActions>
                    <Button
                        onClick={() => {
                            onClose();
                            handleCleanup();
                        }}
                    >
                        Cancel
                    </Button>
                    <Button type="submit" variant="contained" disabled={isSaveDisabled}>
                        Save
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}
