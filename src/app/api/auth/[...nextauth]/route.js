import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDatabase } from "../../../../../lib/database";
import Authentication from "../../../../../models/authentication";
import bcrypt from "bcryptjs";

const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {},
            async authorize(credentials, request) {
                const { username, password } = credentials;

                try {
                    await connectDatabase();

                    const user = await Authentication.findOne({ username });
                    if (!user) {
                        return null;
                    }

                    const passwordMatch = await bcrypt.compare(password, user.password);
                    if (!passwordMatch) {
                        return null;
                    }

                    return {
                        id: user._id.toString(),
                        firstname: user.firstname,
                        lastname: user.lastname,
                        username: user.username,
                        program: user.program,
                        email: user.email,
                        access: user.access,
                    };
                } catch(error) {
                    console.log(error);
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.firstname = user.firstname;
                token.lastname = user.lastname;
                token.username = user.username;
                token.email = user.email;
                token.program = user.program;
                token.access = user.access;
            }
            return token;
        },
        async session({ session, token }) {
            if (session?.user) {
                session.user.id = token.id;
                session.user.firstname = token.firstname;
                session.user.lastname = token.lastname;
                session.user.username = token.username;
                session.user.email = token.email;
                session.user.program = token.program;
                session.user.access = token.access;
            }
            return session;
        }
    },
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/sign%20in"
    }
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };