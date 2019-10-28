import React from 'react'
import './index.css'

export const H1 = ({ className, ...props }) => (
  <h1 className={['document-h1', className].join(' ')} {...props} />
)

export const H2 = ({ className, ...props }) => (
  <h2 className={['document-h2', className].join(' ')} {...props} />
)

export const Body = ({ className, ...props }) => (
  <p className={['document-body', className].join(' ')} {...props} />
)

// export const P = ({ className, ...props }) => (
//   <p className={['document-body', className].join(' ')} {...props} />
// )

// export const Span = ({ className, ...props }) => (
//   <p className={['document-body', className].join(' ')} {...props} />
// )

export const Code = ({ className, ...props }) => (
  <code className={['document-code', className].join(' ')} {...props} />
)

export const SectionBreak = () => <><br /><br /><br /></>

export default Document
