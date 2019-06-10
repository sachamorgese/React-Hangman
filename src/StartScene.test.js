import { onlyLettersRegex } from './StartScene';

describe('StartScene', () => {
  it('correctly returns only the lowercase letters in a string', () => {
    expect('123asd123'.match(onlyLettersRegex).join('')).toEqual('asd');
    expect(
      "TEST,./'hello123worldNANA".match(onlyLettersRegex).join(''),
    ).toEqual('helloworld');
    expect('%&^*()no'.match(onlyLettersRegex).join('')).toEqual('no');
  });
});
