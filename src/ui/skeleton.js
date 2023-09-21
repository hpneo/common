import clsx from "clsx";

function Skeleton(props) {
  return (
    <span class={clsx("animate-pulse bg-gray-200 rounded block", props.class)}>
      &#8203;
    </span>
  );
}

export default Skeleton;
