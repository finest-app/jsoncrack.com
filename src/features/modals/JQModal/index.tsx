import React from "react";
import type { ModalProps } from "@mantine/core";
import { Stack, Modal, Button, Text, Group, TextInput } from "@mantine/core";
import useJsonQuery from "../../../hooks/useJsonQuery";

export const JQModal = ({ opened, onClose }: ModalProps) => {
  const { updateJson } = useJsonQuery();
  const [query, setQuery] = React.useState("");

  return (
    <Modal title="JSON 查询" size="lg" opened={opened} onClose={onClose} centered>
      <Stack>
        <Text fz="sm">
          jq 是一个轻量级且灵活的命令行 JSON 处理器。JSON Crack 使用简化版本的 jq，不支持所有功能。
        </Text>
        <TextInput
          leftSection="jq"
          placeholder="输入 jq 查询"
          value={query}
          onChange={e => setQuery(e.currentTarget.value)}
        />
        <Group justify="right">
          <Button onClick={() => updateJson(query, onClose)}>在图形中显示</Button>
        </Group>
      </Stack>
    </Modal>
  );
};
