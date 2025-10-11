import Image from "next/image";
import Link from "next/link";
import { Bell, Home, ShoppingCart, User } from "lucide-react";
import SearchBar from "./SearchBar";

const Navbar = () => {
  return (
    <nav className="w-full flex items-center justify-between border-b border-gray-200 pb-4">
      {/* LEFT */}
      <Link href="/" className="flex items-center">
        <Image
          src="/logo.png"
          alt="TrendCha Logo"
          width={36}
          height={36}
          className="w-6 h-6 md:w-9 md:h-9"
        />
        <p className="hidden md:block text-md font-medium tracking-wider">
          TRENDCHA.
        </p>
      </Link>
      {/* RIGHT */}
      <div className="flex items-center gap-6">
        <SearchBar />
        <Link href="/">
          <Home className="w-4 h-4 text-gray-600" />
        </Link>
        <Bell className="w-4 h-4 text-gray-600" />

        <Link href="/login" className="link-base link-hover-amber hover-glow">
          <User className="w-4 h-4" />
          <span>Sign in</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
