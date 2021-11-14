import { parse } from 'node-html-parser';
import {extractTag, makeUnique, findMostCommonlyUsed, findTheLongestPathFromRoot, traversal, traverseDF } from './helpers';
import { fetchPage } from './fetch';
import { Config } from './types';

export const statistics = async ({ url }: Config) => {
    const html = await fetchPage(url);
    const root = parse(html);
    const regExp = new RegExp(/<([a-z])+[\s|>]/g);
    const matches = html.match(regExp);
    if (matches) {
        const allTags = matches.map(extractTag);
        const uniqueTags = makeUnique(allTags);
        const mostCommonlyUsedTag = findMostCommonlyUsed(allTags);
        const longestPathFromRoot = findTheLongestPathFromRoot(root);
        const path = traverseDF(root);
        console.log({ uniqueTags, mostCommonlyUsedTag, longestPathFromRoot })
        console.log(path);
    }

}
