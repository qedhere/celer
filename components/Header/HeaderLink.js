import Link from "next/link";

export default function HeaderLink(props) {
  return (
    <div>
      <Link href={props.href}>
        <button className="text-sm text-gray-500 hover:text-black-600 duration-200 dark:text-black-500 dark:hover:text-black-300">
          {props.children}
        </button>
      </Link>
    </div>
  );
}
