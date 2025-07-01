import React from "react";
import { ThemeIcon, Tooltip } from "@mantine/core";
import { LuShieldCheck } from "react-icons/lu";

export const SecureInfo = () => {
  return (
    <Tooltip
      label="您的数据会在本地设备上进行处理。"
      fz="xs"
      ta="center"
      maw="200"
      multiline
      withArrow
    >
      <ThemeIcon
        variant="light"
        color="teal"
        size="36"
        style={{
          position: "absolute",
          bottom: "10px",
          right: "10px",
          zIndex: 100,
        }}
        radius="xl"
      >
        <LuShieldCheck size="22" />
      </ThemeIcon>
    </Tooltip>
  );
};
