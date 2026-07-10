import { Alert, Box, Container, Group, Text } from "@mantine/core";
import { WarningIcon } from "@phosphor-icons/react";

interface ErrorAlertProps {
  title: string;
  message: string | null;
  children?: React.ReactNode;
}

export const ErrorAlert = ({ title, message, children }: ErrorAlertProps) => {
  const warningIcon = <WarningIcon size={32} />;
  return (
    <Box maw={500} mx="auto" mt="xl">
      <Alert
        variant="light"
        color="red"
        title={title}
        icon={warningIcon}
        px={{ base: 4, sm: "md" }}
      >
        <Text mb={children ? "md" : 0}>{message}</Text>
        {children && (
          <Group justify="flex-start" gap="sm">
            {children}
          </Group>
        )}
      </Alert>
    </Box>
  );
};
