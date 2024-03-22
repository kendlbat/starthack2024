import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Authenticated from "./auth/Authenticated";

const Layout = () => {
    return (
        <Authenticated>
            <div className="flex flex-col flex-nowrap h-full fixed left-0 top-0 w-full">
                <Navbar />
                <main className="h-full p-2 flex-grow">
                    <Outlet />
                </main>
                <Footer />
            </div>
        </Authenticated>
    );
};

export default Layout;
