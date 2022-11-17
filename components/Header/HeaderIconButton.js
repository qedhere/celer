export default function HeaderIconButton(props) {
  return (
    <button
      className="duration-100 text-gray-400 hover:text-black-500"
      onClick={props.onClick}
    >
      {props.icon}
    </button>
  );
}
