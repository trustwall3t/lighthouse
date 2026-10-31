'use client';
import { AuthFormShell } from '@/components/auth/AuthFormShell';
import {
	Form,
	FormLabel,
	FormField,
	FormItem,
	FormControl,
	FormDescription,
} from '@/components/ui/form';
import { UserRegisterSchema } from '../../../../../schema/UserSchema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import Link from 'next/link';
import { useTransition } from 'react';
import { signup } from '@/actions/auth/signup';
import { Loader } from '@/components/Loader';
import { toast } from 'sonner';
export const SignupForm = (props: { refby: string }) => {
	const [isPending, startTransition] = useTransition();
	const form = useForm<z.infer<typeof UserRegisterSchema>>({
		resolver: zodResolver(UserRegisterSchema),
		defaultValues: {
			email: '',
			password: '',
			confirmPassword: '',
			fullName: '',
			phoneNumber: '',
			address: '',
			country: '',
			accountType: '',
			yearlyIncomeRange: '',
			agreement: false,
			refby: props.refby || '',
		},
	});
	const onSubmit = async (data: z.infer<typeof UserRegisterSchema>) => {
		startTransition(async () => {
			const res = await signup(data);
			if (res.error) {		
				toast.error(res.error);

			} else {
				toast.success('Account created successfully, please verify your email');
			}
		});
	};
	return (
		<AuthFormShell
			title="Create account"
			description="Open your client account in a few steps"
			size="lg"
		>
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
				{isPending && <Loader />}
				<FormField
					control={form.control}
					name='fullName'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Full Name</FormLabel>
							<FormControl>
								<Input
									type='text'
									{...field}
									placeholder='Enter your full name'
									
								/>
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='email'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input
									type='email'
									{...field}
									placeholder='Enter your email'
								/>
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='phoneNumber'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Phone Number</FormLabel>
							<FormControl>
								<Input
									type='text'
									{...field}
									placeholder='Enter your phone number'
								/>
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='address'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Address</FormLabel>
							<FormControl>
								<Input
									type='text'
									{...field}
									placeholder='Enter your address'
								/>
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='country'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Country</FormLabel>
							<FormControl>
								<Input
									{...field}
									placeholder='Enter your country'
								/>
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='accountType'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Account Type</FormLabel>
							<FormControl>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<SelectTrigger className='w-full'>
										<SelectValue placeholder='Select an account type' />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value='tradding account'>
											Trading Account
										</SelectItem>
										<SelectItem value='traditional IRA'>
											Traditional IRA
										</SelectItem>
										<SelectItem value='Roth IRA'>
											Roth IRA
										</SelectItem>
										<SelectItem value='401(k)s'>
											401(k)s
										</SelectItem>
									</SelectContent>
								</Select>
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='yearlyIncomeRange'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Yearly Income Range</FormLabel>
							<FormControl>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<SelectTrigger className='w-full'>
										<SelectValue placeholder='Select your yearly income range' />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value='Under $25,000'>Under $25,000</SelectItem>
										<SelectItem value='$25,000 - $50,000'>$25,000 - $50,000</SelectItem>
										<SelectItem value='$50,000 - $75,000'>$50,000 - $75,000</SelectItem>
										<SelectItem value='$75,000 - $100,000'>$75,000 - $100,000</SelectItem>
										<SelectItem value='$100,000 - $150,000'>$100,000 - $150,000</SelectItem>
										<SelectItem value='$150,000 - $200,000'>$150,000 - $200,000</SelectItem>
										<SelectItem value='Over $200,000'>Over $200,000</SelectItem>
									</SelectContent>
								</Select>
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='password'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Password</FormLabel>
							<FormControl>
								<Input
									type='password'
									{...field}
									placeholder='Enter your password'
								/>
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='confirmPassword'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Confirm Password</FormLabel>
							<FormControl>
								<Input
									{...field}
									placeholder='Confirm your password'
									type='password'
								/>
							</FormControl>
							<FormDescription className='text-red-500'>
								{form.formState.errors.confirmPassword?.message}
							</FormDescription>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='agreement'
					render={({ field }) => (
						<FormItem className='flex items-center gap-2 py-5'>
							<FormControl>
								<Checkbox
									checked={field.value}
									onCheckedChange={field.onChange}
								/>
							</FormControl>
							<FormLabel>
								Agree to our terms and conditions
							</FormLabel>
						</FormItem>
					)}
				/>
				<Button type="submit" className="w-full" disabled={isPending}>
					Create account
				</Button>
				<Link
					href='/auth/login'
					className='block text-sm text-muted-foreground hover:text-brand'
				>
					Already have an account? Login
				</Link>
			</form>
		</Form>
		</AuthFormShell>
	);
};
