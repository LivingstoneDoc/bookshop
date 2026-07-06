import { SimpleGrid, Skeleton } from "@mantine/core";

export const BooksSkeleton = () => {
  return (
    <SimpleGrid cols={{ base: 1, xs: 2, md: 3, lg: 4 }} spacing="md" mt="md">
      {Array.from({ length: 8 }).map((_, i) => (
        <Skeleton key={i} height={470} width="100%" mt="md" radius="md" />
      ))}
    </SimpleGrid>
  );
};
