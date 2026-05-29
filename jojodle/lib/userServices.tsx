import { db } from "@/lib/firebase";
import {
    collection,
    doc,
    getDocs,
    setDoc,
    query,
    where,
} from "firebase/firestore";
import bcrypt from "bcryptjs";

const USERS_COLLECTION = "users";

export interface UserData {
    username: string;
    passwordHash: string;
    pictureId: number;
    title: string;
    stats: {
        cGames: number,
        cWins: number,
        cAvgGuesses: number,
        cCurrentStreak: number,
        cBestStreak: number,
        cNoHintWins: number,
        sGames: number,
        sWins: number,
        sAvgGuesses: number,
        sCurrentStreak: number,
        sBestStreak: number,
        sNoHintWins: number,
        qGames: number,
        qWins: number,
        qAvgGuesses: number,
        qCurrentStreak: number,
        qBestStreak: number,
        qNoHintWins: number,
        pGames: number,
        pWins: number,
        pAvgGuesses: number,
        pCurrentStreak: number,
        pBestStreak: number,
        pNoHintWins: number
    };
    createdAt: number;
}

export type SafeUserData = Omit<UserData, "passwordHash">;

export async function createUser(
    username: string,
    password: string
): Promise<{ success: boolean; error?: string; user?: SafeUserData }> {
    try {
        const existing = await getUserByUsername(username);
        if (existing) {
            return { success: false, error: "Username already taken." };
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const newUser: UserData = {
            username,
            passwordHash,
            pictureId: 1,
            title: "Joestar",
            stats: {
                cGames: 0,
                cWins: 0,
                cAvgGuesses: 0,
                cCurrentStreak: 0,
                cBestStreak: 0,
                cNoHintWins: 0,
                sGames: 0,
                sWins: 0,
                sAvgGuesses: 0,
                sCurrentStreak: 0,
                sBestStreak: 0,
                sNoHintWins: 0,
                qGames: 0,
                qWins: 0,
                qAvgGuesses: 0,
                qCurrentStreak: 0,
                qBestStreak: 0,
                qNoHintWins: 0,
                pGames: 0,
                pWins: 0,
                pAvgGuesses: 0,
                pCurrentStreak: 0,
                pBestStreak: 0,
                pNoHintWins: 0
            },
            createdAt: Date.now(),
        };

        await setDoc(doc(db, USERS_COLLECTION, username), newUser);

        const { passwordHash: _, ...safeUser } = newUser;
        return { success: true, user: safeUser };
    } catch (err) {
        console.error("createUser error:", err);
        return { success: false, error: "Failed to create user." };
    }
}

export async function loginUser(
    username: string,
    password: string
): Promise<{ success: boolean; error?: string; user?: SafeUserData }> {
    try {
        const usersRef = collection(db, USERS_COLLECTION);
        const q = query(usersRef, where("username", "==", username));
        const snapshot = await getDocs(q);

        if (snapshot.empty) {
            return { success: false, error: "User not found." };
        }

        const userData = snapshot.docs[0].data() as UserData;
        const passwordMatch = await bcrypt.compare(password, userData.passwordHash);

        if (!passwordMatch) {
            return { success: false, error: "Incorrect password." };
        }

        const { passwordHash: _, ...safeUser } = userData;
        return { success: true, user: safeUser };
    } catch (err) {
        console.error("loginUser error:", err);
        return { success: false, error: "Failed to log in." };
    }
}

export async function getUserByUsername(
    username: string
): Promise<SafeUserData | null> {
    try {
        const usersRef = collection(db, USERS_COLLECTION);
        const q = query(usersRef, where("username", "==", username));
        const snapshot = await getDocs(q);

        if (snapshot.empty) return null;

        const userData = snapshot.docs[0].data() as UserData;
        const { passwordHash: _, ...safeUser } = userData;
        return safeUser;
    } catch (err) {
        console.error("getUserByUsername error:", err);
        return null;
    }
}

export async function updateUserField(
    username: string,
    fields: Partial<Omit<UserData, "username" | "passwordHash" | "createdAt">>
): Promise<{ success: boolean; error?: string }> {
    try {
        const userRef = doc(db, USERS_COLLECTION, username);
        await setDoc(userRef, fields, { merge: true });
        return { success: true };
    } catch (err) {
        console.error("updateUserField error:", err);
        return { success: false, error: "Failed to update user." };
    }
}