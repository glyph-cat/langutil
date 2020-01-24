import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import copy from 'copy-to-clipboard'
import { localize } from 'langutil'
import { formatDomId } from '~modules'
import './index.css'

const HeaderCopyButton = ({ text, show }) => {
  return (
    <i
      className='material-icons document-header-copy-button'
      children='file_copy'
      onClick={() => {
        const lastItemInLink = window.location.href.split('/').pop()
        let link = window.location.href
        if (lastItemInLink !== text) { link += `/${text}` }
        // So that unnecessary parameters can be avoided
        // http://localhost:3000/#/docs/v3/basic/apply-casings/apply-casings // BAD
        // http://localhost:3000/#/docs/v3/basic/apply-casings // GOOD
        copy(link)
      }}
      style={{ color: show ? '' : 'transparent' }}
      title={localize('CLICK_TO_COPY_LINK')}
    />
  )
}

const HeaderBase = ({ type = 'h1', className, children, id, ...props }) => {
  const [hover, setHover] = useState(false)
  return React.createElement(type, {
    className: [`document-${type}`, className].join(' '),
    ...props,
    id: formatDomId(id),
    onMouseEnter: () => { setHover(true) },
    onMouseLeave: () => { setHover(false) },
  }, <>{children}<HeaderCopyButton text={id} show={hover} /></>)
}

export const H1 = (props) => <HeaderBase {...props} type='h1' />
export const H2 = (props) => <HeaderBase {...props} type='h2' />

export const Body = ({ className, ...props }) => (
  <p className={['document-body', className].join(' ')} {...props} />
)

export const Table = ({ className, ...props }) => (
  <table
    className={['document-body document-table', className].join(' ')}
    border="1" cellPadding={10} cellSpacing={0}
    {...props}
  />
)

export const THead = ({ className, ...props }) => (
  <thead className={['document-thead', className].join(' ')} {...props} />
)

export const TBody = (props) => <tbody {...props} />

export const Th = (props) => <th {...props} />

export const Tr = (props) => <tr {...props} />

export const Td = ({ className, ...props }) => (
  <td className={['document-td', className].join(' ')} {...props} />
)

export const Code = ({ className, ...props }) => (
  <code className={['document-code code', className].join(' ')} {...props} />
)

export const CodeLink = ({ className, to, href, ...props }) => {
  const child = <code className={['document-code code', className].join(' ')} {...props} />
  if (href) {
    return (
      <a
        {...props}
        className='document-code-link'
        children={child}
        href={href}
        target='_blank'
        rel='noopener noreferrer'
      />
    )
  } else {
    return (
      <Link
        className='document-code-link'
        children={child}
        to={to}
      />
    )
  }
}

export const CodeA = ({ className, href, ...props }) => (
  <a className='document-code-link' href={href} target='_blank' rel='noopener noreferrer'>
    <code className={['document-code code', className].join(' ')} {...props} />
  </a>
)

export const Ol = ({ className, ...props }) => (
  <ol className={['document-body', className].join(' ')} {...props} />
)

export const Ul = ({ className, ...props }) => (
  <ul className={['document-body', className].join(' ')} {...props} />
)

export const Li = (props) => <li {...props} />


export const SectionBreak = () => <><br /><br /><br /></>

export default Document
