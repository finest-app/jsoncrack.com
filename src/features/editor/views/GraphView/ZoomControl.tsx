import React from "react";
import { ActionIcon, Flex } from "@mantine/core";
import { useHotkeys } from "@mantine/hooks";
import { LuFocus, LuMaximize, LuMinus, LuPlus } from "react-icons/lu";
import { SearchInput } from "../../Toolbar/SearchInput";
import useGraph from "./stores/useGraph";

export const ZoomControl = () => {
  const zoomIn = useGraph(state => state.zoomIn);
  const zoomOut = useGraph(state => state.zoomOut);
  const centerView = useGraph(state => state.centerView);
  const focusFirstNode = useGraph(state => state.focusFirstNode);

  useHotkeys(
    [
      ["mod+[plus]", () => zoomIn],
      ["mod+[minus]", () => zoomOut],
      ["shift+Digit1", centerView],
    ],
    []
  );

  return (
    <Flex
      align="center"
      gap="xs"
      style={{
        position: "absolute",
        bottom: "10px",
        left: "10px",
        alignItems: "start",
        zIndex: 100,
      }}
    >
      <ActionIcon.Group borderWidth={0}>
        <ActionIcon
          size="lg"
          variant="light"
          color="gray"
          onClick={() => {
            focusFirstNode();
          }}
        >
          <LuFocus />
        </ActionIcon>
        <ActionIcon
          size="lg"
          variant="light"
          color="gray"
          onClick={() => {
            centerView();
          }}
        >
          <LuMaximize />
        </ActionIcon>
        <ActionIcon
          size="lg"
          variant="light"
          color="gray"
          onClick={() => {
            zoomOut();
          }}
        >
          <LuMinus />
        </ActionIcon>
        <ActionIcon
          size="lg"
          variant="light"
          color="gray"
          onClick={() => {
            zoomIn();
          }}
        >
          <LuPlus />
        </ActionIcon>
      </ActionIcon.Group>
      <SearchInput />
    </Flex>
  );
};
