import * as React from 'react'
import * as Dialog from '@radix-ui/react-dialog'

type ModalProps = {
	trigger: React.ReactNode
	buttonText: string
	state: ReturnType<typeof React.useState<boolean>>
} & React.PropsWithChildren

export const Modal = ({ trigger, buttonText, children, state }: ModalProps) => {
	const [open, setOpen] = state

	return (
		<Dialog.Root open={open} onOpenChange={setOpen}>
			<Dialog.Trigger>{trigger}</Dialog.Trigger>
			<Dialog.Portal>
				<Dialog.Overlay className="fixed inset-0 grid place-items-center bg-gray-1/90 dark:bg-gray-7/90">
					<Dialog.Content className="flex max-h-screen w-full max-w-xl flex-col overflow-hidden border-black bg-white dark:border-gray-4 dark:bg-gray-7 sm:max-h-[calc(100vh-112px)] sm:rounded-2xl sm:border">
						<div className="flex-auto overflow-y-auto">{children}</div>
						<div
							className="grid h-28 flex-none place-items-center"
							style={{ boxShadow: '0px -4px 12px rgba(0, 0, 0, 0.05)' }}
						>
							<Dialog.Close className="grid h-12 w-64 place-items-center rounded-md bg-green-1 text-3xl font-bold text-white">
								{buttonText}
							</Dialog.Close>
						</div>
					</Dialog.Content>
				</Dialog.Overlay>
			</Dialog.Portal>
		</Dialog.Root>
	)
}
