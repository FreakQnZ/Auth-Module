import React, { useEffect, useState } from 'react'
import Home from '../components/home'
import Navbar from '../components/navbar'

const HomePage = () => {

    const [isLoggedin, setIsLoggedin] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('token');
            console.log(token)
            if (!token) {
                setLoading(false);
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
                    localStorage.removeItem('token');
                }
            } catch (error) {
                console.log(error)
            } finally {
                setTimeout(() => {
                    setLoading(false);
                }, 500)
            }
        }

        checkAuth();
    }, []);

    if (loading) {
        return (
            <section className='flex justify-center mt-20'>
                <div className="flex w-3/4 flex-col gap-4">
                    <div className="skeleton h-52 w-full"></div>
                    <div className="skeleton h-10 w-28"></div>
                    <div className="skeleton h-10 w-full"></div>
                    <div className="skeleton h-10 w-full"></div>
                </div>
            </section>
        )
    }

    return (
        <div>
            <Navbar isLoggedin={isLoggedin} />
            <Home />
        </div>
    )
}

export default HomePage