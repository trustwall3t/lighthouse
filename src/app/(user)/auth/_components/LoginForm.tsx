'use client';
import { AuthFormShell } from '@/components/auth/AuthFormShell';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UserLoginSchema } from '../../../../../schema/UserSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { login } from '@/actions/auth/login';
import { useTransition } from 'react';
import { Loader } from '@/components/Loader';
import { useUser } from '@/lib/context/UserContext';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export const LoginForm = () => {
	const [isPending, startTransition] = useTransition();
	const { setUser } = useUser();
	const router = useRouter();

	const form = useForm<z.infer<typeof UserLoginSchema>>({
		resolver: zodResolver(UserLoginSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const onSubmit = (data: z.infer<typeof UserLoginSchema>) => {
		if (data.email === '' || data.password === '') {
			toast.error('Please enter your email and password');
			return;
		}
		startTransition(async () => {
			const res = await login(data);
			if (res.success) {
				setUser(res.user);
				router.push('/dashboard');
			} else {
				toast.error(res.error);
			}
		});
	};

	return (
		<AuthFormShell
			title="Sign in"
			description="Login to your client account"
		>
			<Form {...form}>
				{isPending && <Loader />}
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input
										type="email"
										{...field}
										placeholder="Enter your email"
									/>
								</FormControl>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<Input
										type="password"
										{...field}
										placeholder="Enter your password"
									/>
								</FormControl>
							</FormItem>
						)}
					/>
					<div className="flex flex-col gap-3">
						<Link
							href="/auth/forgot-password"
							className="text-sm text-muted-foreground hover:text-brand"
						>
							Forgot password?
						</Link>
						<Button type="submit" className="w-full" disabled={isPending}>
							Login
						</Button>
						<Link
							href="/auth/signup"
							className="text-center text-sm text-muted-foreground hover:text-brand"
						>
							Don&apos;t have an account? Sign up
						</Link>
					</div>
				</form>
			</Form>
		</AuthFormShell>
	);
};
