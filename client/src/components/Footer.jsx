import { Link } from "react-router-dom";
import { Footer } from "flowbite-react";

export default function CustomFooter() {
    return (
        <Footer container>
          <Footer.Copyright href="#" by="Nightjet Enjoyers" year={2024} />
          <Footer.LinkGroup>
            <Footer.Link href="#">About</Footer.Link>
            <Footer.Link href="#">Licensing</Footer.Link>
            <Footer.Link href="#">Contact</Footer.Link>
          </Footer.LinkGroup>
        </Footer>
      );
}
