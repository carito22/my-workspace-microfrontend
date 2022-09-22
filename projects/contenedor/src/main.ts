import('./bootstrap')
	.catch(err => console.error(err));

/*import { loadRemoteEntry } from '@angular-architects/module-federation';

loadRemoteEntry('http://localhost:9080/remoteEntry.js', 'microfrontend01')
	.then(_ => import('./bootstrap').catch(err => console.error(err)))*/