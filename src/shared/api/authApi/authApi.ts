import { baseApi } from '@/shared/api/baseApi'

const authApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    emailConfirmation: builder.mutation<void, { code: string }>({
      query: body => ({
        body,
        method: 'POST',
        url: '/auth/registration-confirmation',
      }),
    }),
    passwordRecovery: builder.mutation<void, { email: string }>({
      query: body => ({
        body,
        method: 'POST',
        url: '/auth/password-recovery',
      }),
    }),
    signIn: builder.mutation<SignInResponseType, SignInRequestType>({
      query: body => ({
        body,
        method: 'POST',
        url: '/auth/login',
      }),
    }),
    signUp: builder.mutation<SignUpResponse, CreateUserDto>({
      query: body => ({
        body,
        method: 'POST',
        url: '/auth/registration',
      }),
    }),
  }),
})

export const {
  useEmailConfirmationMutation,
  usePasswordRecoveryMutation,
  useSignInMutation,
  useSignUpMutation,
} = authApi

export type CreateUserDto = {
  email: string
  password: string
  passwordConfirm: string
  username: string
}

export type SignUpResponse = {
  createdAt: string
  email: string
  id: string
  updatedAt: string
  username: string
}

export type SignInRequestType = Pick<CreateUserDto, 'email' | 'password'>

export type SignInResponseType = { accessToken: string }
