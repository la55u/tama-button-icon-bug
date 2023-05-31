import { getSize, getSpace } from '@tamagui/get-token'
import {
  GetProps,
  SizeTokens,
  Stack,
  Text,
  createStyledContext,
  styled,
  useTheme,
  withStaticProperties,
} from '@tamagui/web'
import { cloneElement, useContext } from 'react'

const ButtonContext = createStyledContext({
  size: '$10' as SizeTokens,
})

const ButtonFrame = styled(Stack, {
  name: 'Button',
  context: ButtonContext,
  backgroundColor: '$background',
  alignItems: 'center',
  flexDirection: 'row',
  hoverStyle: {
    backgroundColor: '$backgroundHover',
  },
  pressStyle: {
    backgroundColor: '$backgroundPress',
  },
  variants: {
    size: {
      '...size': (name, { tokens }) => {
        return {
          height: tokens.size[name],
          borderRadius: tokens.radius[name], // note the getSpace and getSize helpers will let you shift down/up token sizes

          // whereas with gap we just multiply by 0.2

          // this is a stylistic choice, and depends on your design system values

          gap: tokens.space[name].val * 0.2,
          paddingHorizontal: getSpace(name, {
            shift: -1,
          }),
        }
      },
    },
  } as const,
  defaultVariants: {
    size: '$10',
  },
})

type ButtonProps = GetProps<typeof ButtonFrame>

const ButtonText = styled(Text, {
  name: 'ButtonText',
  context: ButtonContext,
  color: '$color',
  userSelect: 'none',
  variants: {
    size: {
      '...fontSize': (name, { font }) => ({
        fontSize: font?.size[name],
      }),
    },
  } as const,
})

const ButtonIcon = (props: { children: any }) => {
  const ctx = useContext(ButtonContext)

  console.log('\n\n', 'ctx:', ctx, '\n\n')

  const { size } = ctx

  const smaller = getSize(size, {
    shift: -2,
  })

  const theme = useTheme()

  return cloneElement(props.children, {
    size: smaller.val * 0.5,
    color: theme.color.get(),
  })
}

export const CustomButton = withStaticProperties(ButtonFrame, {
  Props: ButtonContext.Provider,
  Text: ButtonText,
  Icon: ButtonIcon,
})
