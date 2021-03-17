import React,{ useEffect, useState } from 'react'
import axios from 'axios'


function LandingPage() {

    useEffect(() => {
      

    }, [])

    const makeRoom = () => {
        axios.post('http://localhost:8000/')
    }
    
    return (
        <div>
            <div>hi let's video chat</div>
            <button onClick={makeRoom}></button>
        </div>
    )
}

export default LandingPage
