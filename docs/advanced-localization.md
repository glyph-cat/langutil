# Advanced Localization

In rare cases, you might need to get values that are localized into a different language from the one currently set, this is when `.localizeExplicitly` and `localizeFromScratch` become useful.

```js
import { createLangutilCore, localizeFromScratch } from 'langutil'

const dictionary = {
  en: {
    SOMETIMES_IM_A_BEAR: 'Sometimes, I\'m a bear, and at other times I am a be-ar.',
  },
  id: {
    SOMETIMES_IM_A_BEAR: 'Kadang-kadang aku beruang, dan kadang-kadang aku ber-uang.',
  },
  ja: {
    SOMETIMES_IM_A_BEAR: 'ある時はクマ、そしてまたある時は…ク-マ。'
  },
}

const core = createLangutilCore(dictionary, 'en')

core.localizeExplicitly('ja', 'SOMETIMES_IM_A_BEAR')
// ある時はクマ、そしてまたある時は…ク-マ。

core.localizeExplicitly('id', 'SOMETIMES_IM_A_BEAR')
// Kadang-kadang aku beruang, dan kadang-kadang aku ber-uang.

core.localize('SOMETIMES_IM_A_BEAR')
// Sometimes, I'm a bear, and at other times I am a be-ar.

const dictionaryAlt = {
  en: {
    GOOD_NIGHT: 'Good night.',
  },
  id: {
    GOOD_NIGHT: 'Selamat malam.',
  },
  ja: {
    GOOD_NIGHT: 'おやすみなさい。',
  },
}

localizeFromScratch(dictionaryAlt, 'ja', 'GOOD_NIGHT')
// おやすみなさい。

```

<br/>
