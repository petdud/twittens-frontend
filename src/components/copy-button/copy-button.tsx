import { useCallback, useState } from "react";
import { AiOutlineCopy } from "react-icons/ai"
import copy from 'copy-to-clipboard';

interface ICopyButtonProps {
  /* value to copy */
  value: string;
}

export const CopyButton = ({value}: ICopyButtonProps) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleClick = useCallback(() => {
    copy(value);
    setShowTooltip(true);
    setTimeout(() => {
      setShowTooltip(false);
    }, 1500);
  }, [value]);
  
  return (
    <>
      <button title="Copy" aria-label="Copy wallet address" onClick={handleClick} className="cursor-pointer hover:bg-gray-200 hover:dark:bg-gray-800 ml-1 p-1 rounded-md">
        <AiOutlineCopy className="text-gray-600 dark:text-slate-300"/>
      </button>
      {showTooltip && <div className="text-green-600 font-semibold ml-1">Copied!</div>}
    </>
  )
}
