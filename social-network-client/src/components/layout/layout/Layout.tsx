import Comments from '../comments/Comments'
import Follows from '../follows/Follows'
import Footer from '../footer/Footer'
import Header from '../header/Header'
import Routing from '../routing/Routing'
import './Layout.css'

function Layout(): JSX.Element {
    return (
        <div className='Layout'>
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
        </div>
    )
}

export default Layout