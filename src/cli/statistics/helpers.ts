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

export const findMostCommonlyUsed = (items: string[]): { [key: string]: number } => {
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
    return { [tag]: amount };
}

export const traversal = (root: HTMLElement) => {
    if (!root) {
        return [];
    }
    let depth = 0;
    const queue = [root];
    const paths = [];
    const pathsDetails = [root.rawTagName];

    while (queue.length) {
        let size = queue.length;
        paths.push(queue.map(node => node.rawTagName).filter(Boolean));

        while (size) {
            let node = queue.shift();
            if (node && node.childNodes) {
                for (let child of node.childNodes) {
                    // @ts-ignore
                    queue.push(child);
                }
            }
            size -= 1;
        }
        depth += 1;
    }
    // return { paths, depth, length: paths.length };
    return depth;
}

export const traverseDF = (root: HTMLElement): number => {
    const stack: Array<HTMLElement>  = [root];
    const path = [];
    const levels = [];
    let depth = 0;
    let maxDepth = 0;
    while (stack.length) {
        const node = stack.shift();
        path.push(node?.rawTagName);
        levels.push();
        if (node?.childNodes && node?.childNodes.length > 0) {
            // @ts-ignore
            const notEmptyNodes = Array.from(node.childNodes).filter((node) => Boolean(node?.rawTagName));
            // @ts-ignore
            stack.unshift(...notEmptyNodes);
            depth += 1;
        } else {
            path.push('null');
            if (depth > maxDepth) {
                maxDepth = depth;
            }
            depth = 0;
        }
    }
    return maxDepth;
}

export const findTheLongestPathFromRoot = (root: HTMLElement) => {
    if (!root) {
        return 0;
    }
    let depth = 0;
    let queue: HTMLElement[] = [root];

    while (queue.length) {
        for (let i = 0; i < queue.length; i++) {
            let node = queue.shift();
            if (node?.childNodes) {
                // @ts-ignore
                queue.push(...node.childNodes);
            }
        }
        depth += 1;
    }
    return depth;
}
