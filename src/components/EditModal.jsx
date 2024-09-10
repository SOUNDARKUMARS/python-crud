import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../App";

const EditModal = ({ user, setUsers }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [inputs, setInputs] = useState({
    name: user?.name,
    role: user?.role,
    description: user?.description,
  });

  const createCard = async () => {
    try {
      const res = await axios.patch(`${BASE_URL}/friends/${user?.id}`, inputs);
      console.log("----------\n", res?.data?.error);
      if (res?.status === 200) {
        onClose();
        setInputs({
          name: "",
          role: "",
          description: "",
          gender: "",
        });
        window.location.reload();
      } else if (res?.data?.error) {
        alert(res?.data?.error);
      } else {
        alert("unknown error in updating card");
      }
    } catch (error) {
      // console.log(error.)
      console.log("failed to upadate card\n", error);
    }
  };

  return (
    <div>
      <Button onClick={onOpen} color={"blue"}>
        Edit
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update card</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Full name</FormLabel>
              <Input
                value={inputs.name}
                onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
                placeholder="John doe"
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Roll</FormLabel>
              <Input
                value={inputs.role}
                onChange={(e) => setInputs({ ...inputs, role: e.target.value })}
                placeholder="Software devolper"
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Description</FormLabel>
              <Textarea
                value={inputs.description}
                onChange={(e) =>
                  setInputs({ ...inputs, description: e.target.value })
                }
                placeholder="He is a software developer at xyx company with 10yoe"
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={() => createCard()} colorScheme="blue" mr={3}>
              Update
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default EditModal;
