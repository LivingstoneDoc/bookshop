import { Box, Flex, Skeleton } from "@mantine/core";

export const BookDetailsSkeleton = () => {
  return (
    <Flex
      direction="column"
      align={{ base: "center", sm: "flex-start" }}
      gap="xs"
      w="100%"
    >
      <Skeleton w="100%" maw={600} h={40} />
      <Skeleton w={100} h={20} />
      <Skeleton w={100} h={20} />

      <Flex
        direction={{ base: "column", sm: "row" }}
        align={{ base: "center", sm: "flex-start" }}
        gap="md"
        mt="md"
        w="100%"
      >
        <Skeleton h={400} w={300} miw={300} maw="100%" />
        <Flex
          gap="xl"
          w="100%"
          direction="column"
          align={{ base: "center", sm: "flex-start" }}
          style={{ flex: 1 }}
        >
          <Box w="100%" maw={600}>
            <Skeleton h={100} />
          </Box>
          <Box w="100%" maw={350}>
            <Skeleton h={200} />
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
};
