import Link from "next/link";
import EditIcon from "../icons/edit-icon";

const EditLinkButton = ({ href }: { href: string }) => {
  return (
    <Link
      className="text-slate-400 hover:text-slate-500 dark:text-slate-500 dark:hover:text-slate-400 rounded-full"
      href={href}
    >
      <EditIcon />
    </Link>
  );
};

export default EditLinkButton;
