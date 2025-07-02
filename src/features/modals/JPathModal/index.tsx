import React from "react";
import type { ModalProps } from "@mantine/core";
import { Stack, Modal, Button, Text, Group, TextInput } from "@mantine/core";
import { JSONPath } from "jsonpath-plus";
import toast from "react-hot-toast";
import useFile from "../../../store/useFile";
import useJson from "../../../store/useJson";

export const JPathModal = ({ opened, onClose }: ModalProps) => {
  const getJson = useJson(state => state.getJson);
  const setContents = useFile(state => state.setContents);
  const [query, setQuery] = React.useState("");

  const evaluteJsonPath = () => {
    try {
      const json = getJson();
      const result = JSONPath({ path: query, json: JSON.parse(json) });

      setContents({ contents: JSON.stringify(result, null, 2) });
      onClose();
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
    }
  };

  return (
    <Modal title="JSON 路径" size="lg" opened={opened} onClose={onClose} centered>
      <Stack>
        <Text fz="sm">
          JsonPath 表达式总是以与 XPath 表达式结合 XML 文档相同的方式引用 JSON 结构。 JsonPath
          中的“根成员对象”始终称为 $，无论它是对象还是数组。
        </Text>
        <TextInput
          value={query}
          onChange={e => setQuery(e.currentTarget.value)}
          placeholder="输入 JSON 路径..."
          data-autofocus
        />
        <Group justify="right">
          <Button onClick={evaluteJsonPath} disabled={!query.length}>
            运行
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
};
