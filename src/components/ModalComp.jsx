import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    FormControl,
    FormLabel,
    Input,
    Box,
} from "@chakra-ui/react";
import { useState } from "react";

const ModalComp = ({ data, setData, dataEdit, isOpen, onClose}) => {
    const [name, setName] = useState(dataEdit.name || "");
    const [email, setEmail] = useState(dataEdit.email || "");

    const handleSave = () => {
        if (!name || !email) return;

        if (emailHandlerExists()) {
            return alert("E-mail já cadastrado!");
        };

        if (Object.keys(dataEdit).length) {
            data[dataEdit.index] = { name, email};
        }

        const newDataArray = !Object.keys(dataEdit).length
            ? [...(data ? data : []), {name, email}]
            : [...(data ? data : [])];

        localStorage.setItem("cad_cliente", JSON.stringify(newDataArray));

        setData(newDataArray);

        onClose();
    };

    const emailHandlerExists = () => {
        if (dataEdit.email !== email && data?.length1) {
            return data.find((item) => item.email === email);
        }
    };

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Cadastro de Cliente</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl display="flex" flexDir="colum" gap={4}>
                            <Box>
                                <FormLabel>Nome</FormLabel>
                                <Input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </Box>
                        </FormControl>
                    </ModalBody>

                    <ModalFooter justifyContent="start"> 
                        <Button colorScheme="green" mr={3} onClick={handleSave}>
                            SAVE
                        </Button>
                        <Button colorScheme="red" onClick={onClose}>
                            CANCEL
                        </Button>
                    </ModalFooter>

                </ModalContent>
            </Modal>
        </>
    );
};

export default ModalComp;