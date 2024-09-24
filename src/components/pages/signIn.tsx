import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faRobot, faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons"
import { signIn } from '../../firebase/auth'

const SignIn: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault()
    try {
      await signIn(email, password);
      console.log('Successfully signed in');
      navigate('/main');
    } catch (err) {
      setError('Failed to sign in. Please check your credentials.');
      console.error('Sign-in error:', err);
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col justify-center items-center px-4">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="text-4xl font-bold flex items-center justify-center gap-3 text-zinc-700 mb-6">
            <FontAwesomeIcon icon={faRobot} className="text-5xl" />
            Code Assist
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-zinc-700">
            Sign in to your account
          </h2>
        </div>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <div className="flex items-center">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-zinc-700 bg-gray-300 text-gray-500 text-sm">
                  <FontAwesomeIcon icon={faEnvelope} />
                </span>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-gray-800 rounded-r-md focus:outline-none focus:ring-zinc-500 focus:border-zinc-500 focus:z-10 sm:text-sm bg-gray-300"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <div className="flex items-center mt-4">
              <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-zinc-700 bg-gray-300 text-gray-500 text-sm">
                  <FontAwesomeIcon icon={faLock} />
                </span>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-gray-800 rounded-r-md focus:outline-none focus:ring-zinc-500 focus:border-zinc-500 focus:z-10 sm:text-sm bg-gray-300"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-zinc-600 focus:ring-zinc-500 border-zinc-700 rounded bg-zinc-900"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-600">
                Remember me
              </label>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-zinc-700 hover:bg-zinc-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-500"
            >
              Sign in
            </button>
          </div>
        </form>
        <p className="mt-2 text-center text-sm text-gray-700">
          Don't have an account?{' '}
          <Link to="/signup" className="font-medium text-gray-500 hover:text-black">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}

export default SignIn
