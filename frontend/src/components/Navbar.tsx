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
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Link } from "react-router-dom"
import { useSelector, UseSelector } from "react-redux"
import { Button } from "@/components/ui/button"
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

interface Navbarprops {
  logoUrl: string;
  links: Links[];
}

interface Links {
  name: string;
  url: string;
  className: string;
  dropdown: Dropdown[];
}

interface Dropdown {
  name: string;
  url: string;
}

const Navbar: React.FC<Navbarprops> = ({ links, logoUrl }) => {
  const { currentUser } = useSelector((state: any) => state.user);


  return (
    <nav className=" relative bottom-7 max-w-full z-50"> {/* Added z-50 for high z-index */}

      <div className="bg-[#161616] fixed mt-6 flex justify-between items-center w-full px-16 py-5 max-lg:w-max z-50">

        <div className="links w-39 h-19 font-normal gap-16 text-white relative flex z-50">
          {currentUser ? (
            <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button>
                <Avatar>
                  <AvatarImage src={currentUser.PhotoUrl}/>
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>

              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                  <Link to={"/dashboard?tab=profile"}>
                  <span>Profile</span>
                  </Link>
                  <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>

                </DropdownMenuItem>
                <DropdownMenuItem>
                <CreditCard className="mr-2 h-4 w-4" />

                  <Link to={"/billing"}>   
                  <span>Billing</span>
                  </Link>
          
                  <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                  <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Keyboard className="mr-2 h-4 w-4" />
                  <span>Keyboard shortcuts</span>
                  <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <Users className="mr-2 h-4 w-4" />
                  <span>Team</span>
                </DropdownMenuItem>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    <UserPlus className="mr-2 h-4 w-4" />
                    <span>Invite users</span>
                  </DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                      <DropdownMenuItem>
                        <Mail className="mr-2 h-4 w-4" />
                        <span>Email</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <MessageSquare className="mr-2 h-4 w-4" />
                        <span>Message</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        <span>More...</span>
                      </DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
                <DropdownMenuItem>
                  <Plus className="mr-2 h-4 w-4" />
                  <span>New Team</span>
                  <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Github className="mr-2 h-4 w-4" />
                <span>GitHub</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <LifeBuoy className="mr-2 h-4 w-4" />
                <span>Support</span>
              </DropdownMenuItem>
              <DropdownMenuItem disabled>
                <Cloud className="mr-2 h-4 w-4" />
                <span>API</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
                <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          ):(
            <div className="hidden">

            </div>
          )}
   
          {links.map((link) => (
            <div key={link.name} className="relative group duration-300">
              <a
                href={link.url}
                className={`hover:text-gray-400 ${link.className} `}
              >
                {link.name}
              </a>
              {link.dropdown && (
                <div className="duration-75 absolute hidden group-hover:block mt-2 py-2 w-48 bg-white rounded-md shadow-lg">
                  {link.dropdown.map((dropdownlink) => (
                    <a
                      key={dropdownlink.name}
                      href={dropdownlink.url}
                      className="block px-4 py-5 text-gray-800 hover:bg-gray-200"
                    >
                      {dropdownlink.name}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        <div>
          <img
            src={logoUrl}
            alt="vision.sa"
            className="w-32 h-8 flex-auto"
          />
        </div>
      </div>

    </nav>
  );
};

export default Navbar;
