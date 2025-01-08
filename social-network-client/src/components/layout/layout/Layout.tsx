import { useContext } from 'react'
import Comments from '../comments/Comments'
import Follows from '../follows/Follows'
import Footer from '../footer/Footer'
import Header from '../header/Header'
import Routing from '../routing/Routing'
import './Layout.css'
import { AuthContext } from '../../auth/auth/Auth'
import Login from '../../auth/login/Login'

function Layout(): JSX.Element {

    const { jwt } = useContext(AuthContext)!

    return (
        <div className='Layout'>

            {!jwt && <>
                <main>
                    <Login />
                </main>
            </>}

            {jwt && <>
                <header>
                    <Header />
                </header>
                <aside id="follows">
                    <Follows />
                </aside>
                <main>
                    <Routing />
                </main>
                <aside id="comments">
                    <Comments />
                </aside>
                <footer>
                    <Footer />
                </footer>
            </>}
        </div>
    )
}

export default Layout