
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



  return (
    <nav className=" relative bottom-7 max-w-full z-50"> {/* Added z-50 for high z-index */}
      <div className="bg-[#161616] fixed mt-6 flex justify-between items-center w-full px-16 py-5 max-lg:w-max z-50">
        <div className="links w-39 h-19 font-normal gap-16 text-white relative flex z-50">
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
