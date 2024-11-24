import { FULL_PATH_ROUTES } from '@/constants'
import { redirect } from 'next/navigation'

export default function Home() {
  redirect(FULL_PATH_ROUTES.adminAuthSignin);
}
