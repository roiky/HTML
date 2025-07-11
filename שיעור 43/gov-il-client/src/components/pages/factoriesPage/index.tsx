import { Box, CircularProgress, FormControl, InputLabel, MenuItem, Select } from "@mui/material";

import { useEffect, useState } from "react";
import { getFactoriesApi, type FactoryClient } from "./service/getFactoriesApi";
import { PieChart } from "@mui/x-charts/PieChart";
import { getFactoriesByKey } from "./utils";

export default function FactoryPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [factories, setFactories] = useState<Array<Partial<FactoryClient>>>([]);
    const [limit, setLimit] = useState("10");

    const limitOptions = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 1000];

    useEffect(() => {
        async function getFactories() {
            try {
                setIsLoading(true);
                const result = await getFactoriesApi(limit);
                setFactories(result);
                console.log(result);
            } catch (error) {
            } finally {
                setIsLoading(false);
            }
        }
        getFactories();
    }, [limit]);

    const factoriesPerLocationReport = getFactoriesByKey(factories, "localAuthority");
    const factoriesPerMachozReport = getFactoriesByKey(factories, "district");

    const handleChange = (event: any) => {
        setLimit(event.target.value as string);
    };

    return isLoading ? (
        <CircularProgress />
    ) : (
        <div style={{ margin: "auto", width: "80%" }}>
            <h1> Factory Page</h1>
            <div>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Records to get</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={limit}
                        label="Age"
                        onChange={handleChange}
                    >
                        {/* <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={20}>20</MenuItem>
                        <MenuItem value={30}>30</MenuItem> */}

                        {limitOptions.map((l) => (
                            <MenuItem key={l} value={l}>
                                {l}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>
            <div>
                <h3 style={{ textAlign: "center" }}>Facories Per Local Authority</h3>
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
                <h3 style={{ textAlign: "center" }}>Facories Per Machoz</h3>
                <Box component="form" sx={{ "& > :not(style)": { m: 1 } }} noValidate autoComplete="off">
                    <PieChart
                        series={[
                            {
                                data: factoriesPerMachozReport,
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
