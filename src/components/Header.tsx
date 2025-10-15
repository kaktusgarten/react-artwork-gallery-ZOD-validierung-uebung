import { NavLink } from "react-router";
export default function Header() {
  return (
    <>
      <header className="p-4">
        <h1 className="text-5xl italic font-serif">
          ARTWORK GALLERY{" "}
          <span className="text-lg">- ZOD Übung - https://zod.dev/</span>
        </h1>
        <nav className="pt-5">
          <ul className="flex gap-5">
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/about">About</NavLink>
            </li>
            <li>
              <NavLink to="/login">Anmelden</NavLink>
            </li>
            <li>
              <NavLink to="/registrierung">Registrierung</NavLink>
            </li>
            <li>
              <NavLink to="/admin-bereich">Admin Bereich</NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
