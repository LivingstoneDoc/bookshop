import { useState } from "react";
import { ActionIcon, Button, Group, Popover, Text } from "@mantine/core";

interface DeleteConfirmButtonProps {
  icon: React.ReactNode;
  onConfirm: () => void;
}

export function DeleteConfirmButton({
  icon,
  onConfirm,
}: DeleteConfirmButtonProps) {
  const [opened, setOpened] = useState(false);

  const handleConfirm = () => {
    onConfirm();
    setOpened(false);
  };
  return (
    <Popover opened={opened} onChange={setOpened} position="top">
      <Popover.Target>
        <ActionIcon
          variant="transparent"
          color="red"
          onClick={() => setOpened((o) => !o)}
        >
          {icon}
        </ActionIcon>
      </Popover.Target>

      <Popover.Dropdown>
        <Text size="sm" mb="xs" ta="center">
          Удалить товар?
        </Text>
        <Group gap="xs" justify="center">
          <Button size="xs" variant="default" onClick={() => setOpened(false)}>
            Нет
          </Button>
          <Button size="xs" color="red" onClick={handleConfirm}>
            Да
          </Button>
        </Group>
      </Popover.Dropdown>
    </Popover>
  );
}
