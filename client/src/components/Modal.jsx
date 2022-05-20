import { Modal, Button } from "react-bootstrap";

function ModalCom(props) {
    return (
        <Modal show={props.showModal} onHide={props.toggleModal}>
            <Modal.Header closeButton>
                <Modal.Title>{props.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{props.msg}</Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={props.toggleModal}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalCom;
