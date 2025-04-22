// Footer.tsx
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full border-t bg-background py-[40px] md:py-12">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
          <div className="space-y-3">
            <h3 className="text-lg font-medium">About</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  About Us
                </Link>
              </li>
              {/* <li>
                <Link
                  href="/blog"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Blog
                </Link>
              </li> */}
              {/* <li>
                <Link
                  href="/careers"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Careers
                </Link>
              </li> */}
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="text-lg font-medium">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Contact Us
                </Link>
              </li>
              {/* <li>
                <Link
                  href="/help"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Help Center
                </Link>
              </li> */}
              {/* <li>
                <Link
                  href="/faq"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  FAQ
                </Link>
              </li> */}
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="text-lg font-medium">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/terms"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Privacy Policy
                </Link>
              </li>
              {/* <li>
                <Link
                  href="/cookies"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Cookie Policy
                </Link>
              </li> */}
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="text-lg font-medium">Connect</h3>
            <ul className="space-y-2">
              {/* <li>
                <Link
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Twitter
                </Link>
              </li> */}
              {/* <li>
                <Link
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Facebook
                </Link>
              </li> */}
              <li>
                <Link
                  href="https://www.instagram.com/officiala1school "
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Instagram
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t pt-6 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} A1 School. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {/* <Link
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Terms
            </Link> */}
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Privacy
            </Link>
            {/* <Link
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Cookies
            </Link> */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
