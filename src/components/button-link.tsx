import Link from 'next/link';

type ButtonLinkProps = {
  className: string;
  text: string;
  link: string;
};

export const ButtonLink = ({ className, text, link }: ButtonLinkProps) => (
  <Link
    href={link}
    className={`${className} rounded-md px-5 py-3 text-base font-medium`}
  >
    {text}
  </Link>
);
