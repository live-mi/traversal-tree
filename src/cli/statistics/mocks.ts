export const domTreeMock = {
    rawTagName: 'html',
    childNodes: [
        { rawTagName: 'head', childNodes: [{ rawTagName: 'meta' }, { rawTagName: 'link'} ] },
        {
            rawTagName: 'body',
            childNodes: [
                {
                    rawTagName: 'div',
                    childNodes: [
                        { rawTagName: 'div' },
                        { rawTagName: 'div',
                            childNodes: [{ rawTagName: 'p', childNodes: [{ rawTagName: 'a' }] }]
                        }]
                },
                { rawTagName: 'div', childNodes: [
                        { rawTagName: 'div', childNodes: [
                                { rawTagName: 'div', childNodes: [{ rawTagName: 'div' }]}
                            ]}
                    ]}
            ]
        },
    ],
} as const;
