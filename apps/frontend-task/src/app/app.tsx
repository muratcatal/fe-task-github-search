import { AppProvider } from '@fetask/context';
import { ServiceClient } from '@fetask/core';
import { SearchPanel, SearchResult } from '@fetask/fe-task-ui';
import { CssVarsProvider, Divider } from '@mui/joy';
import CssBaseline from '@mui/joy/CssBaseline';
import { Layout, PanelLayout } from './styled';

export function App() {
  return (
    <CssVarsProvider defaultMode="dark" disableNestedContext>
      <CssBaseline />
      <Layout>
        <ServiceClient>
          <AppProvider>
            <PanelLayout>
              <SearchPanel />
              <Divider />
              <SearchResult />
            </PanelLayout>
          </AppProvider>
        </ServiceClient>
      </Layout>
    </CssVarsProvider>
  );
}

export default App;
