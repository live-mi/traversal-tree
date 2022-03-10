import HTMLElement from 'node-html-parser/dist/nodes/html';

export const extractTag = (match: string) => {
    return match
        .replace(/[<|>]/g, '')
        .trim();
}

export const makeUnique = (items: string[]): string[] => {
    const itemsMap = items.reduce((acc, item: string) => ({
        ...acc,
        [item]: true
    }), {});

    return Object.keys(itemsMap);
}

type KeyValue = Record<string, number>;
type MostCommonlyUsedReturnType = {
    amount: number
    tag: string
}

export const findMostCommonlyUsed = (items: string[]): MostCommonlyUsedReturnType  => {
    const numberMap: KeyValue = items.reduce((acc: KeyValue, item: string) => {
        if (!acc[item]) {
            acc[item] = 0;
        }
        acc[item] += 1;
        return acc;
    }, {});
    const [tag, amount] = Object.keys(numberMap).reduce((acc, item) => {
        const [, number] = acc;
        if (numberMap[item] > number) {
            return [item, numberMap[item]];
        }
        return acc;
    }, ['', 0]);
    return { amount, tag };
}

const checkIfChildrenExist = (node: HTMLElement): boolean => {
    return Array.isArray(node.childNodes) && node.childNodes.length > 0
}

export const findTheLongestPathUtil = (root: HTMLElement): string[] => {
    let maxDepth = 0;
    let longestPath = [];

    const findTheLongestPath = (root: HTMLElement, path: string[], depth: number) => {
        if (!checkIfChildrenExist(root)) {
            if (root.rawTagName) {
                path = [...path, root.rawTagName];
                depth += 1;
            }
            if (maxDepth < depth) {
                maxDepth = depth;
                longestPath = path;
            }
            return;
        }

        for (let i = 0; i < root.childNodes?.length; i++) {
            findTheLongestPath(root.childNodes[i] as HTMLElement, [...path, root.rawTagName], depth + 1);
        }
    }

    if (!root) {
        return [];
    }
    findTheLongestPath(root, [], 0);

    return longestPath.filter(Boolean);
}

export const findTheLongestPathWithMostPopularTagUtil = (root: HTMLElement, tag: string): string[] => {
    let longestPath = [];

    const findTheLongestPath = (root: HTMLElement, path: string[], depth: number) => {
        if (!checkIfChildrenExist(root)) {
            if (root.rawTagName) {
                path = [...path, root.rawTagName];
                depth += 1;
            }
            const longestPathPopularTagsAmount = longestPath.filter((item) => item === tag).length;
            const pathPopularTagsAmount = path.filter((item) => item === tag).length;
            if (pathPopularTagsAmount > longestPathPopularTagsAmount
                || (pathPopularTagsAmount === longestPathPopularTagsAmount && path.length > longestPath.length)) {
                longestPath = path;
            }
        }

        for (let i = 0; i < root.childNodes?.length; i++) {
            findTheLongestPath(root.childNodes[i] as HTMLElement, [...path, root.rawTagName], depth + 1);
        }
    }

    if (!root) {
        return [];
    }
    findTheLongestPath(root, [], 0);

    return longestPath.filter(Boolean);
}

