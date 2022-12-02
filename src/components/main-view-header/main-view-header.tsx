export const MainViewHeader = ({title}: {title: string | JSX.Element}) => (
  <div className="max-w-full px-2 sm:px-6 md:px-8 mx-5">
    <h1 className="text-2xl font-semibold text-gray-900 dark:text-neutral-200">{title}</h1>
  </div>
)