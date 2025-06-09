import { getApiClient } from '@/utils/apiClient';
import { EndpointType } from '@/types/endpoint.type';
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	Container,
	Typography,
} from '@mui/material';

export default async function Page() {
	const client = await getApiClient();
	const endpoints: EndpointType[] = await client.get('/endpoint').then(res => res.data);

	console.log(endpoints);

	return (
		<Container maxWidth="lg" sx={{ mt: 4 }}>
			<Typography variant="h5" gutterBottom>
				Список эндпоинтов
			</Typography>

			<TableContainer component={Paper}>
				<Table aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell>Метод</TableCell>
							<TableCell align="center">Путь</TableCell>
							<TableCell align="center">Код ответа</TableCell>
							<TableCell align="center">Задержка</TableCell>
							<TableCell align="right">Дата создания</TableCell>
							<TableCell align="right">Дата обновления</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{endpoints && endpoints.map((row) => (
							<TableRow key={row.id} hover>
								<TableCell component="th" scope="row" sx={{ fontWeight: 'medium' }}>
									{row.method}
								</TableCell>
								<TableCell align="center">{row.path}</TableCell>
								<TableCell align="center">{row.statusCode}</TableCell>
								<TableCell align="center">{row.delay ?? '-'}</TableCell>
								<TableCell align="right">
									{new Date(row.createdAt).toLocaleString()}
								</TableCell>
								<TableCell align="right">
									{new Date(row.updatedAt).toLocaleString()}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Container>
	);
}