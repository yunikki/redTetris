const sum = require('../src/client/sum.js');

test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
});

test('special return when A equals 0', () => {
    expect(sum(0, 2)).toBe(42);
});
