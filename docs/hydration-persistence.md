# Hydration & Persistence

```js

import { createLangutilCore, LangutilEvents } from 'langutil'

const DEFAULT_LANGUAGE = 'en'
const DEFAULT_AUTO = true

const STORAGE_KEY = 'language-pref'

const core = createLangutilCore(dictionary, DEFAULT_LANGUAGE, {
  auto: DEFAULT_AUTO,
})

const rawData = localStorage.getItem(STORAGE_KEY)
if (rawData) {
  try {
    // NOTE: Data structure of `parsedData` depends on how you persist it
    // (Refer to `core.watch(...)` section below)
    const parsedData = JSON.parse(rawData)
    core.hydrate(null, parsedData.language, { auto: parsedData.isAuto })
    // Pass `null` to to use dictionary passed into `createLangutilCore`,
    // or pass in another dictionary to completely override it. The former
    // method is usually prefered.
  } catch (e) {
    // Remove from storage if the JSON string is malformed.
    // App will continue to run with the configuration as specified when
    // calling `createLangutilCore` in the first place.
    localStorage.removeItem(STORAGE_KEY)
  }
}

core.watch((event) => {
  if (event.type === LangutilEvents.language) {
    const { current } = event.data.state
    const isDefaultLanguage = current.language === DEFAULT_LANGUAGE
    const isDefaultAuto = current.isAuto === DEFAULT_AUTO
    if (isDefaultLanguage && isDefaultAuto) {
      // If preferences are same as default, remove from storage.
      localStorage.removeItem(STORAGE_KEY)
    } else {
      // If preferences are different from default, save into storage.
      localStorage.setItem(STORAGE_KEY, JSON.stringify(current))
    }
  }
})

```

<br/>
