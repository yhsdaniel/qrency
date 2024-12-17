import React from 'react'
import logo from '/logo.svg'

export default function Header() {
    return (
        <header>
            <nav aria-label="Global" className="flex items-center justify-between p-2 lg:px-8">
                <div className="flex lg:flex-1">
                    <a href="#" className="-m-1.5 flex">
                        <img
                            alt="logo"
                            src={logo}
                            className="h-8 w-auto mx-2"
                        />
                        <span className="text-lg">Qrency</span>
                    </a>
                </div>
            </nav>
        </header>
    )
}
