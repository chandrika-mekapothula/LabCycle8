import React, { useEffect, useState } from 'react'
import type { Employee } from '../types/EmployeeProps.type';

const EmployeeData = () => {
    const controller = new AbortController();
    const [userData, setUserData] = useState<Employee[]>([])
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null)
    const fetchUsers = async () => {
        try {
            const res = await fetch("https://jsonplaceholder.typicode.com/users");
            setUserData(await res.json());

        }
        catch (err) {
            setError(`Something went wrong`);
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        fetchUsers();
        return () => {
            controller.abort();
            setUserData([])
        }
    }, [])
    return (
        <>
            {
                loading ? ("Loading Data") :
                    error ? (
                        <h2>{error}</h2>
                    ) :
                        (
                            userData.map((user,id) => (
                                <h1 key={id}>{user.name}:{user.username}</h1>
                            ))
                        )
            }



        </>

    )
}

export default EmployeeData