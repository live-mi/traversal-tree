import { extractTag, makeUnique, findMostCommonlyUsed, traversal, findTheLongestPathFromRoot, traverseDF } from './helpers';
import { domTreeMock } from './mocks';

describe('extractTag test suit', () => {
    test('should extract a tag from a string', () => {
        expect(extractTag('<select>')).toBe('select');
        expect(extractTag('<a ')).toBe('a');
        expect(extractTag('<img/>')).toBe('img/');
    });
});

describe('makeUnique test suit', () => {
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
});

describe('findMostCommonlyUsed test suit', () => {
    test('should find the most commonly used tag', () => {
        expect(findMostCommonlyUsed(['a', 'div', 'img', 'div', 'a', 'select', 'div'])).toEqual({ div: 3 });
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
        ])).toEqual({ footer: 3 });
        expect(findMostCommonlyUsed(['a', 'div', 'ul', 'a'])).toEqual({ a: 2 });
    });
});

describe('traversal test suit', () => {
    test('should find max depth of tree', () => {
        // @ts-ignore
        expect(traversal(domTreeMock, 'div')).toEqual(6);
        // @ts-ignore
        // expect(traversal(domTreeMock.childNodes[1])).toBe(5);
        // @ts-ignore
        // expect(traversal(domTreeMock.childNodes[1].childNodes[1])).toBe(4);
    });
});

describe('traverseDF test suit', () => {
    test('should find max depth of tree', () => {
        // @ts-ignore
        expect(traverseDF(domTreeMock, 'div')).toEqual(6);
        // @ts-ignore
        expect(traverseDF(domTreeMock.childNodes[1])).toBe(5);
        // @ts-ignore
        expect(traverseDF(domTreeMock.childNodes[1].childNodes[1])).toBe(4);
    });
});


