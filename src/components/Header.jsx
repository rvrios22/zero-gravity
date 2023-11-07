import { Link } from 'react-router-dom'
import React from 'react'

function Header() {
  return (
    <div>
      <Link to={'/'}>Home</Link>
      <Link to={'/gallery'}>Gallery</Link>
      <Link to={'/contact'}>Contact</Link>
    </div>
  )
}

export default Header