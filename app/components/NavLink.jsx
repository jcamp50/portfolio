import Link from 'next/link';

const NavLink = ({ href, title }) => {
  return (
    <Link
      href={href}
      className='block py-2 pl-2 pr-4 text-[#ede4e4] sm:text-2xl rounded md:p-0 hover:text-[#3cce6d]'
    >
      {title}
    </Link>
  );
};

export default NavLink;
