import type { FactoryClient } from "./service/getFactoriesApi";

type PieChartData = Array<{ id: number; label: string; value: number }>;

export function getFactoriesByKey(factories: Array<Partial<FactoryClient>>, key: keyof FactoryClient): PieChartData {
    const result = factories.reduce((acc, currentFactory) => {
        const groupKey = currentFactory[key];
        if (!key || !groupKey) return acc;
        if (acc[groupKey as string]) {
            acc[groupKey as string] += 1;
        } else {
            acc[groupKey as string] = 1;
        }

        return acc;
    }, {} as { [key: string]: number });

    return Object.entries(result).map(([key, value], index) => {
        return { id: index, value, label: key };
    });
}
