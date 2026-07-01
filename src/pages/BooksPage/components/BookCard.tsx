import {
  Button,
  Card,
  Image,
  SegmentedControl,
  Stack,
  Text,
} from "@mantine/core";
import { PlusIcon } from "@phosphor-icons/react";
import { roubleSign } from "../../../constants";

interface BookCardProps {
  title: string;
  author: string;
  imgUrl: string;
  coverType: number[];
  coverFormat: string[];
  price: number;
}

export const BookCard = ({
  title,
  author,
  imgUrl,
  coverType,
  coverFormat,
  price,
}: BookCardProps) => {
  const coverTypes = ["мягкая", "твердая"];
  const addIcon = <PlusIcon size={20} />;

  return (
    <Card shadow="sm" padding="lg" withBorder h="100%">
      <Card.Section>
        <Image src={imgUrl} height={220} fit="contain" p="md" alt={title} />
      </Card.Section>

      <Text fw={500} mt="xs" lineClamp={2}>
        {title}
      </Text>
      <Text size="sm" fw={400} mt="xs" mb="xs" lineClamp={2}>
        {author}
      </Text>

      <Stack mt="auto" mb="xs" gap="xs">
        <SegmentedControl
          color="blue"
          fullWidth
          data={coverType.map((type) => coverTypes[type])}
        />
        <SegmentedControl
          color="blue"
          fullWidth
          data={coverFormat.map((format) => format)}
        />
        <Text size="md" mt="xs" fw={700}>
          от {price} {roubleSign}
        </Text>
        <Button
          color="blue"
          leftSection={addIcon}
          styles={{ section: { marginRight: "4px" } }}
        >
          Добавить
          <Text ml="4px">{0}</Text>
        </Button>
      </Stack>
    </Card>
  );
};
