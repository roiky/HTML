// src/components/VacationFormModal.tsx
import React, { useEffect, useState } from "react";
import { z } from "zod";

const vacationSchema = z.object({
    destination: z.string().min(2, "Destination is required"),
    description: z.string().min(10, "Description must be at least 10 chars"),
    start_date: z.string().min(1, "Start date is required"),
    end_date: z.string().min(1, "End date is required"),
    price: z
        .union([z.string().regex(/^\d+(\.\d{1,2})?$/), z.number()])
        .transform((v) => Number(v))
        .refine((n) => n >= 0 && n <= 10000, "Price must be between 0 and 10000"),
    // image omitted from schema (handled separately)
});

type Props = {
    open: boolean;
    initial?: {
        destination?: string;
        description?: string;
        start_date?: string;
        end_date?: string;
        price?: number;
        image_name?: string | null;
    } | null;
    mode: "add" | "edit";
    onClose: () => void;
    onSave: (form: {
        destination: string;
        description: string;
        start_date: string;
        end_date: string;
        price: number;
        image?: File | null;
    }) => Promise<void>;
};

export default function VacationFormModal({ open, initial, mode, onClose, onSave }: Props) {
    const [destination, setDestination] = useState(initial?.destination ?? "");
    const [description, setDescription] = useState(initial?.description ?? "");
    const [startDate, setStartDate] = useState(initial?.start_date ?? "");
    const [endDate, setEndDate] = useState(initial?.end_date ?? "");
    const [price, setPrice] = useState(initial?.price?.toString() ?? "0.00");
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (open) {
            setDestination(initial?.destination ?? "");
            setDescription(initial?.description ?? "");
            setStartDate(initial?.start_date ?? "");
            setEndDate(initial?.end_date ?? "");
            setPrice(initial?.price?.toString() ?? "0.00");
            setImageFile(null);
            setErrors({});
        }
    }, [open, initial]);

    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const f = e.target.files?.[0] ?? null;
        setImageFile(f);
    }

    function todayIsoLocal() {
        const d = new Date();
        const tz = d.getTimezoneOffset() * 60000;
        const local = new Date(d.getTime() - tz);
        return local.toISOString().slice(0, 16); // YYYY-MM-DDTHH:mm for input type=datetime-local
    }

    async function handleSubmit(e?: React.FormEvent) {
        e?.preventDefault();
        setErrors({});

        // local validation with zod first
        const parsed = vacationSchema.safeParse({
            destination,
            description,
            start_date: startDate,
            end_date: endDate,
            price,
        });

        if (!parsed.success) {
            const fmt: Record<string, string> = {};
            const zodErr = parsed.error;
            for (const k of Object.keys(zodErr)) {
                fmt[k] = (zodErr as any)[k]?.[0] ?? "Invalid";
            }
            setErrors(fmt);
            return;
        }

        // Additional business rules:
        const start = new Date(startDate);
        const end = new Date(endDate);
        const now = new Date();

        if (mode === "add") {
            // can't choose past dates for add
            if (start.getTime() < now.setSeconds(0, 0)) {
                setErrors((s) => ({ ...s, start_date: "Start date cannot be in the past" }));
                return;
            }
        }

        if (end.getTime() < start.getTime()) {
            setErrors((s) => ({ ...s, end_date: "End date must be >= start date" }));
            return;
        }

        // build payload and call onSave
        setSubmitting(true);
        try {
            await onSave({
                destination,
                description,
                start_date: startDate,
                end_date: endDate,
                price: Number(parsed.data.price),
                image: imageFile ?? undefined,
            });
            onClose();
        } catch (err: any) {
            setErrors({ form: err?.message ?? "Save failed" });
        } finally {
            setSubmitting(false);
        }
    }

    if (!open) return null;

    return (
        <div style={modalBackdrop}>
            <div style={modalBox}>
                <h3>{mode === "add" ? "Add Vacation" : "Edit Vacation"}</h3>
                {errors.form && <div style={{ color: "red" }}>{errors.form}</div>}
                <form onSubmit={handleSubmit} style={{ display: "grid", gap: 8 }}>
                    <label>
                        Destination
                        <input value={destination} onChange={(e) => setDestination(e.target.value)} />
                        {errors.destination && <div style={{ color: "red" }}>{errors.destination}</div>}
                    </label>

                    <label>
                        Description
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
                        {errors.description && <div style={{ color: "red" }}>{errors.description}</div>}
                    </label>

                    <label>
                        Start
                        <input type="datetime-local" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                        {errors.start_date && <div style={{ color: "red" }}>{errors.start_date}</div>}
                    </label>

                    <label>
                        End
                        <input type="datetime-local" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                        {errors.end_date && <div style={{ color: "red" }}>{errors.end_date}</div>}
                    </label>

                    <label>
                        Price
                        <input value={price} onChange={(e) => setPrice(e.target.value)} />
                        {errors.price && <div style={{ color: "red" }}>{errors.price}</div>}
                    </label>

                    <label>
                        Image (optional on edit)
                        <input type="file" accept="image/*" onChange={handleFileChange} />
                    </label>

                    <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", marginTop: 8 }}>
                        <button type="button" onClick={onClose} disabled={submitting}>
                            Cancel
                        </button>
                        <button type="submit" disabled={submitting}>
                            {submitting ? "Saving…" : mode === "add" ? "Create" : "Save"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

/* basic inline modal styles */
const modalBackdrop: React.CSSProperties = {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.4)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
};

const modalBox: React.CSSProperties = {
    background: "#fff",
    color: "#111",
    padding: 20,
    borderRadius: 8,
    width: "min(720px, 95%)",
    maxHeight: "90vh",
    overflow: "auto",
};
