import { useEffect } from 'react'

import { useEmailConfirmationMutation } from '@/shared/api/authApi'
import { getRootLayout } from '@/shared/ui'
import { ConfirmedEmail } from '@/widgets/ConfirmedEmail'
import { ExpiredLink } from '@/widgets/ExpiredLink'
import { useRouter } from 'next/router'

const EmailVerificationPage = () => {
  const router = useRouter()

  const { code } = router.query

  const [confirmation, { isSuccess }] = useEmailConfirmationMutation()

  useEffect(() => {
    if (code && typeof code === 'string') {
      confirmation({ code })
    }
  }, [code, confirmation])

  const sendEmail = () => {
    alert('send request')
  }

  return <>{isSuccess ? <ConfirmedEmail /> : <ExpiredLink resendEmailHandler={sendEmail} />}</>
}

EmailVerificationPage.getLayout = getRootLayout
export default EmailVerificationPage
