import { QueryClient, QueryClientProvider } from 'react-query';

type ServiceClientProps = {
  children: React.ReactNode;
};

const queryClient = new QueryClient();

export const ServiceClient = ({ children }: ServiceClientProps) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
