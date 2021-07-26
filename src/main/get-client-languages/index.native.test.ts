import { parseAppleKeyboards } from './index.native'

describe('parseAppleKeyboards', () => {

  test('Set 1', () => {
    const output = parseAppleKeyboards([
      'en_US@sw=QWERTY;hw=Automatic',
      'emoji@sw=Emoji',
      'en_US@sw=QWERTY;hw=Automatic',
    ])
    expect(output).toStrictEqual([
      'en_US',
      'emoji',
      'en_US',
    ])
  })

  test('Set 2', () => {
    const output = parseAppleKeyboards([
      'en_US@sw=QWERTY;hw=Automatic',
      'emoji@sw=Emoji',
    ])
    expect(output).toStrictEqual([
      'en_US',
      'emoji',
    ])
  })

  test('Set 3', () => {
    const output = parseAppleKeyboards([
      'ja_JP-Kana@sw=Kana;hw=US',
      'en_US@sw=QWERTY;hw=Automatic',
      'emoji@sw=Emoji'
    ])
    expect(output).toStrictEqual([
      'ja_JP-Kana',
      'en_US',
      'emoji',
    ])
  })

})
