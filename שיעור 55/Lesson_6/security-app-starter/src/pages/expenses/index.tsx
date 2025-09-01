import { getUserDetailsApi } from "../../services/user.api";
import { getExpensesByDates } from "../../services/expenses.api";
import { useCallback, useEffect, useState } from "react";
import { RolesWrapper } from "@/components/RolesWrapper";
import DataTable from "./dataTable";

import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@mui/material";
import ExpenseModal from "@/components/ExpenseModal";
import { getExpensesCategories } from "@/services/expenses.categories.api";
import { createExpenseApi } from "@/services/expenses.create.api";

function formatDateInput(d: Date) {
    return d.toISOString().slice(0, 10);
}
export type UserDetailsResponse = {
    email: string;
    id: number;
    role: "admin" | "viewer" | "configurator";
};
export default function Expenses() {
    const [from, setFrom] = useState(formatDateInput(new Date(new Date().setMonth(new Date().getMonth() - 2))));

    const [to, setTo] = useState(formatDateInput(new Date()));
    const [loading, setLoading] = useState(false);
    const [expenses, setExpenses] = useState<any[]>([]);
    const [categories, setCategories] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [role, setRole] = useState<string>("");

    // Expense Modal - START
    const [modalOpen, setModalOpen] = useState(false);
    const handleOpenModal = () => setModalOpen(true);
    const handleCloseModal = () => setModalOpen(false);

    const handleSaveExpense = async (data: { category: string; amount: number; date: string; description: string }) => {
        try {
            const newExpense = await createExpenseApi({
                category: data.category,
                amount: Number(data.amount),
                date: data.date,
                description: data.description,
            });
            console.log(data);
            console.log(`Created new Expense, [ID = ${newExpense.id}]`);
            await load();
        } catch (error) {
            console.log(`[ERROR - create expense failed] ${error}`);
        }
    };
    // Expense Modal - END

    const load = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await getExpensesByDates({
                from: "2025-05-25 09:08:04",
                to: "2026-08-22 12:39:23",
            });
            const sortedData = res.sort(
                // @ts-ignore
                (a, b) => new Date(b.date) - new Date(a.date)
            );
            setExpenses(sortedData);
        } catch (e: any) {
            setError(e?.message ?? "Failed to load");
        } finally {
            setLoading(false);
        }
    }, []);

    async function loadCategories() {
        const categ = await getExpensesCategories();
        const categoryNames = categ.map((x: any) => x.category);
        //console.log(categoryNames);
        setCategories(categoryNames);
        console.log(categories);
    }
    async function getUserDetails() {
        try {
            const res: UserDetailsResponse = await getUserDetailsApi();
            setRole(res.role);
        } catch (e: any) {
        } finally {
        }
    }

    useEffect(() => {
        load();
        // getUserDetails();
        loadCategories();
    }, [load]);

    return (
        <section className="card">
            <div className="card-header">
                <h2>Expenses</h2>
                <RolesWrapper roles={["admin"]}>
                    <Button variant="contained" onClick={handleOpenModal}>
                        Create New Expense
                    </Button>
                </RolesWrapper>
            </div>
            <div>
                <DataTable rows={expenses} />
            </div>

            {/* MUI Modal */}
            <ExpenseModal open={modalOpen} onClose={handleCloseModal} onSave={handleSaveExpense} categories={categories} />
        </section>
    );
}
