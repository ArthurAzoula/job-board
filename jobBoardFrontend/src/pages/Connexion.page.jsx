import AuthentificationForm from "../components/AuthentificationForm";

const ConnexionPage = () => {


    return (
        <>
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-gray-100 py-8 px-4 shadow-lg sm:rounded-lg">
                    <div className="flex justify-center">
                        <AuthentificationForm />
                    </div>
                </div>
            </div>
        </>
    )
}

export default ConnexionPage;