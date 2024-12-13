import { CreateLinkButton } from "../buttons";
import { DebouncedSearch } from "../inputs";

const PageHeader = ({
  title,
  handleSearchChange,
  searchTerm,
  searchPlaceholder,
  createButtonLabel,
  createButtonLink,
  hideCreateButton,
}: {
  title?: string;
  handleSearchChange: (term: string) => void;
  searchTerm: string;
  searchPlaceholder: string;
  createButtonLabel: string;
  createButtonLink: string;
  hideCreateButton: boolean;
}) => {
  return (
    <div className="sm:flex sm:justify-between sm:items-center mb-5">
      {/* Left: Title */}
      <div className="mb-4 sm:mb-0">
        {title && (
          <h1 className="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold">
            {title} ✨
          </h1>
        )}
      </div>

      {/* Right: Actions */}
      <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
        {/* Search form */}
        <DebouncedSearch
          onSearchChange={(value) => handleSearchChange(value)}
          value={searchTerm}
          placeholder={searchPlaceholder}
        />
        {/* Create button */}
        {!hideCreateButton && (
          <CreateLinkButton label={createButtonLabel} href={createButtonLink} />
        )}
      </div>
    </div>
  );
};

export default PageHeader;
