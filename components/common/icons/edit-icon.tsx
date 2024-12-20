import { FC, MouseEventHandler } from "react";

type EditIconProps = {
  id?: string;
  onClick?: MouseEventHandler<SVGSVGElement>;
};

const EditIcon: FC<EditIconProps> = ({ id, onClick = () => {} }) => {
  return (
    <svg
      id={id}
      onClick={onClick}
      className="w-8 h-8 fill-current"
      viewBox="0 0 32 32"
    >
      <path d="M19.7 8.3c-.4-.4-1-.4-1.4 0l-10 10c-.2.2-.3.4-.3.7v4c0 .6.4 1 1 1h4c.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4l-4-4zM12.6 22H10v-2.6l6-6 2.6 2.6-6 6zm7.4-7.4L17.4 12l1.6-1.6 2.6 2.6-1.6 1.6z" />
    </svg>
  );
};

export default EditIcon;
