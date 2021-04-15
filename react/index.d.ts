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
  setLanguage: LUsetLanguageInterface<keyof D>
  getAllLanguages: LUgetAllLanguagesInterface<keyof D>
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

export interface WithLangProps<D> extends React.ComponentProps {
  langState: ReactLangState<D>
}

export function withRouter<P extends RouteComponentProps<any>, C extends React.ComponentType<P>>(component: C & React.ComponentType<P>): React.ComponentClass<Omit<P, keyof RouteComponentProps<any>> & WithRouterProps<C>> & WithRouterStatics<C>;

export function withLang<D, P extends WithLangProps<D>>(
  WrappedComponent: React.ComponentType<P>,
  core: LangutilCore<D>,
  options?: withLangOptions
): React.ComponentClass<Omit<P, keyof WithLangProps<D>>>
