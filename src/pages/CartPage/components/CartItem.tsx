import { ActionIcon, Group, Image, Paper, Stack, Text } from "@mantine/core";
import { roubleSign } from "../../../constants/config";
import { MinusIcon, PlusIcon, XIcon } from "@phosphor-icons/react";
import atlant from "../../../assets/img/atlant.png";

export const CartItem = () => {
  const plusIcon = <PlusIcon size={16} />;
  const minusIcon = <MinusIcon size={16} />;
  const closeIcon = <XIcon size={16} />;

  return (
    <Paper withBorder radius="md" p="md">
      <Group justify="space-between">
        <Group>
          <Image src={atlant} alt="atlant" w={55} fit="contain" />
          <Stack gap={1}>
            <Text fw={500} ta="left">
              Атлант расправил плечи (Комплект из трех книг)
            </Text>
            <Text c="dimmed" ta="left">
              твердая, А4
            </Text>
          </Stack>
        </Group>
        <Group>
          <ActionIcon variant="outline" radius="50%">
            {minusIcon}
          </ActionIcon>
          <Text fw={500}>1</Text>
          <ActionIcon variant="outline" radius="50%">
            {plusIcon}
          </ActionIcon>
        </Group>
        <Group>
          <Text fw={500}>700 {roubleSign}</Text>
          <ActionIcon variant="outline" radius="50%">
            {closeIcon}
          </ActionIcon>
        </Group>
      </Group>
    </Paper>
  );
};
