import { Controller } from 'react-hook-form'

import { GithubIcon, GoogleIcon } from '@/shared/assets'
import { ROUTES_URL } from '@/shared/const'
import { useTranslation } from '@/shared/lib/hooks'
import { Button, Card, Input, Typography } from '@/shared/ui'
import { clsx } from 'clsx'
import Link from 'next/link'

import s from './SignIn.module.scss'

import { SignInFormValuesType, useSignIn } from '../services'

export const SignIn = () => {
  const { text } = useTranslation()
  const t = text.pages.signIn
  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
  } = useSignIn(text.errors.signInform)

  const classNames = {
    forgotLink: s.forgotLink,
    form: s.form,
    formInput(error?: string) {
      return clsx(s.formInput, error && s.formInputWithError)
    },
    formTitle: s.formTitle,
    providers: s.providers,
    questionText: s.questionText,
    root: s.root,
    signUpLink: s.signUpLink,
  }

  const onFormSubmit = (data: SignInFormValuesType) => {
    console.log(data)
  }

  return (
    <Card className={classNames.root}>
      <Typography as={'h1'} className={classNames.formTitle} variant={'h1'}>
        {t.formTitle}
      </Typography>
      <div className={classNames.providers}>
        <Link href={'https://accounts.google.com/o/oauth2/v2/auth'} target={'_blank'}>
          <GoogleIcon />
        </Link>
        <Link href={'https://github.com/login/oauth/authorize'} target={'_blank'}>
          <GithubIcon />
        </Link>
      </div>
      <form className={classNames.form} onSubmit={handleSubmit(onFormSubmit)}>
        <Controller
          control={control}
          name={'email'}
          render={({ field, fieldState: { error } }) => (
            <Input
              {...field}
              className={classNames.formInput(errors.email?.message)}
              error={error?.message}
              label={t.emailLabel}
              placeholder={'Epam@epam.com'}
              type={'text'}
            />
          )}
        />
        <Controller
          control={control}
          name={'password'}
          render={({ field, fieldState: { error } }) => (
            <Input
              {...field}
              autoComplete={'off'}
              className={classNames.formInput(errors.password?.message)}
              error={error?.message}
              label={t.passwordLabel}
              type={'password'}
            />
          )}
        />
        <Typography
          as={Link}
          className={classNames.forgotLink}
          href={ROUTES_URL.FORGOT_PASSWORD}
          variant={'regularText14'}
        >
          {t.forgotPasswordLink}
        </Typography>
        <Button disabled={!isValid} type={'submit'}>
          {t.signInBtn}
        </Button>
      </form>
      <Typography className={classNames.questionText} variant={'regularText16'}>
        {t.questionAboutAccount}
      </Typography>
      <Button
        as={Link}
        className={classNames.signUpLink}
        href={ROUTES_URL.SIGN_UP}
        variant={'link'}
      >
        {t.signUpLink}
      </Button>
    </Card>
  )
}
