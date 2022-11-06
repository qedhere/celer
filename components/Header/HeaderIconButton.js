export default function HeaderIconButton(props) {
  return (
    <button
      className="dark:text-neutral-600 dark:hover:text-black-400 duration-100 text-gray-400 hover:text-black-500"
      onClick={props.onClick}
    >
      {props.icon}
    </button>
  );
}
