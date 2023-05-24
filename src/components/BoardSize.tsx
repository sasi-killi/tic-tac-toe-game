import {
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface Props {
  setBoxSize: Dispatch<SetStateAction<number>>;
}

const schema = z.object({
  boxSize: z
    .number({ invalid_type_error: "boxSize is required" })
    .min(3)
    .max(9),
});

type FormData = z.infer<typeof schema>;

function BoardSize({ setBoxSize }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });
  return (
    <>
      <Button colorScheme="blue" onClick={onOpen}>
        Start Game
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size={{ base: "xs", md: "sm", lg: "lg" }}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Board Size</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Enter Board Size :</FormLabel>
              <Input
                type="number"
                {...register("boxSize", { valueAsNumber: true })}
              />

              {errors.boxSize ? (
                <p className="text-danger">{errors.boxSize.message}</p>
              ) : (
                <FormHelperText>eg: Enter 3 for 3x3 board</FormHelperText>
              )}
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              type="submit"
              colorScheme="blue"
              mr={3}
              onClick={handleSubmit((data) => {
                console.log(data, errors);
                setBoxSize(data.boxSize);
              })}
            >
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default BoardSize;
