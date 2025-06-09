'use client'
import { Box, Button, Container, FormControl, InputLabel, MenuItem, Select, TextField, Stack } from '@mui/material';
import {useActionState, useEffect} from "react";
import createEndpoint from "@/actions/createEndpoint";
import {toast} from "react-toastify";

export default function Page() {

	const [state, action, isPending] = useActionState(createEndpoint, undefined)

	useEffect(() => {
		if(state?.success){
			toast.success("Эндпоинт успешно создан!")
		} else {
			toast.error(state?.message.join(", "))
		}
	}, [state?.success])

	return (
		<Container maxWidth="lg" sx={{
			mt: 8
		}}>
			<form action={action}>
				<Stack spacing={2} direction="column">
					{/* Метод запроса */}
					<FormControl fullWidth required>
						<InputLabel id="method-label">Метод</InputLabel>
						<Select
							labelId="method-label"
							id="method"
							name="method"
							label="Метод"
							defaultValue="GET"
						>
							<MenuItem value="GET">GET</MenuItem>
							<MenuItem value="POST">POST</MenuItem>
							<MenuItem value="PUT">PUT</MenuItem>
							<MenuItem value="DELETE">DELETE</MenuItem>
							<MenuItem value="PATCH">PATCH</MenuItem>
						</Select>
					</FormControl>

					{/* Путь */}
					<TextField
						required
						fullWidth
						name="path"
						label="Путь (Path)"
						variant="outlined"
						defaultValue="/getProducts"
					/>

					{/* Тело ответа */}
					<TextField
						required
						fullWidth
						name="responseBody"
						label="Тело ответа (JSON)"
						multiline
						rows={4}
						variant="outlined"
						defaultValue='{"message": "Success"}'
					/>

					{/* Статус код */}
					<TextField
						required
						fullWidth
						type="number"
						name="statusCode"
						label="Статус код"
						variant="outlined"
						defaultValue={200}
						aria-valuemin={100}
						aria-valuemax={599}
					/>

					{/* Задержка */}
					<TextField
						fullWidth
						type="number"
						name="delay"
						label="Задержка (мс)"
						variant="outlined"
						helperText="Например: 1000 мс = 1 секунда"
						defaultValue={0}
					/>

					{/* Кнопка отправки */}
					<Button type="submit" variant="contained" color="primary" loading={isPending}>
						Создать
					</Button>
				</Stack>
			</form>
		</Container>
	);
}