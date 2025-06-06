import { Box, Button, Center, Stack, VStack } from "@chakra-ui/react"
import { ErrorProps } from "next/error"
import Link from "next/link"

import { SectionHeader } from "./SectionHeader"

function Error({ statusCode }: ErrorProps) {
  return (
    <Box as="section" bgSize="cover" paddingTop="10%" position="relative" w="100%">
      <VStack>
        <Center className="text-black">
          <SectionHeader
            text={
              statusCode == 404
                ? "Uh oh. We couldn't find that page."
                : "Something went wrong. We know that problem and we are currently working on it"
            }
          />
        </Center>
        <Center>
          <Stack direction={["column", "row"]}>
            <Link href="/" passHref>
              <Button p="8">Go Home</Button>
            </Link>
          </Stack>
        </Center>
      </VStack>
    </Box>
  )
}
export default Error
