import React from 'react'
import {
  LangutilCore,
  LangState,
  LUsetLanguageInterface,
  LUgetAllLanguagesInterface,
  LUsetDictionaryInterface,
  LUappendDictionaryInterface,
  LangutilLocalizeInterface,
  LUlocalizeExplicitlyInterface,
  LUresolveLanguageInterface,
  StringMapParamType,
} from '../'

export interface ReactLangState<D> extends LangState<D> {
  setLanguage: LUsetLanguageInterface<D>
  getAllLanguages: LUgetAllLanguagesInterface<D>
  setDictionary: LUsetDictionaryInterface
  appendDictionary: LUappendDictionaryInterface
  localize: LangutilLocalizeInterface<D>
  localizeExplicitly: LUlocalizeExplicitlyInterface<D>
  localizeFromScratch<Dn>(
    dictionary: Dn,
    language: keyof Dn,
    keyword: keyof Dn[keyof Dn],
    param?: StringMapParamType
  ): Dn[keyof Dn][keyof Dn[keyof Dn]]
  localizeFromScratch<Dn>(config: {
    dictionary: Dn,
    language: keyof Dn,
    keyword: keyof Dn[keyof Dn],
    param?: StringMapParamType
  }): Dn[keyof Dn][keyof Dn[keyof Dn]]
  resolveLanguage: LUresolveLanguageInterface<D>,
}

export function useLang<D>(core: LangutilCore<D>): ReactLangState<D>

export interface withLangOptions {
  displayName?: string
  shouldForwardRef?: boolean
}

export interface WithLangProps<D> extends React.ComponentProps<any> {
  langState: ReactLangState<D>
}

export function withLang<D, P extends WithLangProps<D>>(
  WrappedComponent: React.ComponentType<P>,
  core: LangutilCore<D>,
  options?: withLangOptions
): React.ComponentClass<Omit<P, keyof WithLangProps<D>>>
