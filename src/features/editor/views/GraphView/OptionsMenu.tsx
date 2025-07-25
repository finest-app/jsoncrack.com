import React from "react";
import { ActionIcon, Button, Flex, Menu, Text } from "@mantine/core";
import { useHotkeys } from "@mantine/hooks";
import styled from "styled-components";
import { BsCheck2 } from "react-icons/bs";
import { LuChevronRight, LuImageDown, LuMenu } from "react-icons/lu";
import { TiFlowMerge } from "react-icons/ti";
import { VscExpandAll, VscCollapseAll } from "react-icons/vsc";
import useToggleHide from "../../../../hooks/useToggleHide";
import useConfig from "../../../../store/useConfig";
import { useModal } from "../../../../store/useModal";
import type { LayoutDirection } from "../../../../types/graph";
import useGraph from "./stores/useGraph";

const StyledFlowIcon = styled(TiFlowMerge)<{ rotate: number }>`
  transform: rotate(${({ rotate }) => `${rotate}deg`});
`;

const getNextDirection = (direction: LayoutDirection) => {
  if (direction === "RIGHT") return "DOWN";
  if (direction === "DOWN") return "LEFT";
  if (direction === "LEFT") return "UP";
  return "RIGHT";
};

const rotateLayout = (direction: LayoutDirection) => {
  if (direction === "LEFT") return 90;
  if (direction === "UP") return 180;
  if (direction === "RIGHT") return 270;
  return 360;
};

export const OptionsMenu = () => {
  const toggleGestures = useConfig(state => state.toggleGestures);
  const toggleChildrenCount = useConfig(state => state.toggleChildrenCount);
  const toggleRulers = useConfig(state => state.toggleRulers);
  const toggleCollapseButton = useConfig(state => state.toggleCollapseButton);
  const toggleImagePreview = useConfig(state => state.toggleImagePreview);
  const gesturesEnabled = useConfig(state => state.gesturesEnabled);
  const childrenCountVisible = useConfig(state => state.childrenCountVisible);
  const rulersEnabled = useConfig(state => state.rulersEnabled);
  const collapseButtonVisible = useConfig(state => state.collapseButtonVisible);
  const imagePreviewEnabled = useConfig(state => state.imagePreviewEnabled);
  const { validateHiddenNodes } = useToggleHide();
  const setDirection = useGraph(state => state.setDirection);
  const direction = useGraph(state => state.direction);
  const expandGraph = useGraph(state => state.expandGraph);
  const collapseGraph = useGraph(state => state.collapseGraph);
  const graphCollapsed = useGraph(state => state.graphCollapsed);
  const setVisible = useModal(state => state.setVisible);
  const [coreKey, setCoreKey] = React.useState("CTRL");

  const toggleDirection = () => {
    const nextDirection = getNextDirection(direction || "RIGHT");
    if (setDirection) setDirection(nextDirection);
  };

  const toggleExpandCollapseGraph = () => {
    if (graphCollapsed) expandGraph();
    else collapseGraph();

    validateHiddenNodes();
  };

  useHotkeys(
    [
      ["mod+shift+d", toggleDirection],
      ["mod+shift+c", toggleExpandCollapseGraph],
      [
        "mod+f",
        () => {
          const input = document.querySelector("#search-node") as HTMLInputElement;
          input.focus();
        },
      ],
    ],
    []
  );

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setCoreKey(navigator.userAgent.indexOf("Mac OS X") ? "⌘" : "CTRL");
    }
  }, []);

  return (
    <Flex
      gap="xs"
      align="center"
      style={{
        position: "absolute",
        top: "10px",
        left: "10px",
        zIndex: 100,
      }}
    >
      <Menu withArrow>
        <Menu.Target>
          <ActionIcon aria-label="actions" size="lg" color="gray" variant="light">
            <LuMenu size="18" />
          </ActionIcon>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item
            leftSection={<LuImageDown color="gray" />}
            onClick={() => setVisible("DownloadModal", true)}
          >
            <Flex fz="xs" justify="space-between" gap="md">
              <Text fz="xs">导出为图像</Text>
              <Text ml="md" fz={10} c="dimmed">
                {coreKey} + S
              </Text>
            </Flex>
          </Menu.Item>
          <Menu.Item
            fz={12}
            onClick={() => {
              toggleDirection();
            }}
            leftSection={<StyledFlowIcon rotate={rotateLayout(direction || "RIGHT")} />}
            rightSection={
              <Text ml="md" fz={10} c="dimmed">
                {coreKey} Shift D
              </Text>
            }
            closeMenuOnClick={false}
          >
            旋转布局
          </Menu.Item>
          <Menu.Item
            fz={12}
            onClick={() => {
              toggleExpandCollapseGraph();
            }}
            leftSection={graphCollapsed ? <VscExpandAll /> : <VscCollapseAll />}
            rightSection={
              <Text ml="md" fz={10} c="dimmed">
                {coreKey} Shift C
              </Text>
            }
          >
            {graphCollapsed ? "展开图" : "折叠图"}
          </Menu.Item>
          <Menu.Divider />
          <Menu position="right" trigger="hover" offset={0}>
            <Menu.Target>
              <Button
                variant="subtle"
                size="xs"
                color="text"
                fullWidth
                fw="400"
                rightSection={<LuChevronRight />}
                styles={{ root: { paddingInline: 11 }, inner: { justifyContent: "space-between" } }}
              >
                视图选项
              </Button>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item
                leftSection={<BsCheck2 opacity={rulersEnabled ? 100 : 0} />}
                onClick={() => {
                  toggleRulers(!rulersEnabled);
                }}
              >
                <Text size="xs">标尺</Text>
              </Menu.Item>
              <Menu.Item
                leftSection={<BsCheck2 opacity={gesturesEnabled ? 100 : 0} />}
                onClick={() => {
                  toggleGestures(!gesturesEnabled);
                }}
              >
                <Text size="xs">触控板手势</Text>
              </Menu.Item>
              <Menu.Item
                leftSection={<BsCheck2 opacity={childrenCountVisible ? 100 : 0} />}
                onClick={() => {
                  toggleChildrenCount(!childrenCountVisible);
                }}
              >
                <Text size="xs">项目数</Text>
              </Menu.Item>
              <Menu.Item
                leftSection={<BsCheck2 opacity={imagePreviewEnabled ? 100 : 0} />}
                onClick={() => {
                  toggleImagePreview(!imagePreviewEnabled);
                }}
              >
                <Text size="xs">图片链接预览</Text>
              </Menu.Item>
              <Menu.Item
                leftSection={<BsCheck2 opacity={collapseButtonVisible ? 100 : 0} />}
                onClick={() => {
                  toggleCollapseButton(!collapseButtonVisible);
                }}
              >
                <Text size="xs">显示展开/折叠</Text>
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Menu.Dropdown>
      </Menu>
    </Flex>
  );
};
