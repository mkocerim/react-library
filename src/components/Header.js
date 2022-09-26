import React from "react";
import { Link } from "react-router-dom";

const Header = (props)=>{

    return(
        <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
        <div class="container-fluid">
          <Link class="navbar-brand" to="/">
            Kitaplığım
            </Link>
          <button 
            class="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarSupportedContent" 
            aria-controls="navbarSupportedContent" 
            aria-expanded="false" 
            aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <Link class="nav-link" to="/">
                  Kitaplar
                </Link>
              </li>
             
           
              
            </ul>
          
          </div>
        </div>
      </nav>

    )


}

export default Header