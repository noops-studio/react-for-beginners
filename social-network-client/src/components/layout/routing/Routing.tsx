import { Navigate, Route, Routes } from "react-router-dom"
import Profile from "../../posts/profile/Profile"
import Feed from "../../posts/feed/Feed"
import NotFound from "../not-found/NotFound"
import EditPost from "../../posts/edit/EditPost"
import Search from "../../posts/search/Search"
import Defer from "../../posts/defer/Defer"

function Routing(): JSX.Element {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/profile" />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/edit/:id" element={<EditPost />} />
            <Route path="/feed" element={<Feed />} />
            <Route path="/search" element={<Search />} />
            <Route path="/defer" element={<Defer />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}

export default Routing