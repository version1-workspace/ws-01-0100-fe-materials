"use client";
import { ReactNode, createContext, useContext, useState } from "react";
import Modal, { ContainerConfig } from "./components";

const ModalContext = createContext({
  show: false,
  stack: [],
});

interface Props {
  config: ContainerConfig;
  children: ReactNode;
}

export const ModalContainer = ({ config, children }: Props) => {
  const [show, setShow] = useState(false);
  const [stack, setStack] = useState([]);

  const push = (content: Content) => {
    setStack([...stack, content]);
  };

  const pop = () => {
    const _stack = JSON.parse(JSON.stringify(stack));
    const content = _stack.pop();
    setStack(_stack);

    return content;
  };

  const peak = stack[0];

  const open = (content: Content) => {
    push(content);
    setShow(true);
  };

  const hide = () => {
    pop();
    setShow(false);
  };

  return (
    <ModalContext.Provider value={{ show, stack, peak, push, pop, open, hide }}>
      {children}
      <Modal config={config} show={show} onClose={hide}>
        {peak?.content || null}
      </Modal>
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const { show, push, pop, peak, open, hide } = useContext(ModalContext);

  return {
    show,
    push: push!,
    pop: pop!,
    peak: peak!,
    open: open!,
    hide: hide!,
  };
};
