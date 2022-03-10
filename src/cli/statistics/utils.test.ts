import {
    findTheLongestPathUtil,
    findTheLongestPathWithMostPopularTagUtil,
    extractTag,
    makeUnique,
    findMostCommonlyUsed,
} from './utils';
import {domTreeMock} from './mocks';

describe('findTheLongestPath', () => {
    test('should extract a tag from a string', () => {
        expect(extractTag('<select>')).toBe('select');
        expect(extractTag('<a ')).toBe('a');
        expect(extractTag('<img/>')).toBe('img/');
    });

    test('should make an array with unique values', () => {
        expect(makeUnique(['a', 'div', 'img', 'div', 'a', 'select'])).toEqual(['a', 'div', 'img', 'select']);
        expect(makeUnique([
            'html',   'head',    'meta',    'link',
            'script', 'title',   'body',    'div',
            'a',      'span',    'svg',     'path',
            'header', 'button',  'nav',     'ul',
            'li',     'details', 'summary', 'form',
            'label',  'input',   'img',     'template',
            'main',   'p',       'dl',      'dt',
            'dd',     'video',   'source',  'filter',
            'stop',   'circle',  'g',       'picture',
            'strong', 'pre',     'br',      'rect',
            'footer', 'a', 'p', 'summary', 'nav', 'footer'
        ])).toEqual([
            'html',   'head',    'meta',    'link',
            'script', 'title',   'body',    'div',
            'a',      'span',    'svg',     'path',
            'header', 'button',  'nav',     'ul',
            'li',     'details', 'summary', 'form',
            'label',  'input',   'img',     'template',
            'main',   'p',       'dl',      'dt',
            'dd',     'video',   'source',  'filter',
            'stop',   'circle',  'g',       'picture',
            'strong', 'pre',     'br',      'rect',
            'footer'
        ]);
    });

    test('should find the most commonly used tag', () => {
        expect(findMostCommonlyUsed(['a', 'div', 'img', 'div', 'a', 'select', 'div'])).toEqual({ tag: 'div', amount: 3 });
        expect(findMostCommonlyUsed([
            'html',   'head',    'meta',    'link',
            'script', 'title',   'body',    'div',
            'a',      'span',    'svg',     'path',
            'header', 'button',  'nav',     'ul',
            'li',     'details', 'summary', 'form',
            'label',  'input',   'img',     'template',
            'main',   'p',       'dl',      'dt',
            'dd',     'video',   'source',  'filter',
            'stop',   'circle',  'g',       'picture',
            'strong', 'pre',     'br',      'rect',
            'footer', 'a', 'p', 'summary', 'nav', 'footer', 'footer'
        ])).toEqual({ tag: 'footer', amount: 3 });
        expect(findMostCommonlyUsed(['a', 'div', 'ul', 'a'])).toEqual({ tag: 'a', amount: 2 });
    });

    test('should find the longest path starting from root node to the descendent', () => {
        expect(findTheLongestPathUtil(domTreeMock as HTMLElement)).toEqual(['html', 'body', 'div', 'div', 'p', 'a']);
    });

    test('should find the longest path starting from root node where the most popular tag is used the most times', () => {
        expect(findTheLongestPathWithMostPopularTagUtil(domTreeMock as HTMLElement, 'div')).toEqual(['html', 'body', 'div', 'div', 'div', 'div']);
    });
});
