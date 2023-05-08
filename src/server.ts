import { app } from './app';

app.listen({ port: process.env.PORT || 4000 }, () => {
	console.log(`🚀 Server ready, up and running`);
});
