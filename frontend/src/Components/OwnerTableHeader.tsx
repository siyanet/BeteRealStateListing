import { Plus } from "lucide-react";

interface OwnerTableHeaderProps {
    name: string;
    onClick: () => void;
  }
  
  const OwnerTableHeader: React.FC<OwnerTableHeaderProps> = ({ name, onClick }) => {
    return (
      <div className="flex justify-between items-center">
        <h1 className="p-2 font-bold text-md md:text-xl font-lato gradient-text">{name}</h1>
        <Plus onClick={onClick} className="cursor-pointer" />
      </div>
    );
  };
  
  export default OwnerTableHeader;