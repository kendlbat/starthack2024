import { Link } from "react-router-dom";
import {
    Button,
    Navbar as FlowbiteNavbar,
    NavbarBrand,
    NavbarCollapse,
    NavbarLink,
    NavbarToggle,
} from "flowbite-react";
import CustomNavbarLink from "./CustomNavbarLink";
import AccountButton from "./AccountButton";

export default function Navbar() {
    return (
        <FlowbiteNavbar fluid rounded>
            <NavbarBrand as={Link} href="https://flowbite-react.com">
                <img
                    src="/favicon.svg"
                    className="mr-3 h-6 sm:h-9"
                    alt="Sch&auml;ppli Logo"
                />
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                    Sch&auml;ppli
                </span>
            </NavbarBrand>
            <div className="flex md:order-2 gap-2">
                <Button href="/api/auth/signout">Sign out</Button>
                <NavbarToggle />
            </div>
            <NavbarCollapse>
                <NavbarLink as={CustomNavbarLink} href="/" active>
                    Home
                </NavbarLink>
                <NavbarLink as={CustomNavbarLink} href="/plan">
                    Plan
                </NavbarLink>
                <NavbarLink as={CustomNavbarLink} href="/evaluate">
                    Evaluate
                </NavbarLink>
                <NavbarLink as={CustomNavbarLink} href="/review">
                    Review
                </NavbarLink>
            </NavbarCollapse>
        </FlowbiteNavbar>
    );
}
