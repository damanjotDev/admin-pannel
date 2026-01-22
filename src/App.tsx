import { Toaster } from '@/components/ui';
import { AppRoutes } from './routes';

function App() {
    return (
        <div className="w-full min-h-screen p-0 m-0">
            <AppRoutes />
            <Toaster />
        </div>
    );
}

export default App;
