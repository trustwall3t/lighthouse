'use client';

import { AuthFormShell } from '@/components/auth/AuthFormShell';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useTransition } from 'react';
import { z } from 'zod';
import { ForgotPasswordSchema } from '../../../../../schema/UserSchema';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { requestResetPassword } from '../../../../actions/auth/resetPassword';
import { toast } from 'sonner';

export const ForgotPasswordForm = () => {
	const [isPending, startTransition] = useTransition();
	const form = useForm<z.infer<typeof ForgotPasswordSchema>>({
		resolver: zodResolver(ForgotPasswordSchema),
		defaultValues: {
			email: '',
		},
	});

	const handleSubmit = async (data: z.infer<typeof ForgotPasswordSchema>) => {
		startTransition(async () => {
			try {
				const response = await requestResetPassword(data.email);
				if (response.error) {
					toast.error(response.error);
				} else {
					toast.success(response.success);
					form.reset();
				}
			} catch (error: unknown) {
				if (error instanceof Error) {
					toast.error(error.message || 'An error occurred');
				} else {
					toast.error('An error occurred');
				}
			}
		});
	};

	return (
		<AuthFormShell
			title="Forgot password"
			description="Enter your email to request a password reset link"
		>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input {...field} placeholder="Enter your email" />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type="submit" className="w-full" disabled={isPending}>
						{isPending ? 'Sending...' : 'Request reset link'}
					</Button>
					<Link
						href="/auth/login"
						className="block text-sm text-muted-foreground hover:text-brand"
					>
						Back to login
					</Link>
				</form>
			</Form>
		</AuthFormShell>
	);
};

export default ForgotPasswordForm;
