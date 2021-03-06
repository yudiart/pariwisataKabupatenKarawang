import React, {useEffect, useState} from 'react'
import {Link, useHistory} from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getCarts} from "../../actions/cart";
import {logout} from "../../actions/auth";

const NavigasiBar = ({logout,getCarts,cart,isAuthenticated,auth,profile})=>{

    useEffect(()=>{
        getCarts()
    },[getCarts])

    let history = useHistory()
    let {pathname} =  history.location
    const [snackbar,setSnackbar] = useState(0)
    const [Logout,setLogout] = useState(0)
    const [search,setSearch] = useState({
        search:''
    })
    const [open, setOpen] = useState(0)
    const [drawer, setDrawer] = useState(0)
    const handleChange = (e)=>{
        e.preventDefault()
        setSearch({search: e.target.value})
        if (search.search === '' || search.search === null){
            setOpen(0)
        }else{
            setOpen(open+1)
        }
    }
    const onSubmit = (e)=>{
        e.preventDefault()
        if (search.search === ''){
            setSnackbar(!snackbar)
            setTimeout(()=>{ setSnackbar(snackbar) }, 3000);
            setOpen(0)
            // After 3 seconds, remove the show class from DIV

        }else{
            setOpen(0)
            history.push(`/search&q=${(search.search.replace(/ /g, '-'))}`)
            setSearch({search:''})
        }

    }
    const handleLogout =(e)=>{
        e.preventDefault()
        setDrawer(!drawer)
        setLogout(!Logout)
        setTimeout(()=>{ setLogout(Logout) }, 3000);
    }
    const resultCarBadge = isAuthenticated && !cart.loading ? cart.carts.rooms.length : null
    return(
        <header>
            <div className="navbar">
                <div className="main-header">
                    <div className="logo-brand">
                        <Link to='/' className='logo-link'>Pariwisata</Link>
                    </div>
                    <div className={`btn-back btn-back-${pathname !== '/' ? 'active':''}`} onClick={()=>history.goBack()}>
                        <i className="material-icons mdc-icon-button__icon" >keyboard_backspace</i>
                    </div>
                    <div className="header-menu">
                        <div className="header-search">
                            <form className="input-group"
                                  onSubmit={onSubmit}
                            >
                                <input
                                    type="text"
                                    name='search'
                                    autoComplete="off"
                                    className="form-control"
                                    placeholder="Username"
                                    aria-label="Username"
                                    value={search.search}
                                    onChange={handleChange}
                                    aria-describedby="addon-wrapping"
                                />
                                <button id="add-to-favorites"
                                        className="mdc-icon-button"
                                        aria-label="Add to favorites"
                                        aria-pressed="false">
                                    <i className="material-icons mdc-icon-button__icon">search</i>
                                </button>
                            </form>
                        </div>
                    </div>
                    {/*Kondisi belum login menampilkan Button Login*/}
                    <div className="header-icons">

                        {isAuthenticated && !auth.loading?
                            <>
                            <i className="material-icons mdc-icon-button__icon cart-header" onClick={()=>{history.push('/carts/')}}
                               data-badge={resultCarBadge}
                            >shopping_cart</i>
                            <i className="material-icons mdc-icon-button__icon" data-badge={10}>notifications</i>
                            <i className="material-icons mdc-icon-button__icon" data-badge={0?0:null}
                            >chat_bubble</i>
                            </>
                        : <i className="material-icons mdc-icon-button__icon cart-header"/>}
                    </div>
                    <div className="header-btn">
                        {isAuthenticated && !auth.loading?
                            <div style={{display:'flex',alignItems:'center',justifyContent:"center"}} onClick={logout}>
                                <img src={auth.user.avatar} alt="" width={'30'} height={'30'}/>
                                <p>{auth.user.email}</p>
                            </div>
                        :<>
                            <Link className='button-primary' to={'/login'}>Login</Link>
                            <Link className='button-outline-primary' to={'/register'}>Register</Link>
                        </>
                        }
                    </div>
                    <div className="mobile-menu" onClick={()=>setDrawer(!drawer)}>
                        <i className="material-icons mdc-icon-button__icon" data-badge={10}>reorder</i>
                    </div>
                </div>
            </div>
            <div className={`drawerHeader ${drawer ? `drawerShow` : 'drawerUnShow'}`}>
                <p className="closebtn" onClick={()=>setDrawer(0)} >&times;</p>
                <Link to={'/'} onClick={()=>setDrawer(!drawer)} className='linkbtn'>Home</Link>
                <Link to={'/'} onClick={()=>setDrawer(!drawer)} className='linkbtn'>Services</Link>
                <Link to={'/'} onClick={()=>setDrawer(!drawer)} className='linkbtn'>Clients</Link>
                <Link to={'/'} onClick={()=>setDrawer(!drawer)} className='linkbtn'>Contact</Link>
                <div className="divider-drawer"/>
                {isAuthenticated && !auth.loading?
                    <>
                        <Link to={''} className='linkbtn'>Settings</Link>
                        <div className="logout" onClick={logout}>
                            <div onClick={(e)=> handleLogout(e)}
                                 className='linkbtn'>Logout</div>
                        </div>
                    </>
                :null}
            </div>
            <div className="search" style={{display:open?'flex':'none'}}>
                <div className="search__result">
                    <div className="search-item">
                    </div>
                </div>
                <div className="search__close" onClick={()=>{setOpen(0)}}/>
            </div>
            <div className={`snackbar ${snackbar?`show`:null}`}><i className="material-icons mdc-icon-button__icon">notification_important</i>Tidak boleh kosong</div>
            <div className={`snackbar ${Logout?`show`:null}`}><i className="material-icons mdc-icon-button__icon">notification_important</i>Anda telah Logout</div>
        </header>
    )
}
NavigasiBar.propTypes = {
    logout: PropTypes.func.isRequired,
    getCarts: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    alert:state.alert,
    cart:state.cart,
    profile: state.profile,
    auth: state.auth
});
export default connect(
    mapStateToProps,
    { logout,getCarts}
)(NavigasiBar);
