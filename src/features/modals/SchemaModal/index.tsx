import React from "react";
import type { ModalProps } from "@mantine/core";
import { Stack, Modal, Button, Text, Anchor, Menu, Group, Paper } from "@mantine/core";
import Editor from "@monaco-editor/react";
import { toast } from "react-hot-toast";
import { FaChevronDown } from "react-icons/fa";
import { VscLinkExternal } from "react-icons/vsc";
import { FileFormat } from "../../../enums/file.enum";
import useConfig from "../../../store/useConfig";
import useFile from "../../../store/useFile";

export const SchemaModal = ({ opened, onClose }: ModalProps) => {
  const setContents = useFile(state => state.setContents);
  const setJsonSchema = useFile(state => state.setJsonSchema);
  const darkmodeEnabled = useConfig(state => (state.darkmodeEnabled ? "vs-dark" : "light"));
  const [schema, setSchema] = React.useState(
    JSON.stringify(
      {
        $schema: "http://json-schema.org/draft-04/schema#",
        title: "Product",
        description: "A product from catalog",
        type: "object",
        properties: {
          id: {
            description: "The unique identifier for a product",
            type: "integer",
          },
        },
        required: ["id"],
      },
      null,
      2
    )
  );

  const onApply = () => {
    try {
      const parsedSchema = JSON.parse(schema);
      setJsonSchema(parsedSchema);

      toast.success("应用架构成功！");
      onClose();
    } catch (error) {
      toast.error("无效架构");
    }
  };

  const onClear = () => {
    setJsonSchema(null);
    setSchema("");
    toast("已禁用 JSON 架构");
    onClose();
  };

  const generateMockData = async () => {
    try {
      const { JSONSchemaFaker } = await import("json-schema-faker");
      const data = JSONSchemaFaker.generate(JSON.parse(schema));
      setContents({ contents: JSON.stringify(data, null, 2), format: FileFormat.JSON });

      onClose();
    } catch (error) {
      console.error(error);
      toast.error("无效架构");
    }
  };

  return (
    <Modal title="JSON 架构" size="lg" opened={opened} onClose={onClose} centered>
      <Stack>
        <Text fz="sm">任何验证失败都会显示在面板底部工具栏中。</Text>
        <Anchor
          fz="sm"
          target="_blank"
          href="https://niem.github.io/json/sample-schema/"
          rel="noopener noreferrer"
        >
          查看示例 <VscLinkExternal />
        </Anchor>
        <Paper withBorder radius="sm" style={{ overflow: "hidden" }}>
          <Editor
            value={schema ?? ""}
            theme={darkmodeEnabled}
            onChange={e => setSchema(e!)}
            height={300}
            language="json"
            options={{
              formatOnPaste: true,
              tabSize: 2,
              formatOnType: true,
              scrollBeyondLastLine: false,
              stickyScroll: { enabled: false },
              minimap: { enabled: false },
            }}
          />
        </Paper>
        <Group p="0" justify="right">
          <Button variant="subtle" color="gray" onClick={onClear} disabled={!schema}>
            清除
          </Button>
          <Button.Group>
            <Button variant="default" onClick={onApply} disabled={!schema}>
              应用
            </Button>
            <Menu>
              <Menu.Target>
                <Button variant="default" color="blue" px="xs" disabled={!schema}>
                  <FaChevronDown />
                </Button>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item onClick={generateMockData}>生成模拟数据</Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Button.Group>
        </Group>
      </Stack>
    </Modal>
  );
};
