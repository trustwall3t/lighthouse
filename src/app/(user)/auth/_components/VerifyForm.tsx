'use client';

import React, { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { verifyEmailSchem } from '../../../../../schema/UserSchema';
import { z } from 'zod';
import { AuthFormShell } from '@/components/auth/AuthFormShell';
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	Form,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { toast } from 'sonner';
import { verifyEmail } from '@/actions/auth/signup';
import { Loader } from '@/components/Loader';
import { useRouter } from 'next/navigation';
import { requestForToken } from '@/actions/auth/resetPassword';

const VerifyForm = ({ email }: { email: string }) => {
	const [isPending, startTransition] = useTransition();
	const router = useRouter();
	const form = useForm<z.infer<typeof verifyEmailSchem>>({
		resolver: zodResolver(verifyEmailSchem),
		defaultValues: {
			token: '',
			email: email || '',
		},
	});

	const onSubmit = (data: z.infer<typeof verifyEmailSchem>) => {
		if (!data.token) {
			toast.error('Token is required');
			return;
		}
		if (!data.email) {
			toast.error('Email is required');
			return;
		}
		startTransition(async () => {
			try {
				const res = await verifyEmail(data);
				if (res.success) {
					toast.success(res.success);
					router.push('/auth/login');
				}
				if (res.error) {
					toast.error(res.error);
				}
			} catch {
				toast.error('An error occurred during verification');
			}
		});
	};

	return (
		<AuthFormShell
			title="Verify your email"
			description={`Enter the code we sent to ${email}`}
		>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
					{isPending && <Loader />}
					<FormField
						control={form.control}
						name="token"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Verification code</FormLabel>
								<FormControl>
									<Input
										type="text"
										{...field}
										placeholder="Enter the code"
										disabled={isPending}
									/>
								</FormControl>
								{form.formState.errors.token ? (
									<p className="text-sm text-destructive">
										{form.formState.errors.token.message}
									</p>
								) : null}
							</FormItem>
						)}
					/>
					<Button type="submit" className="w-full" disabled={isPending}>
						{isPending ? 'Verifying...' : 'Verify'}
					</Button>
				</form>
			</Form>
			<div className="flex flex-wrap items-center justify-center gap-2 border-t border-border pt-4">
				<p className="text-sm text-muted-foreground">Didn&apos;t get a code?</p>
				<Button
					type="button"
					variant="outline"
					size="sm"
					className="border-none bg-brand text-brand-foreground hover:bg-brand-muted"
					onClick={() => requestForToken(email)}
				>
					Resend code
				</Button>
			</div>
			<Link
				href="/auth/login"
				className="block text-center text-sm text-muted-foreground hover:text-brand"
			>
				Back to login
			</Link>
		</AuthFormShell>
	);
};

export default VerifyForm;
