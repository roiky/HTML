import { lazy, Suspense } from "react";
// import BasicPie from "./dummyComp/chart2";
// import DonutChart from "./dummyComp/charts";
const LazyChartOne = lazy(() => import("./dummyComp/charts"));
const LazyChartTwo = lazy(() => import("./dummyComp/chart2"));

export default function HeavyPage() {
    return (
        <>
            <div>
                <h1>Heavy Page</h1>
            </div>
            <Suspense fallback={<div>Loading Chart One...</div>}>
                <LazyChartOne />
            </Suspense>
            <Suspense fallback={<div>Loading Chart Two...</div>}>
                <LazyChartTwo />
            </Suspense>
        </>
    );
}
