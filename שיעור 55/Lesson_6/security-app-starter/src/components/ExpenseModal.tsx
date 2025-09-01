import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";

type ExpenseModalProps = {
    open: boolean;
    onClose: () => void;
    onSave: (data: { category: string; amount: number; date: string; description: string }) => void;
    categories: string[];
};

export default function ExpenseModal({ open, onClose, onSave, categories }: ExpenseModalProps) {
    const [category, setCategory] = useState<string>("");
    const [amount, setAmount] = useState<string>("");
    const [date, setDate] = useState<string>("");
    const [description, setDesc] = useState<string>("");

    useEffect(() => {
        if (open && categories.length && !category) {
            setCategory(categories[0]);
        }
    }, [open, categories, category]);

    const isSaveDisabled = !category || !amount || !date;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isSaveDisabled) return;
        onSave({ category, amount: Number(amount), date, description });
        onClose();
        // cleanup
        handleCleanup();
    };

    const handleCleanup = () => {
        setCategory("");
        setAmount("");
        setDate("");
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
            <DialogTitle>Create New Expense</DialogTitle>

            <form onSubmit={handleSubmit}>
                <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
                    {/* Categories DDL */}
                    <TextField
                        select
                        label="Category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        fullWidth
                        required
                    >
                        {categories.map((name) => (
                            <MenuItem key={name} value={name}>
                                {name}
                            </MenuItem>
                        ))}
                    </TextField>

                    <TextField
                        label="Amount"
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        fullWidth
                        required
                    />

                    <TextField
                        label="Date"
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                        required
                    />
                    <TextField
                        label="Description"
                        type="text"
                        value={description}
                        onChange={(e) => setDesc(e.target.value)}
                        InputLabelProps={{ shrink: true }}
                        fullWidth
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
