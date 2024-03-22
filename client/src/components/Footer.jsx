import { Link } from "react-router-dom";
import {
    Footer,
    FooterBrand,
    FooterCopyright,
    FooterLink,
} from "flowbite-react";

export default function CustomFooter() {
    return (
        <Footer container className="">
            <Footer.Copyright href="#" by="Nightjet Enjoyers" year={2024} />
            <div className="text-center py-2">
                <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
                    An Äppli a day keeps the tutor away!
                </span>
            </div>
            <Footer.LinkGroup className="flex flex-col">
                <FooterLink href="https://www.linkedin.com/in/kendlbat/">
                    Tobias Kendlbacher
                </FooterLink>
                <FooterLink>Markus Schertler</FooterLink>
                <FooterLink>Adrián Pintér</FooterLink>
                <FooterLink href="https://www.linkedin.com/in/andreas-stettin/">
                    Andreas Stettin
                </FooterLink>
            </Footer.LinkGroup>
        </Footer>
    );
}
