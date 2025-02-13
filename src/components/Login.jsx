import React, { useState, useRef } from 'react'
import Malecon from './Malecon'
import '../static/css/nicepage.css'
import '../static/css/login.css'
import Barco from './Barco'
import Header from './Header'
import Footer from './Footer'
import { Link } from 'react-router-dom';

export default function Login() {


        const hostBase = "http://localhost:5000"

        const [error, setError] = useState();
        const [msgError, setMsgError] = useState();
        const usuarioRef = useRef();
        const passwordRef = useRef();

        function login() {
            const usuario = usuarioRef.current.value;
            const password = passwordRef.current.value;
            fetch(`${hostBase}/user/login`, {
                headers: { "content-type": "application/json" },
                method: "POST",
                body: JSON.stringify({ usuario, password })
            }).then(res => res.json())
                .then(res => {
                    if (res.estado === "ok") {
                        {
                            localStorage.setItem("token", res.token);
                            window.location.href = res.url;
                        }
                    } else {
                        setError(true);
                        setMsgError(res.msg);
                    }
                })
        }

    return (
        <>
            {error && <div className="alert alert-danger" role="alert">{msgError}</div>}
            <Header />
            <section className="u-clearfix u-custom-color-2 u-valign-middle-xs u-section-1-Login" id="sec-1e56">
                <span className="u-file-icon u-icon u-icon-rectangle u-opacity u-opacity-40 u-icon-1">
                    <Barco className="u-ship" />
                </span>
                <div className="u-form u-form-1-Login">
                    <form action="#" method="POST" className="u-clearfix u-form-spacing-10 u-form-vertical u-inner-form" source="custom" name="ingreso" style={{ padding : '10px' }}>
                        <div className="u-form-group u-form-name">
                            <label for="name-40a7" className="u-custom-font u-font-raleway u-label u-text-custom-color-3 u-label-1">Usuario</label>
                            <input ref={usuarioRef} type="text" placeholder="Ingrese usuario" id="name-40a7" name="username" className="u-input u-input-rectangle u-radius-8 u-white" required="" />
                        </div>
                        <div className="u-form-email u-form-group">
                            <label for="email-40a7" className="u-custom-font u-font-raleway u-label u-text-custom-color-3 u-label-2">Contraseña</label>
                            <input ref={passwordRef} type="password" placeholder="Ingrese contraseña" id="email-40a7" name="password" className="u-input u-input-rectangle u-radius-8 u-white" required="" />
                        </div>
                        <div className="u-align-left u-form-group u-form-submit">
                            <a onClick={ login } href="#" className="u-active-custom-color-3 u-border-2 u-border-active-custom-color-3 u-border-custom-color-3 u-border-hover-custom-color-3 u-btn u-btn-round u-btn-submit u-button-style u-custom-color-2 u-custom-font u-font-raleway u-hover-custom-color-3 u-radius-10 u-text-active-custom-color-2 u-text-custom-color-3 u-text-hover-custom-color-2 u-btn-1-Login">Ingresar</a>
                            <input onClick={ login } type="submit" value="submit" className="u-form-control-hidden" />
                            <Link to="/registro_usuario_ext" href="Registro.html" className="u-active-none  u-border-custom-color-3 u-border-hover-white u-btn u-btn-rectangle u-button-style u-custom-font u-font-raleway u-hover-none u-none u-radius-0 u-text-active-white u-text-custom-color-3 u-text-hover-white loginRegistro text1">¿No tienes cuenta?&nbsp; Regístrate
                                <span style={{ fontSize : '1.5rem' }}></span>
                            </Link>
                        </div>

                    </form>
                </div>
            </section>
            <Malecon />
            <Footer />
        </>
    )
}
