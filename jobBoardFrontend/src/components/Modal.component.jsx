import { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

const Modal = ({ closeModal, children, isGrid}) => {
    const modalRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                closeModal();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [closeModal]);

    return ReactDOM.createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className={`bg-white rounded-lg shadow-lg p-6 ${isGrid ? 'grid grid-cols-2 gap-2' : ''}`} ref={modalRef}>
                {children}
            </div>
        </div>,
        document.getElementById('modal-root')
    );
};

export default Modal;