import Filtres from "./Filtres.component";
import ButtonAddAdvert from "./ButtonAddAdvert.component";

const Annonces = () => {
    return (
        <>
            <div className="flex justify-center mt-12">
                <Filtres />
            </div>
            <div>
                Les annonces
            </div>
        </>
    )
}

export default Annonces;