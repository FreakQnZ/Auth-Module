import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

const Navbar = () => {

    const Navigate = useNavigate();

    const [isLoggedin, setIsLoggedin] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('token');
            console.log(token)
            if (!token) {
                setIsLoggedin(false);
                return;
            }

            try {
                const res = await fetch("http://localhost:3000/auth/validate", {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                })

                const data = await res.json();
                if (data.status == "ok") {
                    setIsLoggedin(true);
                } else if (data.type == 2) {
                    setIsLoggedin(false);
                    localStorage.removeItem('token');
                }
            } catch (error) {
                console.log(error)
            }
        }

        checkAuth();
    });

    return (

        <div className="navbar bg-base-200">
            <div className="flex-1 gap-2">
                <NavLink className={(e) => { return e.isActive ? "btn text-xl btn-active" : "btn text-xl btn-ghost" }} to="/">Logo</NavLink>
                {!isLoggedin && <NavLink className={(e) => { return e.isActive ? "btn text-xl btn-active" : "btn text-xl btn-ghost" }} to="/login">Auth</NavLink>}
                {isLoggedin && <NavLink onClick={() => localStorage.removeItem('token')} className={(e) => { return e.isActive ? "btn text-xl btn-active" : "btn text-xl btn-ghost" }} to="/login">LO</NavLink>}
            </div>
            <div className="flex-none">
                <button className="btn btn-square btn-ghost">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="inline-block h-5 w-5 stroke-current">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path>
                    </svg>
                </button>
            </div>
        </div>
    )
}

export default Navbar