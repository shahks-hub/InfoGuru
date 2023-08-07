import NextAuth, { NextAuthOptions } from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import { EmailProvider } from "next-auth/providers"
import { CredentialsProvider } from "next-auth/providers"

const prisma = new PrismaClient()

export default NextAuth({
  providers: [
    CredentialsProvider({
      credentials: {
        email : {label : 'Email', type: 'text', placeholder: 'johndoe@gmail.com'},
        password: {label: 'Password', type: 'password'},
      },
      async authorize(credentials, req) {

      }
    })

    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
    }),
  ],

  database: process.env.DATABASE_URL,

  secret: process.env.SECRET,
  
  session: {
    // Use JSON Web Tokens for session instead of database sessions.
    // This option can be used with or without a database for users/accounts.
    // Note: `jwt` is automatically set to `true` if no database is specified.
    jwt: true,

    // Seconds - How long until an idle session expires and is no longer valid.
    // maxAge: 30 * 24 * 60 * 60, // 30 days

    // Seconds - Throttle how frequently to write to database to extend a session.
    // Use it to limit write operations. Set to 0 to always update the database.
    // Note: This option is ignored if using JSON Web Tokens
    // updateAge: 24 * 60 * 60, // 24 hours
  },

  jwt: {
    // A secret to use for key generation (you should set this explicitly)
    // secret: 'INp8IvdIyeMcoGAgFGoA61DdBglwwSqnXJZkgz8PSnw',
    // Set to true to use encryption (default: false)
    // encryption: true,
    // You can define your own encode/decode functions for signing and encryption
    // if you want to override the default behaviour.
    // encode: async ({ secret, token, maxAge }) => {},
    // decode: async ({ secret, token, maxAge }) => {},
  },

  // You can define custom pages to override the built-in ones. These will be regular Next.js pages
  // so ensure that they are placed outside of the '/api' folder, e.g. signIn: '/auth/mycustom-signin'
  // The routes shown here are the default URLs that will be used when a custom
  // pages is not specified for that route.
  // https://next-auth.js.org/configuration/pages
  pages: {
    signIn: '/page.tsx',  // Displays signin buttons
    // signOut: '/auth/signout', // Displays form with sign out button
    // error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // Used for check email page
    // newUser: null // If set, new users will be directed here on first sign in
  },

  // Callbacks are asynchronous functions you can use to control what happens
  // when an action is performed.
  // https://next-auth.js.org/configuration/callbacks
  callbacks: {
    // async signIn(user, account, profile) { return true },
    // async redirect(url, baseUrl) { return baseUrl },
    // async session(session, user) { return session },
    // async jwt(token, user, account, profile, isNewUser) { return token }
  },

  // Events are useful for logging
  // https://next-auth.js.org/configuration/events
  events: {},

  // Enable debug messages in the console if you are having problems
  debug: false,
})

//     providers: [      
      // {
      //   id: 'sendgrid',
      //   type: 'email',
      //   async sendVerificationRequest({identifier: email, url}) {
      //     // Call the cloud Email provider API for sending emails
      //     // See https://docs.sendgrid.com/api-reference/mail-send/mail-send
      //     const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
      //       // The body format will vary depending on provider, please see their documentation
      //       // for further details.
      //       body: JSON.stringify({
      //         personalizations: [{ to: [{ email }] }],
      //         from: { email: "noreply@infoguru.com" },
      //         subject: "Sign in to Your page",
      //         content: [
      //           {
      //             type: "text/plain",
      //             value: `Please click here to authenticate - ${url}`,
      //           },
      //         ],
      //       }),
      //       headers: {
      //         // Authentication will also vary from provider to provider, please see their docs.
      //         Authorization: `Bearer ${process.env.SENDGRID_API}`,
      //         "Content-Type": "application/json",
      //       },
      //       method: "POST",
      //     })
  
      //     if (!response.ok) {
      //       const { errors } = await response.json()
      //       throw new Error(JSON.stringify(errors))
      //     }
      //   },
      // }
  //   ],
  // }

  // export default NextAuth(authOptions)