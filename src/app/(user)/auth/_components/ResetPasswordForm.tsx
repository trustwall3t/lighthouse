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
import { z } from 'zod';
import { ResetPasswordSchema } from '../../../../../schema/UserSchema';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { resetPassword } from '@/actions/auth/resetPassword';
import { toast } from 'sonner';
import { Loader } from '@/components/Loader';

export const ResetPasswordForm = ({ id }: { id: string }) => {
	const form = useForm<z.infer<typeof ResetPasswordSchema>>({
		resolver: zodResolver(ResetPasswordSchema),
		defaultValues: {
			password: '',
			confirmPassword: '',
			id: id,
		},
	});
	const [isPending, startTransition] = useTransition();
	const router = useRouter();

	const onSubmit = (data: z.infer<typeof ResetPasswordSchema>) => {
		startTransition(async () => {
			try {
				const res = await resetPassword(data);
				if (res.success) {
					toast.success(res.success);
					router.push('/auth/login');
				} else {
					toast.error(res.error);
				}
			} catch {
				toast.error('An error occurred during reset password');
			}
		});
	};

	return (
		<AuthFormShell
			title="Reset password"
			description="Enter your new password"
		>
			<Form {...form}>
				{isPending && <Loader />}
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<Input type="password" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="confirmPassword"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Confirm password</FormLabel>
								<FormControl>
									<Input type="password" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type="submit" className="w-full" disabled={isPending}>
						Reset password
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

export default ResetPasswordForm;
