import {
  Cloud,
  CreditCard,
  Github,
  Keyboard,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  Settings,
  User,
  UserPlus,
  Users,
  ShoppingCart,
  Menu,
  X
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { logout } from '../redux/user/authSlice';
import { auth } from '../firebase/firebase';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useCart } from "@/context/CartContext"
import CartDropdown from "./CartDropdown"
import { Button } from "@/components/ui/button"

interface Dropdown {
  name: string;
  url: string;
  className: string;
}

export interface Links {
  name: string;
  url: string;
  className: string;
  dropdown?: Dropdown[];
}

interface Navbarprops {
  links: Links[];
  logoUrl: string;
}

const Navbar: React.FC<Navbarprops> = ({ links, logoUrl }) => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: RootState) => state.auth);
  const [isOpen, setIsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { totalItems } = useCart();

  const handleLogout = async () => {
    await auth.signOut();
    dispatch(logout());
  };

  return (
    <nav className="relative bottom-7 max-w-full z-50">
      <div className="bg-[#161616] fixed mt-6 flex justify-between items-center w-full px-4 md:px-16 py-5 z-50">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="text-white md:hidden"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <Link to="/">
            <img
              src={logoUrl}
              alt="vision.sa"
              className="w-32 h-8"
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <div className="links font-normal text-white relative flex gap-16 z-50">
            {links.map((link) => (
              <div key={link.name} className="relative group duration-300">
                <Link
                  to={link.url}
                  className={`hover:text-gray-400 ${link.className}`}
                >
                  {link.name}
                </Link>
                {link.dropdown && (
                  <div className="duration-75 absolute hidden group-hover:block mt-2 py-2 w-48 bg-white rounded-md shadow-lg">
                    {link.dropdown.map((dropdownlink) => (
                      <Link
                        key={dropdownlink.name}
                        to={dropdownlink.url}
                        className="block px-4 py-5 text-gray-800 hover:bg-gray-200"
                      >
                        {dropdownlink.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Cart Button */}
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="text-white"
              onClick={() => setIsCartOpen(!isCartOpen)}
            >
              <ShoppingCart className="h-6 w-6" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Button>

            <CartDropdown isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
          </div>

          {currentUser ? (
            <div className="flex items-center space-x-4">
              <span className="text-white">{currentUser.email}</span>
              <button
                onClick={handleLogout}
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="space-x-4">
              <Link
                to="/signin"
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: -300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            className="fixed inset-y-0 left-0 w-3/4 bg-[#161616] shadow-lg z-40 md:hidden"
          >
            <div className="flex flex-col p-4 mt-20">
              {links.map((link) => (
                <div key={link.name} className="py-2">
                  <Link
                    to={link.url}
                    className="text-white hover:text-gray-400"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                  {link.dropdown && (
                    <div className="pl-4 mt-2 space-y-2">
                      {link.dropdown.map((dropdownlink) => (
                        <Link
                          key={dropdownlink.name}
                          to={dropdownlink.url}
                          className="block text-gray-300 hover:text-white"
                          onClick={() => setIsOpen(false)}
                        >
                          {dropdownlink.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              {!currentUser && (
                <Link to="/signin" onClick={() => setIsOpen(false)}>
                  <Button variant="ghost" className="text-white mt-4 w-full">
                    Sign In
                  </Button>
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar; 