import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import { ReactComponent as HamburgerIcon } from "./../assets/hamburger-icon.svg";
import { ReactComponent as HomeIcon } from "./../assets/home-icon.svg";
import { ReactComponent as HeartOutlineIcon } from "./../assets/heart-outline-icon.svg";
import LogInOrOutButton from "./LogInOrOutButton";

const sidebarVariant = {
  open: {
    scaleX: 1,
    transition: {
      when: "beforeChildren",
    },
  },
  closed: {
    scaleX: 0,
    transition: {
      when: "afterChildren",
    },
  },
};

const navVariant = {
  open: {
    opacity: 1,
  },
  closed: {
    opacity: 0,
  },
};

export default function SideNav() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  function toggleNav() {
    setIsNavOpen((isNavExpanded) => !isNavExpanded);
  }

  return (
    <>
      <AnimatePresence>
        {isNavOpen ? <Menu close={() => setIsNavOpen(false)} /> : null}
      </AnimatePresence>
      <button onClick={toggleNav}>
        <div className="flex items-center justify-center w-12 h-12 bg-gray-200 rounded-full">
          <HamburgerIcon className="w-6 h-6" />
        </div>
      </button>
    </>
  );
}

function Menu({ close }) {
  return (
    <div className="absolute top-0 left-0 z-10 w-full h-full overflow-hidden">
      <motion.div
        initial="closed"
        animate="open"
        exit="closed"
        variants={sidebarVariant}
        className="relative z-10 w-4/5 h-screen p-6 pt-8 origin-left bg-indigo"
      >
        <motion.nav
          key="sidebar"
          variants={navVariant}
          className="text-gray-500"
        >
          <Link to="/" onClick={close}>
            <h2 className="mb-6 text-2xl text-gray-100 border-b-2 border-yellow-500 font-display">
              MiniBar
            </h2>
          </Link>
          <ul className="space-y-6">
            <li>
              <MenuLink
                to="/"
                onClick={close}
                icon={<HomeIcon className="w-4 h-4" />}
                label="Home"
              />
            </li>
            <li>
              <MenuLink
                to="/favorites"
                onClick={close}
                icon={<HeartOutlineIcon className="w-4 h-4" />}
                label="Favorites"
              />
            </li>
            <li>
              <MenuLink
                to="/ingredients/alcohol"
                onClick={close}
                label="Ingredients"
              />
            </li>
            <li>
              <LogInOrOutButton />
            </li>
          </ul>
        </motion.nav>
      </motion.div>
      <motion.div
        key="overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        exit={{ opacity: 0 }}
        className="absolute top-0 left-0 z-0 w-full h-screen bg-black opacity-50"
        onClick={close}
      ></motion.div>
    </div>
  );
}

function MenuLink({ to, onClick, icon, label }) {
  return (
    <NavLink to={to} exact onClick={onClick} activeClassName="text-gray-100">
      <div className="flex items-center">
        <div className="flex-shrink-0 w-4 h-4 mr-3">{icon}</div>
        <div>{label}</div>
      </div>
    </NavLink>
  );
}
