import React from 'react';
import { Image } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';
import avatarRegister from './img/avatarRegister.svg';
import addUs from './img/new.svg';
import wave from './img/wavev.png';

const RegisterScreen = ({location, history}) => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);

    return (
        <div className="registerSc">
          <Helmet>
            <title>
              Register
            </title>
          </Helmet>
          	<Image className="wave" src={wave} />

            <div className="containera">
              
		<div className="imga">
			<Image src={addUs} />
		</div>
		<div className="login-content">
			<form onSubmit={handleSubmit(onSubmit)}>
				<Image src={avatarRegister} />
				{/* {error && <h4>{error}</h4>} */}

                <div className="input-div zz">
                       <div className="i">
           		   		<i className="fas fa-user"></i>
           		   </div>
                   <div className="div">
           		   		
           		   		<input {...register("name", { required: true })} type="text" className="inputa" placeholder="Enter name"  />
                      
                  </div>

           		</div>

           		<div className="input-div one">
                       
           		   <div className="i">
           		   		<i className="fas fa-envelope"></i>
           		   </div>
           		   <div className="div">
           		   		
           		   		<input type="text"  className="inputa" placeholder="Enter email" {...register("email", { required: true })} />
           		   </div>
           		</div>

               <div className="input-div one">                       
                       <div className="i">
                           <i className="fas fa-envelope"></i>
                       </div>
                       <div className="div">
                           
                           <input type="text"  className="inputa" placeholder="Enter Mobile" {...register("mobile", { required: true })} />
                       </div>
                    </div>


           		<div className="input-div pass">
           		   <div className="i"> 
           		    	<i className="fas fa-lock"></i>
           		   </div>
           		   <div className="div">
           		    	
           		    	<input {...register("password", { required: true })} type="password"  className="inputa" placeholder="Enter password" />
            	   </div>
            	</div>

                <input type="submit" className="btna2" value="Sign up"/>
                <br />
                Have an Account? {' '}
            	<Link to= '/login'>Login</Link>

            </form>
        </div>
    </div>
        </div>
    )
}

export default RegisterScreen
