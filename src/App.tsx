import { useState } from 'react';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { RoleplaySession } from './components/RoleplaySession';
import { RoleplayScenario } from './types';

type ViewState = 
  | { view: 'dashboard' }
  | { view: 'session'; scenario: RoleplayScenario };

export default function App() {
  const [state, setState] = useState<ViewState>({ view: 'dashboard' });

  return (
    <Layout 
      title={state.view === 'dashboard' ? 'LinguaRoleplay' : state.scenario.title}
      onBack={state.view === 'session' ? () => setState({ view: 'dashboard' }) : undefined}
    >
      {state.view === 'dashboard' && (
        <Dashboard onStartScenario={(scenario) => setState({ view: 'session', scenario })} />
      )}
      
      {state.view === 'session' && (
        <RoleplaySession 
          scenario={state.scenario} 
          onClose={() => setState({ view: 'dashboard' })} 
        />
      )}
    </Layout>
  );
}
