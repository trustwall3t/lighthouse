import { redirect } from 'next/navigation';
import { db } from '@/lib/db';
import { getAppUrl } from '@/lib/email/config';
import { getSession } from '@/lib/session';
import { InviteFriendsClient } from './InviteFriendsClient';

export default async function InviteFriendsPage() {
	const session = await getSession();
	if (!session) {
		redirect('/auth/login');
	}

	const user = await db.user.findUnique({
		where: { id: session.userId },
		select: { refcode: true },
	});

	const code = user?.refcode?.trim();
	const referralLink = code
		? `${getAppUrl()}/auth/signup?referral=${encodeURIComponent(code)}`
		: `${getAppUrl()}/auth/signup`;

	return (
		<InviteFriendsClient referralLink={referralLink} referrals={[]} />
	);
}
