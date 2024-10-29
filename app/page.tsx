import { ROUTES } from '@/constants'
import { redirect } from 'next/navigation'

export default function Home() {
  redirect(`/${ROUTES.admin}/${ROUTES.auth}/${ROUTES.signin}`)
}
