import Link from "./Link";
function Navbar() {
  let beheer = <span></span>;
  if (sessionStorage.getItem("role") == "Beheerder") {
    beheer = (
      <li>
        <Link href="AdminProducten">
          <p>Beheer producten</p>
        </Link>
      </li>
    );
  }
  return (
    <div className="navbar bg-white">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link href="Producten">
                <p>Producten</p>
              </Link>
            </li>
            <li>
              <Link href="Verzameling">
                <p>Verzamelingen</p>
              </Link>
            </li>
            <li>
              <Link href="Cart">
                <p>Cart</p>
              </Link>
            </li>
            {beheer}
          </ul>
        </div>
        <Link href="Index">
          <p className="btn btn-ghost normal-case text-xl text-black">
            Verzamel blocks
          </p>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal p-0">
          <li>
            <Link href="Producten">
              <p>Producten</p>
            </Link>
          </li>
          <li>
            <Link href="Verzameling">
              <p>Verzamelingen</p>
            </Link>
          </li>
          <li>
            <Link href="Cart">
              <p>Cart</p>
            </Link>
          </li>
          {beheer}
        </ul>
      </div>
      <div className="navbar-end">
        <Link href="Inloggen">
          <p className="btn">Login</p>
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
