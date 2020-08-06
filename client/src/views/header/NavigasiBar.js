import React, {useState} from 'react'
import {Link, useHistory} from "react-router-dom";

const NavigasiBar = (props)=>{
    let history = useHistory()
    let {pathname} =  history.location
    let {products} = props
    const {search, setSearch} = props
    const [snackbar,setSnackbar] = useState(0)
    const [open, setOpen] = useState(0)
    const [drawer, setDrawer] = useState(0)


    let filterSearch = products.filter((product)=>
        product.product_name.toLowerCase().indexOf(search.search.toLowerCase())!== -1 ||
        product.category.toLowerCase().indexOf(search.search.toLowerCase())!== -1 ||
        product.toko.toko_name.toLowerCase().indexOf(search.search.toLowerCase())!== -1)
    let pName = filterSearch.map((product) => {
        return {
            count: 2,
            product: product.product_name,
        }
    }).reduce((a, b) => {
        a[b.product] = (a[b.product] || 0) + b.count
        return a
    }, {})
    let duplicates = Object.keys(pName).filter((a) => pName[a] > 1 )
    const resultRandom =(array)=>{
        let i = array.length - 1;
        for (; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }

    const searchResult = resultRandom(duplicates)

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
    const resultSearch =(
        searchResult.length !== 0 ?
            <div className="queri-list">
                {searchResult.map((product,index)=>(
                    <p
                        key={index}
                        onClick={()=> {
                            history.push(`/search&q=${(product.replace(/ /g, '-'))}`)
                            setOpen(!open)
                        }}
                        className="product-list"
                    >{product}</p>
                ))}
            </div>
            :<div className="queri-list">
                <p className="product-list">Tidak di temukan</p>
            </div>
    )
    return(
        <header>
            <div className="navbar">
                <div className="main-header">
                    <div className="logo-brand">
                        <Link to='/' className='logo-link'>mulai jualan</Link>
                    </div>
                    <div className={`btn-back btn-back-${pathname !== '/' ? 'active':''}`} onClick={()=>history.goBack()}>
                        <i className="material-icons mdc-icon-button__icon" >keyboard_backspace</i>
                    </div>
                    <div className="header-menu">
                        <div className="header-search">
                            <form className="input-group" onSubmit={onSubmit} >
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
                        <i className="material-icons mdc-icon-button__icon cart-header" onClick={()=>{history.push('/carts/')}} data-badge={0?null:null}>shopping_cart</i>
                        {/*<i className="material-icons mdc-icon-button__icon" data-badge={10}>notifications</i>*/}
                        {/*<i className="material-icons mdc-icon-button__icon" data-badge={0?0:null}*/}
                        {/*>chat_bubble</i>*/}
                    </div>
                    <div className="header-btn">
                        <Link className='button-primary' to={'/login'}>Login</Link>
                        <Link className='button-outline-primary' to={'/register'}>Register</Link>
                    </div>
                    <div className="mobile-menu" onClick={()=>setDrawer(!drawer)}>
                        <i className="material-icons mdc-icon-button__icon" data-badge={10}>reorder</i>
                    </div>
                </div>
            </div>
            <div className={`drawerHeader ${drawer ? `drawerShow` : 'drawerUnShow'}`} >
                <p className="closebtn" onClick={()=>setDrawer(0)} >&times;</p>
                <Link to={''} className='linkbtn'>Home</Link>
                <Link to={''} className='linkbtn'>Services</Link>
                <Link to={''} className='linkbtn'>Clients</Link>
                <Link to={''} className='linkbtn'>Contact</Link>
                <div className="divider-drawer"/>

                <Link to={''} className='linkbtn'>Settings</Link>
                <Link to={''} className='linkbtn'>Logout</Link>
            </div>
            <div className="search" style={{display:open?'flex':'none'}}>
                <div className="search__result">
                    <div className="search-item">
                        {resultSearch}
                    </div>
                </div>
                <div className="search__close" onClick={()=>{setOpen(0)}}/>
            </div>
            <div className={`snackbar ${snackbar?`show`:null}`}><i className="material-icons mdc-icon-button__icon">notification_important</i>Tidak boleh kosong</div>
        </header>
    )
}

export default NavigasiBar