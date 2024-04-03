import { NextApiRequest, NextApiResponse } from 'next';
import { GoogleProvider } from 'next-auth/providers';
import { FirebaseAdmin } from '@/lib/firebase-admin'; // Import your Firebase Admin SDK setup
import NextAuth from 'next-auth';

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    // Other providers...
  ],
  callbacks: {
    async signIn({ user, account, profile }: { user: any; account: any; profile: any }, req: NextApiRequest, res: NextApiResponse) {
      if (account.provider === 'google') {
        const firebaseAdmin = new FirebaseAdmin(); // Initialize Firebase Admin SDK
        const userId: string = user.id; // Get the user ID from NextAuth.js
        // Create user in Firebase Realtime Database
        await firebaseAdmin.createUserInDatabase(userId, profile.email);
      }
      return true;
    },
    // Other callback functions...
  },
});
