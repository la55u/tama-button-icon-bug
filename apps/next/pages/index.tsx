import { CustomButton, YStack } from '@my/ui'
import { ArrowUpRight } from '@tamagui/lucide-icons'

export default function Page() {
  return (
    <YStack alignItems="flex-start" p="$4">
      <CustomButton>
        <CustomButton.Icon>
          <ArrowUpRight />
        </CustomButton.Icon>
        <CustomButton.Text>Hello</CustomButton.Text>
      </CustomButton>
    </YStack>
  )
}
