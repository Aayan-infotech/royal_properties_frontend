// Data source: https://open.toronto.ca/dataset/street-tree-data/
import trees from './trees.json';

for (let i = 0; i < trees.length; i++) {
    trees[i].key = `tree-${i}`;
}

/**
 * Simulates async loading of the dataset from an external source.
 * (data is inlined for simplicity in our build process)
 */
export async function loadTreeDataset() {
    // simulate loading the trees from an external source
    return new Promise(resolve => {
        setTimeout(() => resolve(trees), 500);
    });
}

export function getCategories(trees) {
    if (!trees) return [];

    const countByCategory = {};
    for (const t of trees) {
        if (!countByCategory[t.category]) countByCategory[t.category] = 0;
        countByCategory[t.category]++;
    }

    return Object.entries(countByCategory).map(([key, value]) => {
        const label = key.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
        return {
            key: key,
            label,
            count: value
        };
    });
}

export default trees;