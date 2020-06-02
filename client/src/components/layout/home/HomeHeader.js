import React from 'react';

const HomeHeader = ()=>{
    return(
        <div className="bg-gradient text-light header-jumbotron">
            <div className="container">
                <div className="row">
                    <div className="col-sm-2">
                        <img src={process.env.PUBLIC_URL + '/uploads/1.png'} alt="" style={{width:'200px'}}/>
                    </div>
                    <div className="col-sm-8">
                        <h1 className="large font-weight-bold" style={{fontFamily:"arial",fontSize:'200%'}}>Pariwisata KAB.Karawang</h1>
                        <p className="lead">Untuk memenuhi tugas akhir skripsi.</p>
                        <h3 className={'btn btn-danger'}>WEBSITE SEDANG DI KERJAKAN</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomeHeader;