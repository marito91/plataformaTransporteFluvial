import React from 'react'
import Malecon from './Malecon'
import '../static/css/nicepage.css'
import '../static/css/Registro.css'
import Barco from './Barco'
import Footer from './Footer'
import Header from './Header'
import Menu from './Menu'
//import { Link } from 'react-router-dom';
import { useRef } from 'react';
import Invalido from './Invalido'
import { auth } from '../auth/auth';

export default function Registro() {
    
    const hostBase = "http://localhost:5000"
    //const [usuario, setUsuario] = useState({nombre: "", apellido: "", docType: "", document: "", email: "", userType: "", telefono: "", password: ""})
    
    // Hooks para agarrar la variables con el atributo de ref dentro de la funcion
    const nombreRef = useRef(); 
    const apellidoRef = useRef();
    const docTypeRef = useRef();
    const docRef = useRef();
    const emailRef = useRef();
    const userTypeRef = useRef();
    const telRef = useRef();
    const passRef = useRef();

    function registrar() {
        if (docRef.current.value === "") {
            alert("Debe ingresar un numero de documento")
        } else {
            const nom = nombreRef.current.value;
            const lastName = apellidoRef.current.value;
            const documentType = docTypeRef.current.value;
            const document = docRef.current.value;
            const emailAddress = emailRef.current.value;
            const userType = userTypeRef.current.value;
            const phone = telRef.current.value;
            const password = passRef.current.value;
            fetch(`${hostBase}/user/registrarUsuario`, {
                headers:{ "content-type" : "application/json" },
                method:"POST",
                body: JSON.stringify({nom, lastName, documentType, document, emailAddress, userType, phone, password})
            }).then(data => data.json())
                .then(data => {
                alert(data.msg);
                console.log(data.msg);
            })
            console.log({nom, lastName, documentType, document, emailAddress, userType, phone, password});
            limpiar();
        }


    }

    function consultar() {
        if (docRef.current.value === "") {
            alert("Debe ingresar un numero de documento")
        } else {
        // Se toma el valor del documento ya que es el unico
        const document = docRef.current.value;
        fetch(`${hostBase}/user/listarUsuario/${document}`) // Promesa - Se piden los datos
            .then(res => res.json()) // Se guardan los datos en la variables, en este caso, convertidos a json
            .then(res => { // Se capturan los datos
                if (res.estado === "ok") {
                    nombreRef.current.value = res.data.nombre;
                    apellidoRef.current.value = res.data.apellido;
                    docTypeRef.current.value = res.data.tipo_documento;
                    docRef.current.value = res.data.documento;
                    emailRef.current.value = res.data.email;
                    userTypeRef.current.value = res.data.perfil;
                    telRef.current.value = res.data.telefono;
                    passRef.current.value = res.data.password;
                    //alert(res.msg)
                }else{
                    alert(res.msg)
                }
            })
        }

    }

    function editar() {
        if (docRef.current.value === "") {
            alert("Debe ingresar un numero de documento")
        } else {
            const resp = window.confirm("¿Desea EDITAR el usuario?");
            if (resp) {
                // Se toman los valores
                const nom = nombreRef.current.value;
                const lastName = apellidoRef.current.value;
                const documentType = docTypeRef.current.value;
                const document = docRef.current.value;
                const emailAddress = emailRef.current.value;
                const userType = userTypeRef.current.value;
                const phone = telRef.current.value;
                const password = passRef.current.value;
                
                fetch(`${hostBase}/user/editarUsuario`, {
                    headers:{ "content-type" : "application/json" },
                    method:"POST",
                    body: JSON.stringify({nom, lastName, documentType, document, emailAddress, userType, phone, password}) // Promesa - Se piden los datos
                }).then(res => res.json()) // Se guardan los datos en la variables, en este caso, convertidos a json
                .then(res => { // Se capturan los datos
                    alert(res.msg)
                })
                limpiar();
            }
        }

    }

    function eliminar() {
        if (docRef.current.value === "") {
            alert("Debe ingresar un numero de documento")
        } else {
            const resp = window.confirm("¿Realmente desea ELIMINAR el usuario?");
            if (resp) {
                // Se toma el valor de documento
                const document = docRef.current.value;
                fetch(`${hostBase}/user/eliminarUsuario`, {
                    headers:{ "content-type" : "application/json" },
                    method:"POST",
                    body: JSON.stringify({ document }) // Promesa - Se piden los datos
                }).then(res => res.json()) // Se guardan los datos en la variables, en este caso, convertidos a json
                .then(res => { // Se capturan los datos
                    alert(res.msg)
                })
                limpiar();
            }    
        }
    }

    // Funcion para borrar los text fields apenas se registren los datos
    function limpiar() {
        nombreRef.current.value = "";
        apellidoRef.current.value = "";
        docTypeRef.current.value = "";
        docRef.current.value = "";
        emailRef.current.value = "";
        userTypeRef.current.value = "";
        telRef.current.value = "";
        passRef.current.value = "";
    }
    
    return (
        <>
            <Header />

            { auth() ? 
                <>
                    <Menu />
                    <section className="u-clearfix u-custom-color-2 u-section-1-registro" id="sec-7127">
                        <h2 className="u-align-center u-custom-font u-font-raleway u-text u-text-custom-color-3 u-text-default u-text-1">Registro</h2>
                        
                        <div className="formRgs u-form u-form-1">
                            <form action="#" method="POST" className="u-clearfix u-form-spacing-10 u-form-vertical u-inner-form" source="custom" name="formRgs" style={{ padding : '10px' }}>
                                <div className="u-form-group u-form-name u-form-partition-factor-2">
                                    <label for="name-40e7" className="u-custom-font u-font-raleway u-label u-text-custom-color-3 u-label-1">Nombre</label>
                                    <input ref={nombreRef} type="text" placeholder="Nombre" id="name-40e7" name="nameRgs" className="u-border-1 u-border-grey-30 u-custom-font u-font-raleway u-input u-input-rectangle u-radius-10 u-text-custom-color-2 u-white u-input-1" required="" />
                                </div>
                                <div className="u-form-group u-form-partition-factor-2 u-form-group-2">
                                    <label for="text-c25c" className="u-custom-font u-font-raleway u-label u-text-custom-color-3 u-label-2">Apellido</label>
                                    <input ref={apellidoRef} type="text" id="text-c25c" name="emailRgs" className="u-border-1 u-border-grey-30 u-custom-font u-font-raleway u-input u-input-rectangle u-radius-10 u-text-custom-color-2 u-white u-input-2" placeholder="Apellidos" required="required" />
                                </div>
                                <div className="u-form-group u-form-name u-form-partition-factor-2">
                                    <label for="name-40e7" className="u-custom-font u-font-raleway u-label u-text-custom-color-3 u-label-1">Tipo de documento</label>
                                    <select ref={docTypeRef} type="text" placeholder="Tipo de documento" id="name-40e7" name="nameRgs" className="u-border-1 u-border-grey-30 u-custom-font u-font-raleway u-input u-input-rectangle u-radius-10 u-text-custom-color-2 u-white u-input-1" required="">
                                        <option value="Item 1"> -- Seleccione tipo de documento -- </option>
                                        <option value="Item 2">C.C</option>
                                        <option value="Item 3">C.E</option>
                                        <option value="Item 4">NIT</option>
                                    </select>
                                </div>
                                <div className="u-form-group u-form-name u-form-partition-factor-2">
                                    <label for="name-40e7" className="u-custom-font u-font-raleway u-label u-text-custom-color-3 u-label-1">Número de documento</label>
                                    <input ref={docRef} type="text" placeholder="Documento sin espacios o puntos" id="name-40e7" name="nameRgs" className="u-border-1 u-border-grey-30 u-custom-font u-font-raleway u-input u-input-rectangle u-radius-10 u-text-custom-color-2 u-white u-input-1" required="required" />
                                </div>
                                <div className="u-form-group u-form-partition-factor-2 u-form-group-2">
                                    <label for="text-c25c" className="u-custom-font u-font-raleway u-label u-text-custom-color-3 u-label-2">Email</label>
                                    <input ref={emailRef} type="text" id="text-c25c" name="emailRgs" className="u-border-1 u-border-grey-30 u-custom-font u-font-raleway u-input u-input-rectangle u-radius-10 u-text-custom-color-2 u-white u-input-2" placeholder="" required="required" />
                                </div>
                                <div className="u-form-group u-form-partition-factor-2 u-form-group-2">
                                    <label for="text-c25c" className="u-custom-font u-font-raleway u-label u-text-custom-color-3 u-label-2">Tipo de Usuario</label>
                                    <select ref={userTypeRef} type="text" id="text-c25c" name="emailRgs" className="u-border-1 u-border-grey-30 u-custom-font u-font-raleway u-input u-input-rectangle u-radius-10 u-text-custom-color-2 u-white u-input-2" placeholder="Correo electrónico" required="required">
                                        <option value="Item 1"> -- Seleccione tipo de usuario -- </option>
                                        <option value="Item 2">1 - Administrador</option>
                                        <option value="Item 3">2 - Usuario</option>
                                    </select>
                                </div>
                                <div className="u-form-email u-form-group u-form-partition-factor-2">
                                    <label for="email-40e7" className="u-custom-font u-font-raleway u-label u-text-custom-color-3 u-label-3">Telefono</label>
                                    <input ref={telRef} type="email" placeholder="Numero celular" id="email-40e7" name="usernameRgs" className="u-border-1 u-border-grey-30 u-custom-font u-font-raleway u-input u-input-rectangle u-radius-10 u-text-custom-color-2 u-white u-input-3" required="" />
                                </div>
                                <div className="u-form-group u-form-partition-factor-2 u-form-group-4">
                                    <label for="text-3800" className="u-custom-font u-font-raleway u-label u-text-custom-color-3 u-label-4">Contraseña</label>
                                    <input ref={passRef} type="text" placeholder="Contraseña" id="text-3800" name="passwordRgs" className="u-border-1 u-border-grey-30 u-custom-font u-font-raleway u-input u-input-rectangle u-radius-10 u-text-custom-color-2 u-white u-input-4" required="required" />
                                </div>
                                <div className="div-buttons u-align-left u-form-group u-form-submit">
                                    <a onClick={ registrar } href="#" className="buttons-registro u-active-custom-color-3 u-border-2 u-border-active-custom-color-3 u-border-custom-color-3 u-border-hover-custom-color-3 u-btn u-btn-round u-btn-submit u-button-style u-custom-color-2 u-custom-font u-font-raleway u-hover-custom-color-3 u-radius-10 u-text-active-custom-color-2 u-text-custom-color-3 u-text-hover-custom-color-2 u-btn-1">Registrar</a>
                                    <input onClick={ registrar } type="submit" value="submit" className="u-form-control-hidden" />
                                    <a onClick={ consultar } href="#" className="buttons-registro u-active-custom-color-3 u-border-2 u-border-active-custom-color-3 u-border-custom-color-3 u-border-hover-custom-color-3 u-btn u-btn-round u-btn-submit u-button-style u-custom-color-2 u-custom-font u-font-raleway u-hover-custom-color-3 u-radius-10 u-text-active-custom-color-2 u-text-custom-color-3 u-text-hover-custom-color-2 u-btn-1">Consultar</a>
                                    <input onClick={ consultar } type="submit" value="submit" className="u-form-control-hidden" />
                                    <a onClick={ editar } href="#" className="buttons-registro u-active-custom-color-3 u-border-2 u-border-active-custom-color-3 u-border-custom-color-3 u-border-hover-custom-color-3 u-btn u-btn-round u-btn-submit u-button-style u-custom-color-2 u-custom-font u-font-raleway u-hover-custom-color-3 u-radius-10 u-text-active-custom-color-2 u-text-custom-color-3 u-text-hover-custom-color-2 u-btn-1">Editar</a>
                                    <input onClick={ editar } type="submit" value="submit" className="u-form-control-hidden" />
                                    <a onClick={ eliminar } href="#" className="buttons-registro u-active-custom-color-3 u-border-2 u-border-active-custom-color-3 u-border-custom-color-3 u-border-hover-custom-color-3 u-btn u-btn-round u-btn-submit u-button-style u-custom-color-2 u-custom-font u-font-raleway u-hover-custom-color-3 u-radius-10 u-text-active-custom-color-2 u-text-custom-color-3 u-text-hover-custom-color-2 u-btn-1">Eliminar</a>
                                    <input onClick={ eliminar } type="submit" value="submit" className="u-form-control-hidden" />
                                </div>
                            </form>
                        
                        <span className="u-file-icon u-icon u-icon-rectangle u-opacity u-opacity-40 u-icon-1">
                            <Barco />
                        </span>
                        </div>
                    </section>
                </>
                    : <Invalido/>
            }
            <Malecon />
            <Footer />
        </>
    )
}
