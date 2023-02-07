import * as React from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import cn from 'clsx'

type ModalProps = {
	trigger: React.ReactNode
	buttonText: string
	state: ReturnType<typeof React.useState<boolean>>
	bgGray?: boolean
} & React.PropsWithChildren

export const Modal = ({
	trigger,
	buttonText,
	bgGray = false,
	children,
	state,
}: ModalProps) => {
	const [open, setOpen] = state

	return (
		<Dialog.Root open={open} onOpenChange={setOpen}>
			<Dialog.Trigger>{trigger}</Dialog.Trigger>
			<Dialog.Portal>
				<Dialog.Overlay className="fixed inset-0 grid place-items-center overflow-auto bg-white/90 dark:bg-gray-7/90">
					<Dialog.Content
						className={cn(
							`my-7 flex w-full max-w-[546px] flex-col rounded-2xl border border-black bg-white dark:border-gray-4 dark:bg-gray-7`,
							bgGray && 'bg-gray-1'
						)}
						onOpenAutoFocus={(event) => event.preventDefault()}
						onCloseAutoFocus={(event) => event.preventDefault()}
					>
						<div className="flex-none">{children}</div>
						<div className="grid place-items-center pb-6">
							<Dialog.Close className="grid h-12 w-64 place-items-center rounded-md bg-green-1 text-[28px] font-bold text-white">
								{buttonText}
							</Dialog.Close>
						</div>
					</Dialog.Content>
				</Dialog.Overlay>
			</Dialog.Portal>
		</Dialog.Root>
	)
}
