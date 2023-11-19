import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserRole } from "../types/userTypes";

export function useRedirectUser(role: UserRole | undefined) {
    const navigate = useNavigate();

    useEffect(() => {
        switch (role) {
            case 'ADMIN':
                navigate('/admin');
                break;
            case 'SELLER':
                navigate('/seller');
                break;
            case 'CUSTOMER':
                navigate('/');
                break;
            default:
                // Handle other cases if needed
                break;
        }
    }, [role, navigate]);
}
