import Search from "./Search";
import Infor from "./Infor";
import Logo from "./Logo";
import React, { useState } from 'react';
import { Button, Collapse } from 'react-bootstrap';
import Cart from "./Cart";
import { Link } from 'react-router-dom'


function Header({ CartCount }){
  const [NavOpen, setNavOpen] = useState(false);
  console.log(CartCount)
  return (
    <div className="nav collapse-lg bg-white pt-2 pb-2">
      <div className="d-flex container align-items-center justify-content-between" id="header">
        <div className="col-md-1 d-none d-md-block">
          <Logo />
        </div>
        <div className="col-md-1 d-block d-md-none" >
          <Link to={"/"} style={{color:'black'}}>
            <i className="bi bi-chevron-compact-left"></i>
          </Link>
        </div>

        <Button
            onClick={() => setNavOpen(!NavOpen)}
            aria-expanded={open}
            className="border-0 d-block d-md-none bg-white">
          <i className="bi bi-list" style={{fontSize:"1rem", color:"black"}}></i>
        </Button>

        <div className="col-md-8">
          <Search />
        </div>
        <div className="gap-0 pe-2 border-end d-none d-md-flex">
          <Link to="/" className="text-decoration-none" >
            <Infor icon="bi bi-house-door-fill" name="Trang chủ" color={{color:"#81818a"}}/>
          </Link>
          <Link to="#" className="text-decoration-none" >
            <Infor icon="bi bi-emoji-wink" name="Tài khoản" color={{color:"#81818a"}}/>
          </Link>
        </div>
        <div> 
          <Cart CartCount={CartCount} />
        </div>
      </div>
      <Collapse in={NavOpen}>
        <div className="mt-2 container d-md-none w-100">
          <Link to="/" className="text-decoration-none" >
            <Infor icon="bi bi-house-door-fill" name="Trang chủ" color={{color:"#81818a"}}/>
          </Link>
          <Link to="#" className="text-decoration-none" >
            <Infor icon="bi bi-emoji-wink" name="Tài khoản" color={{color:"#81818a"}}/>
          </Link>
        </div>
      </Collapse>
    </div>
  )

}

export default Header
