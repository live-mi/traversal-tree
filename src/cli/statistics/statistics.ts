import { parse } from 'node-html-parser';
import { fetchPage } from './fetch';
import { Config } from './types';
import {
    findTheLongestPathUtil,
    findTheLongestPathWithMostPopularTagUtil,
    extractTag,
    makeUnique,
    findMostCommonlyUsed
} from './utils';

export const statistics = async ({ url }: Config) => {
    const html = await fetchPage(url);
    const root = parse(html);
    const regExp = new RegExp(/<([a-z])+[\s|>]/g);
    const matches = html.match(regExp);
    if (matches) {
        const allTags = matches.map(extractTag);
        const uniqueTags = makeUnique(allTags);
        const {amount, tag} = findMostCommonlyUsed(allTags);
        const longestPathFromRoot = findTheLongestPathUtil(root);
        const longestPathWithMostPopularTag = findTheLongestPathWithMostPopularTagUtil(root, tag);

        console.log('1. Unique tags:', uniqueTags);
        console.log('2. The most commonly used tags: ', `{${tag} => ${amount}}`);
        console.log('3. The longest path from the root:', `\nLength: ${longestPathFromRoot.length}`, `\nPath: `, longestPathFromRoot);
        console.log('4. The longest path from the root where the most popular tag is used the most times:', `\nLength: ${longestPathWithMostPopularTag.length}`, `\nPath: `, longestPathWithMostPopularTag);
    }

}
