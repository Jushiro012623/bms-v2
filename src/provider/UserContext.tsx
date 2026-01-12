import React, {
    createContext,
    useEffect,
    useState,
    type PropsWithChildren,
} from "react";
import { Api } from "../service/api/request";
import useLocalStorage from "../hooks/useLocalStorage";
import { showToast } from "../utils/toaster";
import { loginRes, userAcc } from "../mock";

export const UserContext = createContext<any>(undefined);

const UserContextProvider = ({ children }: PropsWithChildren) => {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [token, setToken] = useLocalStorage("token", null);

    const login = async (event: React.FormEvent<HTMLFormElement>) => {
        const formData = new FormData(event.currentTarget);
        
        // const response = await Api.post("auth/login",{
        //     username: formData.get("username"),
        //     password: formData.get("password"),
        // });
        if((formData.get("username") !== userAcc.data.username || formData.get("username") !== userAcc.data.email)
            && formData.get("password") !== userAcc.data.password){
            throw new Error("Invalid credentials")
        }
        const response = loginRes

        setToken(response.data?.access_token);

        return true
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        showToast('Success', 'Logout Successfully', '"bg-green-400', "bg-green-200");
    };

    useEffect(() => {
        let mounted = true;

        const fetchUser = async () => {
            if (!token) {
                if (!mounted) return;
                setLoading(false);
                setUser(null);
                return;
            }

            if (!mounted) return;
            setLoading(true);

            try {
                // const response = await Api.get("user");
                const response = userAcc
                if (!mounted) return;
                setUser(response.data ?? null);
                console.log('User fetched:', response.data);
            } catch (err: unknown) {
                if (!mounted) return;
                // if (err?.response?.status === 401) {
                //     setToken(null);
                //     setUser(null);
                //     showToast('Token Expired', 'Please login again.', '"bg-red-400', "bg-red-200");
                // } else {
                //     setUser(null);
                //     showToast('Internal Server Error', 'System Error', 'bg-red-400', "bg-red-200");
                // }
            } finally {
                if (mounted) setLoading(false);
            }
        };

        fetchUser();

        return () => {
            mounted = false;
        };
    }, [token]);
    
    return (
        <UserContext.Provider
            value={{
                token,
                user,
                login,
                loading,
                logout,
                isAuthenticated: !!user,
            }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;
// ...existing code...
