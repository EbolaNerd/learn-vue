import nextElementInList from '../../../src/utils/nextElementInList';

describe('nextElementInList', () => {
  it('locates element in list and returns the next element in the list', () => {
    const list = ['a', 'b', 'c', 'd'];
    const value = 'd';
    const result = nextElementInList(list, value);
    expect(result).toBe('a');
  });
});
