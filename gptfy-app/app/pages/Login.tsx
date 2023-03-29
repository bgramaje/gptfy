import React from 'react'
import SpotifyButton from '~/components/SpotifyButton'

const Login = ({ url }: { url: string }) => {
  return (
    <SpotifyButton url={url}/>
  )
}

export default Login