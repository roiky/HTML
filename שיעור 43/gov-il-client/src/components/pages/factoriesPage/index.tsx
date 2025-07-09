import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";

import { useEffect, useState } from "react";
import { getFactoriesApi, type FactoryClient } from "./service/getFactoriesApi";
import { PieChart } from "@mui/x-charts/PieChart";
import { getFactoriesReport } from "./utils";

export default function FactoryPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [factories, setFactories] = useState<Array<Partial<FactoryClient>>>([]);

    useEffect(() => {
        async function getFactories() {
            try {
                setIsLoading(true);
                const result = await getFactoriesApi();
                setFactories(result);
            } catch (error) {
            } finally {
                setIsLoading(false);
            }
        }
        getFactories();
    }, []);

    const factoriesPerLocationReport = getFactoriesReport(factories);

    const handleChange = () => {
        console.log("changed");
    };
    return (
        <div style={{ margin: "auto", width: "80%" }}>
            <h1> Factory Page</h1>
            <div>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Age</InputLabel>
                    <Select labelId="demo-simple-select-label" id="demo-simple-select" value={10} label="Age" onChange={handleChange}>
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={20}>20</MenuItem>
                        <MenuItem value={30}>30</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <div>
                <Box component="form" sx={{ "& > :not(style)": { m: 1 } }} noValidate autoComplete="off">
                    <PieChart
                        series={[
                            {
                                data: factoriesPerLocationReport,
                            },
                        ]}
                        width={400}
                        height={400}
                    />
                </Box>
            </div>
        </div>
    );
}
