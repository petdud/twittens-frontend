import { classNames } from "../../utils";

interface IChildrenProps {
  children: JSX.Element | JSX.Element[];
  onClick?: () => void;
}

interface ITableHeaderItemProps {
  name: string;
  isFirst?: boolean;
  isLast?: boolean;
}

interface ITableColumnProps {
  children: JSX.Element | number | string;
  isFirst?: boolean;
  isLast?: boolean;
}


export const Table = ({children}: IChildrenProps) => (
  <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
      <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
        <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-600">
          {children}
        </table>
      </div>
    </div>
  </div>
)

export const TableHeader = ({children}: IChildrenProps) => (
  <thead className="bg-gray-50 dark:bg-neutral-700">
    <tr>
      {children}
    </tr>
  </thead>
)

export const TableHeaderItem = ({name, isFirst, isLast}: ITableHeaderItemProps) => (
  <th
    scope="col"
    className={
      classNames(
        "py-3 pr-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-300",
        isFirst ? "pl-4 sm:pl-6" : "",
        isLast ? "pr-4 sm:pr-6 text-right" : "",
      )}
  >
    {name}
  </th>
)

export const TableBody = ({children}: IChildrenProps) => (
  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
    {children}
  </tbody>
);


export const TableRow = ({children, onClick}: IChildrenProps) => (
  <tr className="bg-white hover:bg-slate-100 dark:bg-neutral-800 dark:hover:bg-neutral-900 cursor-pointer" onClick={onClick}>
    {children}
  </tr>
);

export const TableColumn = ({children, isFirst, isLast}: ITableColumnProps) => (
  <td className={classNames(
    "whitespace-nowrap px-3 py-4 text-sm text-gray-500",
    isFirst ? "pl-4 pr-3 sm:pl-6" : "",
    isLast ? "pr-4 text-right sm:pr-6" : ""
  )}>
    {children}
  </td>
);
