// 'use client'

// import { useAuth } from "@clerk/nextjs";
// import { signInWithCustomToken } from "firebase/auth";
// import { auth } from "@/firebase/config";
// import { useEffect, createContext, useContext, useState } from "react";

// const AuthContext = createContext();

// function AuthProvider({ children }) {
//   const { userId, isLoaded, getToken } = useAuth();

//   useEffect(() => {
//     if (!isLoaded) return;

//     const signInWithClerk = async () => {
//       const token = await getToken({ template: "integration_firebase" });
//       if(token){
//         const userCredential = await signInWithCustomToken(auth, token || "");
//         console.log(userCredential);
//       }
//     };
//     signInWithClerk();
//   }, [isLoaded, getToken]);

//   if (!isLoaded) {
//     return <div>Loading...</div>;
//   }


//   return (
//     <AuthContext.Provider value={{ userId, user, isAdmin }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export const useAuthContext = () => useContext(AuthContext);

// export default AuthProvider;