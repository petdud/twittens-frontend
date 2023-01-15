import { classNames } from "../../utils";

interface IContainerProps  {
  fullWidth?: boolean;
  top?: "none" | "small" | "medium" | "large";
  children: JSX.Element | JSX.Element[];
}
export const Container = ({fullWidth, top = "medium", children}: IContainerProps) => (
  <div className={
    classNames(
      top === "small" ? "pt-2 sm:pt-4" : "",
      top === "medium" ? "pt-3 sm:pt-6" : "",
      top === "large" ? "pt-5 sm:pt-10" : "",
      fullWidth ? 
        "max-w-full px-2 sm:px-6 md:px-8 mx-2 md:mx-5 mb-10" 
      : "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-10",
      "pb-10"
    )
  }>
    {children}
  </div>
);
