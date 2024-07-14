import './App.css';
import { Button, Typography } from '@mui/material';

function App() {
	return (
		<>
			<Typography variant="h1" color="primary" sx={{mb:3}}>
				分帳趣
			</Typography>

			<Button variant='contained' sx={{ bgcolor: 'secondary.main', color: 'white' }}>Click</Button>
		</>
	);
}

export default App;
