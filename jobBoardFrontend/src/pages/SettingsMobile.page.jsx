import Settings from "../components/Settings.component";
import Appliers from "../components/Appliers.component";

const SettingsMobile = () => {
    return (
        <>
            <h1 className="text-2xl text-center mt-4 font-bold mb-4">Espaces Candidatures</h1>
            <div className="mb-8">
                <Appliers />
            </div>
            <h1 className="text-2xl text-center mt-4 font-bold mb-4">Paramètres</h1>
            <div>
                <Settings />
            </div>
        </>
    );
};

export default SettingsMobile;
