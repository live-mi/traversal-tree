import HTMLElement from 'node-html-parser/dist/nodes/html';

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
    return depth;
}

export const traverseDFS = (root) => {
    const stack = [root];
    let maxPath = [];
    const path = [];
    while (stack.length) {
        const node = stack.shift();
        path.push(node);
        if (node?.childNodes && node?.childNodes.length > 0) {
            //@ts-ignore
            const notEmptyNodes = Array.from(node.childNodes).filter((node) => Boolean(node?.rawTagName));
            stack.unshift(...notEmptyNodes);
        } else {
            if (maxPath.length < path.length) {
                maxPath = [...path];
                path.pop();
            }
        }
    }
    return maxPath.map(node => node.rawTagName).filter(Boolean);
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

export const traversalBFS = (valueKey: string) => (root) => {
    if (!root) {
        return [];
    }
    const queue = [root];
    const nodes = [];

    while (queue.length) {
        let queueLength = queue.length;
        nodes.push(queue.map((node) => node.rawTagName).filter(Boolean));
        while (queueLength--) {
            let node = queue.shift();
            for (let child of node[valueKey]) {
                queue.push(child);
            }
        }
    }

    return nodes.filter((node) => node.length);
}

export const inorder = (node) => {
    if (node == null) {
        return;
    }
    const total = node.childNodes.length;
    for (let i = 0; i < total - 1; i++) {
        inorder(node.childNodes[i]);
    }
    console.log('inorder', node.rawTagName);
    inorder(node.childNodes[total - 1]);
}

export const _traverseDFS = (root): string[] => {
    const stack = [root];
    const path = [];
    let nodeWithChildren;
    while (stack.length) {
        const node = stack.shift();
        path.push(node);
        if (node?.childNodes && node?.childNodes.length > 0) {
            nodeWithChildren = node;
            stack.unshift(...node.childNodes);
        }
    }
    if (nodeWithChildren) {
        nodeWithChildren.childNodes.shift();
    }
    return path.map(node => node.rawTagName).filter(Boolean);
}
