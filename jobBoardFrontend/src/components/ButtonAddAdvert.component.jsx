import PlusIcon from "../icons/Plus.icon";

const ButtonAddAdvert = () => {
    return (
        <div className="flex justify-end">
            <button className="bg-white border border-black text-gunmetal px-4 py-2 rounded-md flex items-center">
                <PlusIcon className="w-4 h-4 mr-2" />  
                <span>Ajouter une annonce</span>
            </button>
        </div>
    );
};

export default ButtonAddAdvert;