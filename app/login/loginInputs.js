'use client'

import { signIn } from 'next-auth/react'
// import { useState } from 'react'

function validate_login(event) {
  event.preventDefault()

  const username_inp = document.querySelector('#username')
  const password_inp = document.querySelector('#password')
  const submit_btn = document.querySelector(`#submit_btn`)

  submit_btn.disabled = true

  signIn('credentials', {
    name: username_inp.value,
    password: password_inp.value,
    redirect: false,
  })
    .then((result) => {
      if (result?.error) alert('Invalid Credentials!')
      else window.location.replace('/cabinet')
    })
    .catch((err) => {
      alert(`Error Occured: ${err}`)
    })
    .finally(() => {
      submit_btn.disabled = false
    })
}

const LoginInputs = () => {
  // const [name, setName] = useState()
  // const [password, setPassword] = useState()
  // console.log('name :>> ', name)
  return (
    <div className="relative flex min-h-screen w-screen items-center justify-center bg-white">
      <div className="flex flex-col gap-y-1 text-black">
        <form onSubmit={validate_login}>
          <label>Username</label>
          <input
            className="ml-2 rounded border border-gray-700"
            type="text"
            id="username"
          />

          <br />
          <br />

          <label>Password</label>
          <input
            className="ml-2 rounded border border-gray-700"
            type="password"
            id="password"
          />

          <br />
          <br />

          <input
            className="w-full rounded border border-gray-700 bg-gray-100 px-4"
            id="submit_btn"
            type="submit"
            value="Submit"
          />
        </form>
      </div>
    </div>
  )
}

export default LoginInputs
