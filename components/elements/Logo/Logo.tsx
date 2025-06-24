import Link from 'next/link'

const Logo = () => (
  <Link className='logo' href='/'>
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img className='logo__img' src='/img/logo.svg' alt='Trendshop Logo' />
  </Link>
)

export default Logo