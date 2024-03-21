import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer"
import Authenticated from "./auth/Authenticated";

const Layout = () => {
    return (
        <Authenticated>
            <div>
                <Navbar />
                <main className="h-100 p-2">
                    <Outlet />
                    <Footer/>
                </main>
            </div>
        </Authenticated>
    );
};

export default Layout;
