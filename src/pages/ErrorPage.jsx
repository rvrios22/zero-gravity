import React from 'react'
import { useRouteError } from 'react-router-dom'

function ErrorPage() {
  const error = useRouteError();
  console.error(error);
  return (
    <>
      <h1>ERROR</h1>
    </>
  )
}

export default ErrorPage