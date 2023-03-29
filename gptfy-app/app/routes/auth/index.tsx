import { LoaderFunction } from '@remix-run/node';
import React, { useEffect } from 'react'
import { redirect } from 'react-router';
import utilfy from '~/utils/spotify'
import { json } from "@remix-run/node";
import { useLoaderData } from '@remix-run/react';
import { useNavigate } from "react-router-dom";

export let loader: LoaderFunction = async ({ request }) => {
    // Obtén el código de autorización de la URL.
    const url = new URL(request.url);
    const code = url.searchParams.get("code");
    // Si no hay código de autorización, redirige al usuario a la página de inicio.
    if (!code) return redirect("/");

    try {
        // Intercambia el código de autorización por un token de acceso.
        const { accessToken, refreshToken } = await utilfy.authorize(code);
        // devuelve token
        return json({ accessToken: accessToken, refreshToken: refreshToken });
    } catch (error) {
        console.error("Error al intercambiar el código de autorización:", error);
        // Si hay un error, maneja el caso y redirige al usuario según sea necesario.
        return redirect("/error");
    }
};

const index = () => {
    const navigate = useNavigate();
    const { accessToken, refreshToken } = useLoaderData<{ accessToken: string, refreshToken: string }>();
    console.log('ACCESS TOKEN SPOTY ', accessToken);
    useEffect(() => {
        window.localStorage.setItem('accessToken', accessToken)
        window.localStorage.setItem('refreshToken', refreshToken)
        navigate("/");
    }, [accessToken, refreshToken])
    
    return null;
}

export default index