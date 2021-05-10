import React from 'react'
import introImg from './assets/main.svg'

export default function Welcome() {
    return (
        <div className="welcome">
            <img src={introImg} alt="" />
            <h2>Keep your phone connected</h2>
        </div>
    )
}
