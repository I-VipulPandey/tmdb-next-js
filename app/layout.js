
import Wrapper from '@/components/wrapper/wrapper'
import './globals.css'
export const metadata = {
  title: 'TMDB',
  description: 'TMDB clone by vipul',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
      <Wrapper>{children}</Wrapper>
      </body>
    </html>
  )
}
