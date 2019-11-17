import React from 'react'
import { Link } from 'react-router-dom'
import './index.css'

export const H1 = ({ className, children, ...props }) => (
  <h1 className={['document-h1', className].join(' ')} children={children} {...props} />
)

export const H2 = ({ className, children, ...props }) => (
  <h2 className={['document-h2', className].join(' ')} children={children} {...props} />
)

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

export const CodeLink = ({ className, to, ...props }) => (
  <Link className='document-code-link' to={to}>
    <code className={['document-code code', className].join(' ')} {...props} />
  </Link>
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
