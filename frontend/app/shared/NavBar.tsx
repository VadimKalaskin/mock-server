'use client';

import { AppBar, Toolbar, Button, Container } from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FC } from 'react';

interface NavItem {
	label: string;
	href: string;
}

const navItems: NavItem[] = [
	{ label: 'Список эндпоинтов', href: '/admin/endpoints' },
	{ label: 'Создать эндпоинт', href: '/admin/endpoints/create' },
];

export const NavBar: FC = () => {
	const pathname = usePathname();

	return (
		<AppBar position="static" color="primary">
			<Container maxWidth="lg">
				<Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
					<div>
						{navItems.map((item) => (
							<Button
								key={item.href}
								component={Link}
								href={item.href}
								variant={pathname === item.href ? 'contained' : 'text'}
								color="inherit"
								sx={{
									fontWeight: pathname === item.href ? 'bold' : 'normal',
									backgroundColor: pathname === item.href ? 'rgba(255,255,255,0.2)' : 'transparent',
									borderRadius: 1,
								}}
							>
								{item.label}
							</Button>
						))}
					</div>
				</Toolbar>
			</Container>
		</AppBar>
	);
};